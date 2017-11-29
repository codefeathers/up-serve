#!/usr/bin/env node

'use strict';

const { EOL } = require('os');

// Requiring npm modules
const program = require('commander');
const chalk = require('chalk');

// Require API
const up = require('./api');

// Requiring utils
const requirements = require('./utils/requirements');

// Check for requirements such as OS version and nginx install.
// Throw and exit if requirements not found.
// #Roadmap: Add ability to satisfy any possible requirements.

requirements(); // Comment in development and uncomment this line in production.
// This should check whether the OS is compatible with this version of `up`
	
let cmdValue;

program
	.version('0.2.1')
	.arguments('<cmd>')
	.action(function (cmd) {
		cmdValue = cmd;
	});

program
	.command('static <domain> [outPort]')
	.description('Create a static server at this folder.')
	.action(function (domain, outPort) {
		up.server(domain, outPort);
	});

program
	.command('proxy <domain> <inPort> [outPort]')
	.description('Create a proxy server, listening at port number.')
	.action(function (domain, inPort, outPort) {
		up.proxy(domain, inPort, outPort);
	});

program
	.command('list')
	.description('List all available servers.')
	.action(function () {
		up.list();
	});

program
	.command('kill <domain> [ourPort]')
	.description('Kill a server.')
	.action(function (domain, outPort) {
		up.kill(domain, outPort);
	});

program
	.command('kill-all')
	.description('Warning! Will completely kill all servers and reset nginx')
	.action(function() {
		up.reset();
	});


program
	.command('*') // This should pick invalid commands, but it doesn't, yet.
	.action(function () {
		console.log(EOL + "Invalid command. Type " +
			chalk.cyan('up --help') + " for help." + EOL);
	});

// Adds custom help text to the automatically generated help.
program.on('--help', function () {
	console.log(EOL
			+ '  Usage:'
			+ EOL
			+ EOL
			+ '   ' + chalk.yellow('$ up ')
			+ chalk.cyan('static')
			+ chalk.blue('[domain-name]')
			+ EOL
			+ '      Set up a static server at domain-name'
			+ EOL
			+ EOL
			+ '   ' + chalk.yellow('$ up ')
			+ chalk.cyan('proxy')
			+ chalk.blue('[domain-name] <port-number>')
			+ EOL
			+ '      Set up a proxy server listening at port-number'
			+ EOL);
});

// Parses commands passed to `up` and chooses one of the above commands.
program.parse(process.argv);

if (typeof cmdValue === 'undefined') {
	console.log(EOL + "No command was given. `up --help` for help info.");
	process.exit(1);
}
