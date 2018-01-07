#!/usr/bin/env node

'use strict';

const { EOL } = require('os');
const path = require('path');

// Requiring npm modules
const program = require('commander');
const chalk = require('chalk');

// Require API
const up = require('./lib');
const killAllConfirm = require('./actions/killAllConfirm');

// Requiring utils
const requirements = require('./utils/requirements');

const currentPath = path.normalize(process.cwd());
let cmdValue = '';

// Check for requirements such as OS version and nginx install.
// #Roadmap: Add ability to satisfy any possible requirements.

//requirements();
// Comment in development and uncomment this line in production.

program
	.version(up.version())
	.arguments('<cmd>')
	.action((cmd) => cmdValue = cmd);

const tryCatch = ((test, name) => {
	try {
		const msg = test();
		if(msg) console.log(msg);
	} catch (err) {
		err.message = EOL + `[${name}]: ` + err.message;
		console.log (err.message);
		process.exit(1);
	}
});

program
	.command('serve <domain> [outPort]')
	.description('Create a server at this folder.')
	.action((domain, outPort) =>
		tryCatch(
			() => up.server({
				domain: domain,
				path: currentPath,
				outPort: outPort
			}),
			'new-server'
		));

program
	.command('static <domain> [outPort]')
	.description(`DEPRECATED! Use 'up serve' instead!
		Create a static server at this folder.`)
	.action((domain, outPort) =>
		tryCatch(
			() => up.server({
				domain: domain,
				path: currentPath,
				outPort: outPort
			}),
			'new-server'
		));

program
	.command('proxy <domain> <inPort> [outPort]')
	.description('Create a proxy server, listening at port number.')
	.action((domain, inPort, outPort) =>
		tryCatch(
			() => up.proxy({
				domain: domain,
				inPort: inPort,
				outPort: outPort
			}),
			'new-proxy'
		));

program
	.command('list')
	.description('List all available servers.')
	.action(() =>
		tryCatch(
			() => up.list(),
			'list'
		));

program
	.command('kill <domain> [ourPort]')
	.description('Kill a server.')
	.action((domain, outPort) =>
		tryCatch (
			() => up.kill({
				domain: domain,
				outPort: outPort
			}),
			'kill-server'
		));

program
	.command('kill-all')
	.description('Warning! Will completely kill all servers and reset nginx')
	.action(() => killAllConfirm());


program
	.command('*') // This should pick invalid commands, but it doesn't, yet.
	.action(() => {
		console.log(EOL + "Invalid command. Type " +
			chalk.cyan('up --help') + " for help." + EOL);
	});

// Adds custom help text to the automatically generated help.
program.on('--help', () => {
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
