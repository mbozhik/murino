import {spawnSync} from 'node:child_process';
import {randomUUID, createHash, X509Certificate} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseArgs, publish, quote, prepareRollback, SITE, REMOTE} from './deploy-lib.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const STATE = join(ROOT, '.deploy');
const BACKUPS = join(STATE, 'backups');
const OUT = join(ROOT, 'out');
const HOST = 'server115.hosting.reg.ru';
const USER = 'u3594311';
let password = process.env.DEPLOY_FTP_PASSWORD;
// Build tools and other children should not inherit the FTP credential.
const cleanEnv = {...process.env};
delete cleanEnv.DEPLOY_FTP_PASSWORD;
delete cleanEnv.LFTP_PASSWORD;
let locked = false;
let restoreDir;

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {cwd: ROOT, env: cleanEnv, encoding: 'utf8', stdio: 'inherit', ...options});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed (${result.status})`);
  return result.stdout?.trim() ?? '';
}

function credential() {
  if (password) return;
  if (process.platform === 'darwin') {
    const result = spawnSync('security', ['find-generic-password', '-a', USER, '-s', 'murino-arena-ftps', '-w'], {env: cleanEnv, encoding: 'utf8', stdio: 'pipe'});
    if (result.status === 0) password = result.stdout.replace(/\r?\n$/, '');
  }
  if (!password) throw new Error('FTP credential unavailable. Configure macOS Keychain service murino-arena-ftps / account u3594311, or provide DEPLOY_FTP_PASSWORD securely. See README.');
}

async function ftp(commands) {
  credential();
  run('lftp', ['--norc'], {
    env: {...cleanEnv, LFTP_PASSWORD: password},
    stdio: ['pipe', 'inherit', 'inherit'],
    input: [
      'set cmd:fail-exit yes',
      'set net:timeout 15',
      'set net:max-retries 2',
      'set net:reconnect-interval-base 2',
      'set ftp:ssl-force yes',
      'set ftp:ssl-protect-data yes',
      'set ftp:ssl-protect-list yes',
      'set ssl:verify-certificate yes',
      'set ssl:check-hostname yes',
      `set ssl:ca-file ${quote(join(STATE, 'ca-bundle.pem'))}`,
      `set dns:name/${HOST} 37.140.192.23`,
      'set ftp:list-options -a',
      'set xfer:use-temp-file yes',
      'set xfer:clobber yes',
      `open --user ${USER} --env-password ftp://${HOST}`,
      commands,
      'bye',
      '',
    ].join('\n'),
  });
}

async function get(path) {
  const response = await fetch(`${SITE}${path}${path.includes('?') ? '&' : '?'}deploy_check=${Date.now()}`, {
    cache: 'no-store', signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

async function health(source) {
  for (const [path, file] of [['/', 'index.html'], ['/metro/', 'metro/index.html'], ['/robots.txt', 'robots.txt'], ['/sitemap.xml', 'sitemap.xml'], ['/build.json', 'build.json']]) {
    if (!existsSync(join(source, file))) continue;
    const actual = await get(path);
    if (!actual.equals(readFileSync(join(source, file)))) throw new Error(`Public content differs: ${path}`);
  }
}

function backups() {
  if (!existsSync(BACKUPS)) return [];
  return readdirSync(BACKUPS).filter(id => existsSync(join(BACKUPS, id, 'backup.json'))).sort().reverse();
}

function printRelease(meta) {
  let subject = meta.subject;
  if (!subject && /^[0-9a-f]{40}$/.test(meta.sha)) {
    const result = spawnSync('git', ['show', '-s', '--format=%s', meta.sha], {cwd: ROOT, env: cleanEnv, encoding: 'utf8', stdio: 'pipe'});
    if (result.status === 0) subject = result.stdout.trim();
  }
  console.log(`Release: ${meta.id} · ${meta.builtAt}`);
  console.log(`Commit: ${meta.sha}${meta.dirty ? ' · dirty' : ''} · ${subject || 'title unavailable'}`);
}

async function status() {
  const html = await get('/');
  console.log(`✓ ${SITE} HTTP 200 · SHA256 ${createHash('sha256').update(html).digest('hex')}`);
  const response = await fetch(`${SITE}/build.json?deploy_check=${Date.now()}`, {signal: AbortSignal.timeout(15000), cache: 'no-store'});
  if (response.status === 404) console.log('Release: legacy publication (no build.json yet)');
  else {
    if (!response.ok) throw new Error(`build.json: HTTP ${response.status}`);
    const meta = await response.json();
    printRelease(meta);
  }
  console.log(`Local backups: ${backups().join(', ') || 'none'}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.command === '--help') {
    console.log('bun run deploy                 Build, backup, FTPS upload, verify\nbun run deploy --dry-run       Build and show remote plan; no remote writes\nbun run deploy:status          Public release and local backups; no FTP password\nbun run deploy:rollback <id>   Restore an explicit local backup (no deletion)');
    return;
  }
  if (args.command === 'status') return status();
  mkdirSync(STATE, {recursive: true, mode: 0o700});
  try { mkdirSync(join(STATE, 'lock')); }
  catch { throw new Error('Deploy lock exists (.deploy/lock). If no deployment is running, remove this directory manually.'); }
  locked = true;
  writeFileSync(join(STATE, 'lock', 'pid'), String(process.pid));
  console.log(`Murino → ${SITE} · FTPS ${USER}@${HOST}${REMOTE}`);
  run('lftp', ['--version'], {stdio: 'pipe'});
  credential();
  const systemCA = ['/etc/ssl/cert.pem', '/etc/ssl/certs/ca-certificates.crt'].find(existsSync);
  if (!systemCA) throw new Error('System CA bundle not found');
  // REG.RU omits the intermediate certificate from its FTPS chain.
  const response = await fetch('https://secure.globalsign.com/cacert/gsgccr6alphasslca2025.crt', {signal: AbortSignal.timeout(15000)});
  if (!response.ok) throw new Error(`FTPS intermediate certificate: HTTP ${response.status}`);
  const intermediate = join(STATE, 'ftps-intermediate.crt');
  writeFileSync(intermediate, new X509Certificate(Buffer.from(await response.arrayBuffer())).toString());
  run('openssl', ['verify', '-CAfile', systemCA, intermediate], {stdio: 'pipe'});
  writeFileSync(join(STATE, 'ca-bundle.pem'), readFileSync(systemCA, 'utf8') + '\n' + readFileSync(intermediate, 'utf8'));
  // lftp mirror --dry-run can produce a plan without authenticating the target.
  // Force a real read first, for dry runs as well as actual publications.
  await ftp(`cls -d ${quote(REMOTE)}`);
  let source = OUT;
  if (args.command === 'rollback') {
    const dir = join(BACKUPS, args.backup);
    restoreDir = join(STATE, `restore-${randomUUID()}`);
    source = prepareRollback(dir, restoreDir);
  } else {
    run('bun', ['run', 'build']);
    for (const file of ['index.html', 'metro/index.html', 'robots.txt', 'sitemap.xml']) {
      if (!existsSync(join(OUT, file))) throw new Error(`Build missing ${file}`);
    }
    const sha = run('git', ['rev-parse', 'HEAD'], {stdio: 'pipe'});
    const subject = run('git', ['log', '-1', '--format=%s'], {stdio: 'pipe'});
    const dirty = Boolean(run('git', ['status', '--porcelain'], {stdio: 'pipe'}));
    writeFileSync(join(OUT, 'build.json'), JSON.stringify({id: randomUUID(), sha, subject, dirty, builtAt: new Date().toISOString()}, null, 2) + '\n');
  }
  if (args.dryRun) {
    await ftp(`mirror --reverse --dry-run ${quote(source)} ${quote(REMOTE)}`);
    console.log('✓ Dry run: no remote writes. Real deployment uploads all source files, including equal-size files.');
    return;
  }
  const id = `${Date.now()}-${randomUUID()}`;
  try { await publish(source, join(BACKUPS, id), ftp, health); }
  catch (error) {
    if (existsSync(join(BACKUPS, id, 'backup.json'))) console.error(`Backup retained. To restore: bun run deploy:rollback ${id}`);
    throw error;
  }
  console.log(`✓ Published ${SITE}\nRollback: bun run deploy:rollback ${id}`);
  printRelease(JSON.parse(readFileSync(join(source, 'build.json'), 'utf8')));
}

try { await main(); }
catch (error) { console.error(`✗ ${error.message}`); process.exitCode = 1; }
finally {
  password = undefined;
  if (restoreDir) rmSync(restoreDir, {recursive: true, force: true});
  if (locked) rmSync(join(STATE, 'lock'), {recursive: true});
}
