# Muiti-page website + booking functionality

```bash
git clone https://github.com/mbozhik/murino.git && cd murino && pnpm i && code .
```

## Deploy

Продакшен: https://murino-arena.ru — REG.RU Host-Lite, `/www/murino-arena.ru`.
Требования: зависимости проекта, Bun, OpenSSL, `lftp` (`brew install lftp`).

```bash
bun run deploy                # сборка → резервная копия → FTPS → проверка файлов и HTTPS
bun run deploy --dry-run      # сборка и план загрузки без записи на сервер
bun run deploy:status         # опубликованная версия и локальные резервные копии
bun run deploy:rollback <id>  # восстановление выбранной копии
```

FTP-пароль берётся из macOS Keychain или `DEPLOY_FTP_PASSWORD`. Однократная настройка Keychain:

```bash
security add-generic-password -a u3594311 -s murino-arena-ftps -U -w
```

Публикуется текущая рабочая копия, включая незакоммиченные изменения. Резервные копии
хранятся в `.deploy/backups/` и не удаляются автоматически. Загрузка и откат не удаляют
файлы на сервере; переключение сайта не атомарное. Публикации запускаются последовательно.

TLS-проверка обязательна. Недостающий сертификат GlobalSign скачивается в `.deploy/`
и проверяется системными корневыми сертификатами; секреты и служебные файлы не входят в Git.

Настройка хостинга: [docs/hosting-migration.md](docs/hosting-migration.md).
