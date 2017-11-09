'use strict';

const fs = require('fs-extra');
const shell = require('shelljs');

const npath = require('../utils/nginxPath');
const conf = require('../utils/nginxConf');
const nginxReload = require('../utils/nginxReload');
const { appendToList } = require('../utils/listFile');

const { EOL } = require('os'); // \n if used on Linux, \r\n if used on Windows.

function createProxyServer(domain, inPort, outPort) {
	outPort = outPort || 80;
	shell.mkdir('-p', npath.confD());

	fs.outputFileSync((conf(npath.confD(), domain, outPort)),
		"server {" + EOL +
		"	listen " + outPort + ";" + EOL +
		"	listen [::]:" + outPort + ";" + EOL +
		"	index index.html index.htm;" + EOL +
		"" + EOL +
		"	server_name " + domain + ";" + EOL +
		"		location / {" + EOL +
		"		proxy_pass http://localhost:" + inPort + ";" + EOL +
		"		proxy_http_version 1.1;" + EOL +
		"		proxy_set_header Upgrade $http_upgrade;" + EOL +
		"		proxy_set_header Connection 'upgrade';" + EOL +
		"		proxy_set_header Host $host;" + EOL +
		"		proxy_cache_bypass $http_upgrade;" + EOL +
		"	}" + EOL +
		"}"
	);
	shell.mkdir('-p', npath.confD());
	shell.mkdir('-p', npath.enabledSites()); // Creates directories if doesn't exist
	shell.ln('-sf', conf(npath.confD(), domain, outPort), conf(npath.enabledSites(), domain, outPort)); // Symlink the conf file from sites-available to sites-enabled

	appendToList(domain, outPort, inPort);
	nginxReload();
}

module.exports = createProxyServer;
