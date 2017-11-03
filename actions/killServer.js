var shell = require('shelljs');

var npath = require('../util/nginxPath');
var conf = require('../util/nginxConf');
var nginxReload = require('../util/nginxReload');

function killServer(domain, outPort) {
	shell.rm('-rf', conf(npath.enabledSites(), domain, outPort));
	shell.rm('-rf', conf(npath.availableSites(), domain, outPort));
	shell.rm('-rf', npath.webRootDomain(domain, outPort));

	nginxReload();
}

module.exports = killServer;