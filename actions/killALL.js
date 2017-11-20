'use strict';

const shell = require('shelljs');
const path = require('path');

const { EOL } = require('os');

const npath = require('../utils/nginxPath');
const conf = require('../utils/nginxConf');
const nginxReload = require('../utils/nginxReload');

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
	shell.cp((path.join(__dirname, '/../build/defaultNginx.conf')),
		conf(npath.enabledSites()));
	// Create the default.conf file
	console.log("All servers were killed and reverted to default.");
	console.log(EOL + [
		"A backup of your old servers.up is " +
			"saved in /etc/up-serve/servers.bak.up.",
		"Check this if you need to."
	].join(EOL) + EOL);
	nginxReload();
}

function noKill () {
	console.log(EOL + "kill-all was interrupted by user.");
}

module.exports.kill = killALL;
module.exports.noKill = noKill;
