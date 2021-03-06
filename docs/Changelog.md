# Changelog / Version history

## `up` v. 0.3.1

- Minor patch: Fixed sudo not being required for commands.

## `up` v. 0.3.0

- BREAKING API changes. Functions will now accept an object instead of a list of arguments. This allows for named parameters that don't have to follow a precise order. Check [README](../README.md) for details.

## `up` v. 0.2.5

- `up static` is DEPRECATED. Use `up serve` instead.
- Major refactor of code, and splitting of `index.js` to `lib.js` and `cli.js`.
- Basic API now available.
- Usage of `conf.d` is DEPRECATED. `up-serve` now only uses `sites-enabled`. Since everything is abstracted at a higher level, the need for maintaining two directories (Read sites-available here) is non-existent.

## `up` v. 0.2.1

- Bug fix and patch for `up kill-all` breaking unexpectedly due to undefined default config file.

## `up` v. 0.2.0

- Added CHANGELOG from here.
- Under the hood BREAKING changes. Working directories change.
   - `/var/www/` to `/etc/up-serve/static/`
   - `/etc/nginx/sites-available/` to `/etc/nginx/conf.d`
- `up static|proxy <domain>` adds the server to `/etc/up-serve/servers.up` list.
- `up kill <domain>` removes server from `servers.up` list.
- `up list` lists available servers from /etc/up-serve/servers.up!
- `up kill-all` destroys all servers and places a `default.conf` in `/etc/nginx/sites-enabled`.
