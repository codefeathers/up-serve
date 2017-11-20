'use strict';

const shell = require('shelljs');

const { EOL } = require('os');

const npath = require('../utils/nginxPath');
const conf = require('../utils/nginxConf');

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
	shell.cp('./build/defaultNginx.conf', conf(npath.confD()));
	// Create the default.conf file
	shell.ln('-sf', npath.confD() + "default.conf",
		npath.enabledSites() + "default.conf");
	// Symlink the default.conf file from confD to sites-enabled	
	console.log("All servers were killed and reverted to default.");
	console.log(EOL + [
		"A backup of your old servers.up is " +
			"saved in /etc/up-serve/servers.bak.up.",
		"Check this if you need to."
	].join(EOL) + EOL);
}

function noKill () {
	console.log("\nkill-all was interrupted by user.");
}

module.exports.kill = killALL;
module.exports.noKill = noKill;
