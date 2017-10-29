<p align="center"><a href="http://moonjs.ga" target="_blank"><img width="100"src="assets/up.png"></a></p>

---

<h2 align="center">`up` — quick server blocks</h1>

---

> ⚠️ ❌ `up` is not ready for use yet! Do not attempt to use this.

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