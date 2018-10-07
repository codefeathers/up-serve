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
	
	shell.mkdir('-p', npath.enabledSites());
	// Creates directories if doesn't exist

	fs.outputFileSync((conf(npath.enabledSites(), domain, outPort)),
		`server {
			listen ${outPort};
			listen [::]:${outPort};
			index index.html index.htm;

			server_name ${domain};
				location / {
				proxy_pass http://localhost:${inPort};
				proxy_http_version 1.1;
				proxy_set_header Upgrade $http_upgrade;
				proxy_set_header Connection 'upgrade';
				proxy_set_header Host $host;
				proxy_cache_bypass $http_upgrade;
			}
		}`
	);
	
	shell.mkdir('-p', npath.enabledSites());
	// Creates directories if doesn't exist

	appendToList(domain, outPort, inPort);
	nginxReload();
}

module.exports = createProxyServer;
