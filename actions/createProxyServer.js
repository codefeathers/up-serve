var fs = require('fs-extra');
var shell = require('shelljs');

var npath = require('../util/nginxPath');
var conf = require('../util/nginxConf');
var nginxReload = require('../util/nginxReload');

var EOL = require('os').EOL; // \n if used on Linux, \r\n if used on Windows.

function createProxyServer(domain, inPort, outPort) {
	fs.outputFileSync((conf(npath.availableSites(), domain, outPort)),
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
	shell.mkdir('-p', npath.enabledSites()); // Creates directory if doesn't exist
	shell.ln('-sf', conf(npath.availableSites(), domain, outPort), conf(npath.enabledSites(), domain, outPort)); // Symlink the conf file from sites-available to sites-enabled

	nginxReload();
}

module.exports = createProxyServer;