var shell = require('shelljs');

var npath = require('../util/nginxPath');
var conf = require('../util/nginxConf');
var nginxReload = require('../util/nginxReload');

function killServer(domain) {
	shell.rm('-rf', conf(npath.enabledSites(), domain));
	shell.rm('-rf', conf(npath.availableSites(), domain));
	shell.rm('-rf', npath.webRoot() + domain);

	nginxReload();
}

module.exports = killServer;