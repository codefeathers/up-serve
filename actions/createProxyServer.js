var fs = require('fs-extra');
var shell = require('shelljs');

var npath = require('../utils/nginxPath');
var conf = require('../utils/nginxConf');
var nginxReload = require('../utils/nginxReload');
var appendToList = require('../utils/listFile').appendToList;

var EOL = require('os').EOL; // \n if used on Linux, \r\n if used on Windows.

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