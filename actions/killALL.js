var shell = require('shelljs');

var npath = require('../utils/nginxPath');
var conf = require('../utils/nginxConf');

function killALL () {
	shell.rm('-Rf', npath.serversBakUp);
	shell.mv(npath.serversUp(), npath.serversBakUp());
	shell.rm('-Rf', npath() + "sites-available");
	shell.rm('-Rf', npath.confD());
	shell.rm('-Rf', npath.enabledSites());
	shell.rm('-Rf', npath.webRoot());
	shell.mkdir('-p', npath.confD());
	shell.mkdir('-p', npath.enabledSites());
	shell.mkdir('-p', npath.webRoot());
	shell.cp('./build/defaultNginx.conf', conf(npath.confD())); // Create the default.conf file
	shell.ln('-sf', npath.confD() + "default.conf", npath.enabledSites() + "default.conf"); // Symlink the default.conf file from confD to sites-enabled	
}

module.exports = killALL;