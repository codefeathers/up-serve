var fs = require('fs-extra')
var shell = require('shelljs')
var npath = require('../util/nginxPath')
var conf = require('../util/nginxConf')

function createProxyServer(domain, inPort, outPort) {
    fs.outputFileSync((conf(npath.availableSites(), domain)),
        "server {" + "\r\n" +
        "	listen " + outPort + ";" + "\r\n" +
        "	listen [::]:" + outPort + ";" + "\r\n" +
        "	root /var/www/" + domain + ";" + "\r\n" +
        "	index index.html index.htm;" + "\r\n" +
        ""   + "\r\n" +
        "	server_name " + domain + ";" + "\r\n" +
        "	  location / {" + "\r\n" +
        "		proxy_pass http://localhost:" + inPort + ";" + "\r\n" +
        "		proxy_http_version 1.1;" + "\r\n" +
        "		proxy_set_header Upgrade $http_upgrade;" + "\r\n" +
        "		proxy_set_header Connection 'upgrade';" + "\r\n" +
        "		proxy_set_header Host $host;" + "\r\n" +
        "		proxy_cache_bypass $http_upgrade;" + "\r\n" +
        "   }" + "\r\n" +
        "}"
    )
    shell.mkdir('-p', npath.enabledSites())
    shell.ln('-sf', conf(npath.availableSites(), domain), conf(npath.enabledSites(), domain))
}

module.exports = createProxyServer