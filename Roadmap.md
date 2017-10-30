# Roadmap

This living document details our plans for `up`. If you would like to request features or move something up the roadmap, raise an issue!

> The words `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, and `MAY` are used in accordance with [RFC 2119](https://tools.ietf.org/html/rfc2119)

- [ ] MVP - Minimum Viable Product.
	- `up static` and `up proxy` MUST work.
	- `up kill` MUST work.
- [ ] List servers option.
	- `up list` MUST provide list of servers running by parsing nginx's `sites-available` and `sites-enabled` folders.
- [ ] Option for HTTPS.
	- MUST add a `-s` flag to enable HTTPS config.
	- MAY add a `-c` flag to use `certbot` to automatically generate certificates using letsencrypt.

Want more features? Raise an [issue!](https://github.com/codefeathers/up-serve/issues)

## Stretch goals

### ♦ Create an `up` client to deploy from anywhere