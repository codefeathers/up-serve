<br /><br /><br /><br /><br />

<p alt="up—quick server blocks in one command" align="center"><img height="80"src="assets/icon.png"></p>

<p align="center">quick <em>nginx</em> server blocks in one command</p>

<br /><br /><br /><br /><br />

# up

> Current version: `up v.0.2.5 (Alpha)`

> Notes: `up` is now in Alpha! 🎉 [(Changelog)](/docs/Changelog.md)\
> ⚠️ `up` is pretty useable so far. If you're testing `up` on a development server, do give us feedback.

**`up`** is a command line application that creates nginx server blocks quickly with a single command.


## Installation

`up` currently supports nginx mainline and nginx stable on Linux based distros. Support for more distros will come soon. Add an issue to bump this process. 

You will need to have [_node JS_](https://nodejs.org) and [_nginx_](https://nginx.org) installed.

Install `up` from npm:

`npm i -g up-serve`

> `up` is now available as a command.

## Basic Commands

Format: `up command <required> [optional]`

- `up serve <domain> [outbound port]` - Create new static server at current folder.
	- `up static` is deprecated from `v. 0.2.5` (see [changelog](/docs/CHANGELOG.md))
- `up proxy <domain> <inbound port> [outbound port]` - Create new proxy server listening at said port.
- `up list` - List currently available servers.
- `up kill <domain>` - Kill the server for this domain.

## Examples

- `up static example.com` will serve a static website from current folder.
- `up proxy example.com 8081` will create a reverse proxy listening at port 8081.
- `up kill example.com` will kill the server named example.com.
- `up list` will fetch a list of servers created with `up`.

## API

```JavaScript
const up = require('up-serve')

console.log(up.version()) // up v. 0.2.5

let result = up.server("example.com", "path/to/project", "80")
console.log(result) // Will log success or throw if error

let result = up.kill("example.com", "80")
console.log(result) // Will log success or throw if error
```

More detailed API documentation coming soon.

---

<h2 align="center">Meta</h2>

<h4 align="center"><a href="/docs/Roadmap.MD">Roadmap</a></h4>

<h4 align="center"><a href="Contributing.MD">Contribution Guidelines</a></h4>

<h4 align="center"><a href="/docs/Contributors.md">Contributors, Collaborators, and Guides</a></h4>
