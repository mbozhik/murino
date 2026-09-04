import {createHash} from 'node:crypto';
import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

export const REMOTE = '/www/murino-arena.ru';
export const SITE = 'https://murino-arena.ru';

export function parseArgs(args) {
  if (!args.length) return {command: 'deploy', dryRun: false};
  if (args.length === 1 && args[0] === '--dry-run') return {command: 'deploy', dryRun: true};
  if (args.length === 1 && ['status', '--help'].includes(args[0])) return {command: args[0]};
  if (args.length === 2 && args[0] === 'rollback' && /^\d{13}-[0-9a-f-]{36}$/.test(args[1])) {
    return {command: 'rollback', backup: args[1]};
  }
  throw new Error('Usage: bun run deploy [--dry-run | status | rollback <backup-id> | --help]');
}

export function quote(value) {
  if (/[\r\n\0]/.test(value)) throw new Error('Invalid FTP path');
  return '"' + value.replace(/[\\"$`]/g, '\\$&') + '"';
}

export function inventory(dir, prefix = '') {
  const result = {};
  for (const entry of readdirSync(join(dir, prefix), {withFileTypes: true})) {
    const name = prefix + entry.name;
    quote(name);
    if (entry.isDirectory()) Object.assign(result, inventory(dir, name + '/'));
    else if (entry.isFile()) result[name] = createHash('sha256').update(readFileSync(join(dir, name))).digest('hex');
    else throw new Error(`Unsupported file (symlink or special): ${name}`);
  }
  return result;
}

export function verifyInventory(expected, dir) {
  const actual = inventory(dir);
  for (const [name, hash] of Object.entries(expected)) {
    if (actual[name] !== hash) throw new Error(`File missing or changed: ${name}`);
  }
}

export function prepareRollback(backup, destination) {
  const meta = JSON.parse(readFileSync(join(backup, 'backup.json'), 'utf8'));
  if (meta.site !== SITE || !meta.files?.['index.html']) throw new Error('Invalid backup');
  const source = join(backup, 'site');
  verifyInventory(meta.files, source);
  if (Object.keys(inventory(source)).length !== Object.keys(meta.files).length) throw new Error('Unexpected files in backup');
  cpSync(source, destination, {recursive: true});
  if (!existsSync(join(destination, 'build.json'))) {
    writeFileSync(join(destination, 'build.json'), JSON.stringify({
      id: 'restored-legacy', sha: 'unknown', dirty: false, builtAt: meta.createdAt,
    }) + '\n');
  }
  return destination;
}

export function uploadCommands(source, files) {
  const priority = name => name === 'build.json' ? 4 : name === 'index.html' ? 3 : name.endsWith('.html') ? 2 : name.startsWith('_next/') ? 0 : 1;
  const sorted = [...files].sort((a, b) => priority(a) - priority(b) || a.localeCompare(b));
  const dirs = new Set(sorted.filter(name => name.includes('/')).map(name => name.slice(0, name.lastIndexOf('/'))));
  return [
    ...[...dirs].map(dir => `mkdir -p -f ${quote(REMOTE + '/' + dir)}`),
    ...sorted.map(name => `put ${quote(join(source, name))} -o ${quote(REMOTE + '/' + name)}`),
  ].join('\n');
}

// Backup and verification use separate directories so an interrupted download
// can never be mistaken for a complete rollback target.
export async function publish(source, backup, ftp, health) {
  const expected = inventory(source);
  if (!expected['index.html']) throw new Error('Source has no index.html');
  mkdirSync(backup, {recursive: true, mode: 0o700});
  const previous = join(backup, 'site');
  await ftp(`mirror --parallel=1 ${quote(REMOTE)} ${quote(previous)}`);
  const saved = inventory(previous);
  if (!saved['index.html']) throw new Error('Backup has no index.html; publication stopped');
  writeFileSync(join(backup, 'backup.json'), JSON.stringify({site: SITE, createdAt: new Date().toISOString(), files: saved}, null, 2));
  console.log(`✓ Backup: ${backup}`);
  await ftp(`mirror --reverse --dry-run ${quote(source)} ${quote(REMOTE)}`);
  console.log('→ Upload (all source files, assets before pages; no deletions)');
  await ftp(uploadCommands(source, Object.keys(expected)));
  const downloaded = join(backup, 'verification');
  await ftp(`mirror --parallel=1 ${quote(REMOTE)} ${quote(downloaded)}`);
  verifyInventory(expected, downloaded);
  await health(source);
  console.log(`✓ Verified ${Object.keys(expected).length} files via FTPS and public HTTPS`);
}
