'use strict';

const { EOL } = require('os');

const shell = require('shelljs');
const chalk = require('chalk');

function requirements() {

	// Detect Linux or BSD
	const isLin = /^linux|^bsd/.test(process.platform);
	
	// Throw if OS is not Linux or BSD.
	// This should be changed to throw if not Debian based distro.
	// Eventually, we can add more exceptions as `up` handles more cases.
	if(!isLin) {
		shell.echo(EOL +
			"This is not a Linux or freeBSD distribution. " +
			"This tool not written for this distro. " +
			"Please raise an issue at " +
			chalk.cyan("https://github.com/codefeathers/up-serve") +
			" if you want `up` to be ported for your distro");
		shell.exit(1);
	}

	// Check if sudo
	if (process.getuid() != 0) {
		console.log("`up` requires root privileges to work. Please use `sudo up <command>`");
		shell.exit(1);
	}
	
	// Throw if Nginx is not found
	if (!shell.which('nginx')) {
		shell.echo(
			'I need nginx to work. Install nginx first. https://nginx.org/');
		shell.exit(1);
	}
}

module.exports = requirements;
