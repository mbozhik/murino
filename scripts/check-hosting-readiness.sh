#!/usr/bin/env bash

set -u

if ! command -v curl >/dev/null 2>&1; then
  echo "Ошибка: требуется curl." >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "Ошибка: требуется jq (brew install jq)." >&2
  exit 1
fi

dns_values() {
  local name="$1"
  local type="$2"
  local response
  local values

  if ! response="$(curl --silent --retry 2 --retry-delay 1 --max-time 15 \
    "https://dns.google/resolve?name=${name}&type=${type}" 2>/dev/null)"; then
    echo "(резолвер временно недоступен)"
    return
  fi

  values="$(printf '%s' "$response" | jq -r '(.Answer // [])[]?.data' | paste -sd ', ' -)"
  if [ -n "$values" ]; then
    printf '%s\n' "$values"
  else
    echo "(нет ответа)"
  fi
}

http_summary() {
  local url="$1"

  curl --silent --show-error --max-time 20 \
    --noproxy '*' \
    --output /dev/null \
    --write-out 'status=%{http_code} ip=%{remote_ip} redirect=%{redirect_url}\n' \
    "$url" || echo "status=ERROR"
}

http_final_summary() {
  local url="$1"

  curl --silent --show-error --location --max-time 30 \
    --noproxy '*' \
    --output /dev/null \
    --write-out 'status=%{http_code} final=%{url_effective}\n' \
    "$url" || echo "status=ERROR"
}

seo_summary() {
  local domain="$1"
  local html
  local canonical

  html="$(curl --silent --show-error --max-time 20 --noproxy '*' "https://${domain}/")" || {
    echo "  canonical: ERROR"
    return
  }
  canonical="$(printf '%s' "$html" | grep -oE '<link[^>]+rel="canonical"[^>]*>' | head -n 1 || true)"

  if [ -n "$canonical" ]; then
    echo "  canonical: $canonical"
  else
    echo "  canonical: MISSING"
  fi

  printf '  robots.txt: '
  http_summary "https://${domain}/robots.txt"
  printf '  sitemap.xml: '
  http_summary "https://${domain}/sitemap.xml"
}

check_domain() {
  local domain="$1"

  echo
  echo "$domain"
  echo "  NS: $(dns_values "$domain" NS)"
  echo "  A:  $(dns_values "$domain" A)"
  printf '  HTTP:  '
  http_summary "http://${domain}/"
  printf '  HTTPS: '
  http_summary "https://${domain}/"
}

check_preview() {
  local project="$1"
  local host="$2"

  echo
  echo "$project preview"
  echo "  https://${host}/"
  printf '  HTTPS: '
  http_summary "https://${host}/"
}

echo "REG.RU Host-Lite readiness audit"
echo "Generated: $(date '+%Y-%m-%d %H:%M:%S %Z')"

check_domain "bestwifenastya.ru"
check_domain "www.bestwifenastya.ru"
check_domain "malakhovcorp.ru"
check_domain "www.malakhovcorp.ru"
check_domain "malakhov.group"
check_domain "www.malakhov.group"
check_domain "murino-arena.ru"
check_domain "www.murino-arena.ru"

echo
echo "Canonical SEO"
echo "malakhovcorp.ru"
seo_summary "malakhovcorp.ru"
echo "murino-arena.ru"
seo_summary "murino-arena.ru"
echo "bestwifenastya.ru"
seo_summary "bestwifenastya.ru"

echo
echo "Final redirect targets"
for url in \
  "http://malakhovcorp.ru/" \
  "https://www.malakhovcorp.ru/" \
  "https://malakhov.group/" \
  "https://www.malakhov.group/" \
  "https://www.murino-arena.ru/" \
  "https://www.bestwifenastya.ru/"
do
  printf '  %s: ' "$url"
  http_final_summary "$url"
done

check_preview "Wife" "bestwifenastya_ru.regruproxy.ru"
check_preview "Maraku" "malakhovcorp_ru.regruproxy.ru"
check_preview "Murino" "murino-arena_ru.regruproxy.ru"

echo
echo "Murino /metro/ preview"
printf '  HTTPS: '
http_summary "https://murino-arena_ru.regruproxy.ru/metro/"

echo
echo "Скрипт выполняет только чтение: DNS-запросы и HTTP-проверки."
echo "HTTPS проверяется строго: ошибка сертификата отображается как status=ERROR."
echo "Google DNS и локальный резолвер могут временно показывать разные ответы во время обновления DNS."
