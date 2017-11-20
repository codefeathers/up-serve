# Changelog / Version history

## `up` v. 0.2.0

Changelog:

- Under the hood BREAKING changes. Working directories change.
   - `/var/www/` to `/etc/up-serve/static/`
   - `/etc/nginx/sites-available/` to `/etc/nginx/conf.d`
- `up static|proxy <domain>` adds the server to `/etc/up-serve/servers.up` list.
- `up kill <domain>` removes server from `servers.up` list.
- `up list` lists available servers from /etc/up-serve/servers.up!
- `up kill-all` destroys all servers and places a `default.conf` in `/etc/nginx/sites-enabled`.