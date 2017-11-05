var shell = require('shelljs');

var npath = require('../utils/nginxPath');
var conf = require('../utils/nginxConf');
var nginxReload = require('../utils/nginxReload');

function killServer(domain, outPort) {
	shell.rm('-rf', conf(npath.enabledSites(), domain, outPort));
	shell.rm('-rf', conf(npath.availableSites(), domain, outPort));
	shell.rm('-rf', npath.webRootDomain(domain, outPort));

	nginxReload();
}

module.exports = killServer;