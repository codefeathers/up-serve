<p alt="up—quick server blocks in one command" align="center"><img height="80"src="assets/up.png"></p>

<p align="center">quick <em>nginx</em> server blocks in one command</p>

<br />
<br />
<br />

> ⚠️ ❌ `up` is not ready for use yet! Do not attempt to use this!

<br />

# up

**`up`** is a command line application that creates nginx server blocks quickly with a single command.

## Installation

You will need to have [_node JS_](https://nodejs.org) and [_nginx_](https://nginx.org) installed.

> ⚠️ ❌ `up` is not published on npm because it's still in development. If you intend to install it for development, follow these instructions:

`git clone https://github.com/codefeathers/up-serve`

`cd up-serve`

`npm install`

`npm install -g`

> `up` is now available as a command.

## Commands

`up static <domain>` - Create new static server at current folder.

`up proxy <domain> <port>` - Create new proxy server listening at said port.

`up list` - List currently available servers.

`up kill <domain>` - Kill the server for this domain.

## Examples:

`up static example.com` will serve a static website from current folder.

`up proxy example.com 8081` will create a reverse proxy listening at port 8081.