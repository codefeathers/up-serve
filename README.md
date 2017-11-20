<br /><br /><br /><br /><br />

<p alt="up—quick server blocks in one command" align="center"><img height="80"src="assets/icon.png"></p>

<p align="center">quick <em>nginx</em> server blocks in one command</p>

<br /><br /><br /><br /><br />

# up

> Current version: `up v.0.2.1 (Alpha)`

> Notes: `up` is now in Alpha! 🎉 [(Changelog)](Changelog.md)\
> ⚠️ ❌ `up` is pretty useable so far. If you're testing `up` on a development server, do give us feedback.

**`up`** is a command line application that creates nginx server blocks quickly with a single command.


## Installation

`up` currently supports nginx mainline and nginx stable on Linux based distros. Support for more distros will come soon. Add an issue to bump this process. 

You will need to have [_node JS_](https://nodejs.org) and [_nginx_](https://nginx.org) installed.

Install `up` from npm:

`npm i -g up-serve`

> `up` is now available as a command.

## Basic Commands

Format: `up command <required> [optional]`

- `up static <domain> [outbound port]` - Create new static server at current folder.
- `up proxy <domain> <inbound port> [outbound port]` - Create new proxy server listening at said port.
- `up list` - List currently available servers.
- `up kill <domain>` - Kill the server for this domain.

## Examples

- `up static example.com` will serve a static website from current folder.
- `up proxy example.com 8081` will create a reverse proxy listening at port 8081.
- `up kill example.com`

## Contributors, Collaborators, and Guides

Plenty of people gave their time guiding me and shaping this tool.

I'd like to thank and give credit to [The Devs Community](https://thedevs.network), who are the primary reason this exists.

I'd also personally thank the following amazing people for their valuable support and feedback: **Pouria Ezzati, Thomas Rory Gummerson, Omar Khalil, Martin, GingerPlusPlus, Faizan Akram.**

And the following people for their moral support and listening to my constant bickering: **David (The Humanoid), Иброхеем,  Simon 'SitiSchu' Schürrle.**
