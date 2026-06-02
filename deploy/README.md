# Деплой на VPS (Selectel Cloud Server) + nginx

Сайт — статика (`out/`). Домен **полимерка-54.рф** (punycode `xn---54-5cdyrpfkrkr.xn--p1ai`),
DNS на reg.ru. Бэкенд (Supabase: админка/контент/картинки, приём заявок в CRM)
работает с любого домена — ничего переносить не нужно.

## 1. Сервер
Создать облачный сервер Selectel (Ubuntu 22.04/24.04), запомнить публичный IP.
В фаерволе/группе безопасности открыть порты **80** и **443**.

## 2. Базовая настройка (по SSH, под root)
```bash
apt update && apt install -y nginx certbot python3-certbot-nginx unzip
mkdir -p /var/www/chpb
```

## 3. Загрузить сайт
Собрать локально (`npm run build` → папка `out/`) или взять готовый zip.
С локальной машины:
```bash
scp chpb-site-build.zip root@SERVER_IP:/tmp/
```
На сервере:
```bash
unzip -o /tmp/chpb-site-build.zip -d /var/www/chpb
chown -R www-data:www-data /var/www/chpb
```
Должно получиться: `/var/www/chpb/index.html` и `/var/www/chpb/assets/...`

## 4. nginx
```bash
cp deploy/nginx.conf /etc/nginx/sites-available/chpb     # либо вставить вручную
ln -sf /etc/nginx/sites-available/chpb /etc/nginx/sites-enabled/chpb
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```
Проверка по IP: `http://SERVER_IP` должен открыть сайт.

## 5. DNS на reg.ru
В панели reg.ru (Управление зоной домена) добавить:

| Тип | Имя/Поддомен | Значение      |
|-----|--------------|---------------|
| A   | `@`          | `SERVER_IP`   |
| A   | `www`        | `SERVER_IP`   |

Подождать распространения (обычно минуты, иногда до пары часов).
Проверка: `dig +short полимерка-54.рф` → ваш IP.

## 6. HTTPS (Let's Encrypt)
После того как домен резолвится на сервер:
```bash
certbot --nginx -d xn---54-5cdyrpfkrkr.xn--p1ai -d www.xn---54-5cdyrpfkrkr.xn--p1ai
```
certbot выпустит сертификат, допишет блок 443 и редирект с http→https.
Автопродление уже включено (systemd timer `certbot.timer`).

Готово: **https://полимерка-54.рф**, админка — **/admin**.

## Обновление сайта (когда менялся КОД)
Правки контента/картинок идут через `/admin` и не требуют перезаливки.
Перезаливать нужно только при изменениях кода:
```bash
npm run build
scp -r out/* root@SERVER_IP:/var/www/chpb/
```
(можно автоматизировать через GitHub Actions + SSH/rsync — по запросу.)
