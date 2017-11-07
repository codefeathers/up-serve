var shell = require('shelljs');

var npath = require('../utils/nginxPath');
var conf = require('../utils/nginxConf');
var nginxReload = require('../utils/nginxReload');
var removeFromList = require('../utils/listFile').removeFromList;

function killServer(domain, outPort) {
	shell.rm('-rf', conf(npath.enabledSites(), domain, outPort));
	shell.rm('-rf', conf(npath.confD(), domain, outPort));
	shell.rm('-rf', npath.webRootDomain(domain, outPort));

	nginxReload();
	removeFromList(domain, outPort);
}

module.exports = killServer;