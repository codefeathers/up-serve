<p align="center"><img height="100"src="assets/up.png"></p>

<h1 align="center">`up`</h1>

<p align="center">quick server blocks in one command</p>

<br />
<br />

> ⚠️ ❌ `up` is not ready for use yet! Do not attempt to use this.

<br />

**`up`** is a command line application to create nginx server blocks quickly with a single command.

You will need to have nodeJS and nginx installed.

https://nodejs.org

https://nginx.org

---

### Commands

`up static <domain>` - Create new static server at current folder.

`up proxy <domain> <port>` - Create new proxy server listening at said port.

`up list` - List currently available servers.

`up kill <domain>` - Kill the server for this domain.

---

### Examples:

`up static example.com` will serve a static website from current folder.

`up proxy example.com 8081` will create a reverse proxy listening at port 8081.