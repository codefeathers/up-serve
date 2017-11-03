var fs = require('fs-extra');
var shell = require('shelljs');
var npath = require('../util/nginxPath');
var conf = require('../util/nginxConf');
var path = require('path');
var nginxReload = require('../util/nginxReload');

var currentPath = path.normalize(process.cwd());
var { EOL } = require('os'); // \n if used on Linux, \r\n if used on Windows.

function createStaticServer(domain, outPort = 80) {
    fs.outputFileSync((conf(npath.availableSites(), domain)), // Gets nginx's paths from nginxPath.js
        "server {" + EOL +
        "	listen " + outPort + ";" + EOL +
        "	listen [::]:" + outPort + ";" + EOL +
        "	root " + npath.webRoot() + domain + ";" + EOL +
        "	index index.html index.htm;" + EOL +
        ""   + EOL +
        "	server_name " + domain + ";" + EOL +
        "	  location / {" + EOL +
        "		try_files $uri $uri/ =404;" + EOL +
        "   }" + EOL +
        "}"
        )
        shell.mkdir('-p', npath.enabledSites()); // Creates directory if doesn't exist
        shell.rm('-rf', conf(npath.enabledSites(), domain)); // Removes domain from sites-enabled if exists
        shell.ln('-sf', conf(npath.availableSites(), domain), conf(npath.enabledSites(), domain)); // Symlink the conf file from sites-available to sites-enabled
        shell.rm('-rf', npath.webRoot() + domain); // Removes domain from webroot if exists
        shell.mkdir('-p', npath.webRoot()); // Creating the nginx www path if it doesn't exist so symlink doesn't fail
        shell.ln('-sf', currentPath, npath.webRoot() + domain); // Symlink current directory to nginx's web root

        nginxReload();
};

module.exports = createStaticServer;