var fs = require('fs-extra');
var shell = require('shelljs');
var path = require('path');

var npath = require('../utils/nginxPath');
var conf = require('../utils/nginxConf');
var nginxReload = require('../utils/nginxReload');

var currentPath = path.normalize(process.cwd());
var EOL = require('os').EOL; // \n if used on Linux, \r\n if used on Windows.

function createStaticServer(domain, outPort) {
	outPort = outPort || 80;
	fs.outputFileSync((conf(npath.availableSites(), domain, outPort)), // Gets nginx's paths from nginxPath.js
		"server {" + EOL +
		"	listen " + outPort + ";" + EOL +
		"	listen [::]:" + outPort + ";" + EOL +
		"	root " + npath.webRoot() + domain + ";" + EOL +
		"	index index.html index.htm;" + EOL +
		"" + EOL +
		"	server_name " + domain + ";" + EOL +
		"		location / {" + EOL +
		"		try_files $uri $uri/ =404;" + EOL +
		"	}" + EOL +
		"}"
	);
	shell.mkdir('-p', npath.enabledSites()); // Creates directory if doesn't exist
	shell.rm('-rf', conf(npath.enabledSites(), domain, outPort)); // Removes domain from sites-enabled if exists
	shell.ln('-sf', conf(npath.availableSites(), domain, outPort), conf(npath.enabledSites(), domain, outPort)); // Symlink the conf file from sites-available to sites-enabled
	shell.rm('-rf', npath.webRootDomain(domain, outPort)); // Removes domain from webroot if exists
	shell.mkdir('-p', npath.webRoot()); // Creating the nginx www path if it doesn't exist so symlink doesn't fail
	shell.ln('-sf', currentPath, npath.webRootDomain(domain, outPort)); // Symlink current directory to nginx's web root

	nginxReload();
}

module.exports = createStaticServer;