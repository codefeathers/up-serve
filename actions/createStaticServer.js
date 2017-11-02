var fs = require('fs-extra');
var shell = require('shelljs');
var npath = require('../util/nginxPath');
var conf = require('../util/nginxConf');

var { EOL } = require('os'); // \n if used on Linux, \r\n if used on Windows.

function createStaticServer(domain, outPort = 80) {
    fs.outputFileSync((conf(npath.availableSites(), domain)), // Gets nginx's paths from nginxPath.js
        "server {" + EOL +
        "	listen " + outPort + ";" + EOL +
        "	listen [::]:" + outPort + ";" + EOL +
        "	root " + npath.webRoot() +  + domain + ";" + EOL +
        "	index index.html index.htm;" + EOL +
        ""   + EOL +
        "	server_name " + domain + EOL +
        "	  location / {" + EOL +
        "		try_files $uri $uri/ =404;" + EOL +
        "   }" + EOL +
        "}"
        )
        shell.mkdir('-p', npath.enabledSites()); // Creates directory if doesn't exist
        shell.rm('-rf', conf(npath.enabledSites(), domain));
        shell.ln('-sf', conf(npath.availableSites(), domain), conf(npath.enabledSites(), domain)); // Symlink the conf file from sites-available to sites-enabled
        shell.rm('-rf', npath.webRoot() + domain);
        shell.ln('-sf', "./", npath.webRoot() + domain); // Symlink current directory to nginx's web root
};

module.exports = createStaticServer;