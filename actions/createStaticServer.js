'use strict';

const fs = require('fs-extra');
const shell = require('shelljs');
const path = require('path');

const npath = require('../utils/nginxPath');
const conf = require('../utils/nginxConf');
const nginxReload = require('../utils/nginxReload');
const { appendToList } = require('../utils/listFile');

const currentPath = path.normalize(process.cwd());
const { EOL } = require('os'); // \n if used on Linux, \r\n if used on Windows.

function createStaticServer(domain, outPort) {
	outPort = outPort || 80;
	shell.mkdir('-p', npath.confD());
	
	fs.outputFileSync((conf(npath.confD(), domain, outPort)), // Gets nginx's paths from nginxPath.js
		"server {" + EOL +
		"	listen " + outPort + ";" + EOL +
		"	listen [::]:" + outPort + ";" + EOL +
		"	root " + npath.webRoot() + domain + "." + outPort + ";" + EOL +
		"	index index.html index.htm;" + EOL +
		"" + EOL +
		"	server_name " + domain + ";" + EOL +
		"		location / {" + EOL +
		"		try_files $uri $uri/ =404;" + EOL +
		"	}" + EOL +
		"}"
	);
	shell.mkdir('-p', npath.enabledSites()); // Creates directories if doesn't exist
	shell.rm('-rf', conf(npath.enabledSites(), domain, outPort)); // Removes domain from sites-enabled if exists
	shell.ln('-sf', conf(npath.confD(), domain, outPort), conf(npath.enabledSites(), domain, outPort)); // Symlink the conf file from confD to sites-enabled
	shell.rm('-rf', npath.webRootDomain(domain, outPort)); // Removes domain from webroot if exists
	shell.mkdir('-p', npath.webRoot()); // Creating the nginx www path if it doesn't exist so symlink doesn't fail
	shell.ln('-sf', currentPath, npath.webRootDomain(domain, outPort)); // Symlink current directory to nginx's web root

	appendToList(domain, outPort);
	nginxReload();
}

module.exports = createStaticServer;
