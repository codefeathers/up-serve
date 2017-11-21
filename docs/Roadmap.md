# Roadmap

This living document details our plans for `up`. If you would like to request features or move something up the roadmap, raise an issue!

> ⚠️ ❌ Disclaimers: There is NO guarantee that these will be executed in this order, or if at all. If they are executed, there is NO guarantee that they will follow the same syntax as shown in examples below. For the right syntax, check [README.md](README.md)

> The words `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, and `MAY` are used in accordance with [RFC 2119](https://tools.ietf.org/html/rfc2119)

## The Roadmap

- [x] MVP - Minimum Viable Product.
  - [x] `up static` and `up proxy` MUST work.
  - [x] `up kill` MUST work.
- [x] List servers option.
  - [x] `up list` MUST provide list of servers running from `/etc/up-serve/servers.up` file.
- [ ] `up static` MUST have an option to specify path to root. Example: `up static example.com ./public`.
- [ ] `up static` and `up proxy` MAY take a Git URL to deploy. Example:
  1. `up static example.com --git https://github.com/h5bp/html5-boilerplate /html`
  2. `up proxy example.com 5000 --git https://github.com/heroku/node-js-sample`
- [ ] Option for HTTPS.
  - [ ] MUST add a `-s` or `--secure` flag to enable automatic HTTPS config with HTTP/2 enabled by default.
    - [ ] HSTS MAY be enabled with a `-s -h`, `-sh`, `-secure -hsts` or `--secure-hsts` flag. Will warn user to be sure of what they are doing.
  - [ ] MAY add a `-c` flag to use `certbot` or `acme.sh` to automatically generate certificates using letsencrypt.
- [ ] MAY make `up` work on Windows.

Want more features or prioritize something? Raise an [issue!](https://github.com/codefeathers/up-serve/issues)

## Stretch goals

- ♦ Create an `up` client to deploy from anywhere
- ♦ Make `up` an initialization tool that combines `git init`, `npm init`, `vue init`, etc. in a neat package. Examples:
  1. `up new git`
  2. `up new vue proxy 4000`
