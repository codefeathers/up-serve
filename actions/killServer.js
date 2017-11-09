'use strict';

const shell = require('shelljs');

const npath = require('../utils/nginxPath');
const conf = require('../utils/nginxConf');
const nginxReload = require('../utils/nginxReload');
const { removeFromList } = require('../utils/listFile');

function killServer(domain, outPort) {
	shell.rm('-rf', conf(npath.enabledSites(), domain, outPort));
	shell.rm('-rf', conf(npath.confD(), domain, outPort));
	shell.rm('-rf', npath.webRootDomain(domain, outPort));

	removeFromList(domain, outPort);
	nginxReload();
}

module.exports = killServer;
