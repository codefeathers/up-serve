<br /><br /><br /><br /><br />

<p alt="up—quick server blocks in one command" align="center"><img height="80"src="assets/icon.png"></p>

<p align="center">quick <em>nginx</em> server blocks in one command</p>

<br /><br /><br /><br /><br />

# up

> Current version: `up v.0.1.0 (Pre-Alpha)`

> Notes: `up` has landed in pre-alpha! 🎉 Changelog will be added from `up v.0.2.0` [(Alpha/MVP)](Roadmap.md)\
> ⚠️ ❌ `up` is still not ready for use yet! Do not attempt to use this in development or production until alpha!

**`up`** is a command line application that creates nginx server blocks quickly with a single command.


## Installation

As of now, `up` only supports Debian and Ubuntu based distros. Support for more distros will come soon. Add an issue to bump this process.

You will need to have [_node JS_](https://nodejs.org) and [_nginx_](https://nginx.org) installed.

> ⚠️ ❌ You have been warned that `up` is still in development. If you intend to install it for development, follow these instructions:

`git clone https://github.com/codefeathers/up-serve`

`cd up-serve`

`npm install`

`npm install -g`

> `up` is now available as a command.

Alternatively, install from npm:

`npm i -g up-serve`

> `up` is now available as a command.

## Commands

`up static <domain>` - Create new static server at current folder.

`up proxy <domain> <port>` - Create new proxy server listening at said port.

`up list` - List currently available servers.

`up kill <domain>` - Kill the server for this domain.

## Examples

`up static example.com` will serve a static website from current folder.

`up proxy example.com 8081` will create a reverse proxy listening at port 8081.
