var fs = require('fs-extra')
var shell = require('shelljs')
var npath = require('../util/nginxPath')
var conf = require('../util/nginxConf')

var { EOL } = require('os');

function createStaticServer(domain, outPort = 80) {
    fs.outputFileSync((conf(npath.availableSites(), domain)),
        "server {" + EOL +
        "	listen " + outPort + ";" + EOL +
        "	listen [::]:" + outPort + ";" + EOL +
        "	root /var/www/" + domain + ";" + EOL +
        "	index index.html index.htm;" + EOL +
        ""   + EOL +
        "	server_name " + domain + EOL +
        "	  location / {" + EOL +
        "		try_files $uri $uri/ =404;" + EOL +
        "   }" + EOL +
        "}"
        )
        shell.mkdir('-p', npath.enabledSites())
        shell.ln('-sf', conf(npath.availableSites(), domain), conf(npath.enabledSites(), domain))
        shell.ln('-sf', ".", npath.homeDir() + domain)
}

module.exports = createStaticServer