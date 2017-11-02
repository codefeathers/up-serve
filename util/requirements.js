var shell = require('shelljs');
var chalk = require('chalk');

function requirements() {

	// Detect Linux or BSD
	var isLin = /^linux|^bsd/.test(process.platform);
	
	// Throw if OS is not Linux or BSD. This should be changed to throw if not Debian based distro. Eventually, we can add more exceptions as `up` handles more cases.
	if(!isLin) {
		shell.echo("\nThis is not a Linux or freeBSD distribution. This tool not written for this distro. Please raise an issue at " + chalk.cyan("https://github.com/codefeathers/up-serve") + " if you want `up` to be ported for your distro");
		shell.exit(1);
	}
	
	// Throw if Nginx is not found
	if (!shell.which('nginx')) {
		shell.echo('I need nginx to work. Install nginx first. https://nginx.org/');
		shell.exit(1);
	}

}

module.exports = requirements;