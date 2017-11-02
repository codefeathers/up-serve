#!/usr/bin/env node

// Requiring npm modules
var program = require('commander');
var shell = require('shelljs');
var fs = require('fs-extra');
var chalk = require('chalk');

// Requiring utils
var validate = require('./util/validate');

// Requiring Actions
var createProxyServer = require('./actions/createProxyServer');
var createStaticServer = require('./actions/createStaticServer');

/* Uncomment in Production!

// Detect Linux or BSD
var isLin = /^linux|^bsd/.test(process.platform);

// Throw if OS is not Linux or BSD. This should be changed to throw if not Debian based distro. Eventually, we can add more exceptions as `up` handles more cases.
if(!isLin) {
	shell.echo("\nThis is not a Linux or freeBSD distribution. I'm not written for this distro. Please raise an issue at " + chalk.cyan("https://github.com/codefeathers/up-serve") + " if you want `up` to be ported for your distro");
	shell.exit(1);
}

// Throw if Nginx is not found
if (!shell.which('nginx')) {
	shell.echo('I need nginx to work. Install nginx first. https://nginx.org/');
	shell.exit(1);
}

*/

program
	.version('0.0.1')

program
	.command('static <domain> [outPort]')
	.description('Create a static server at this folder.')
	.action(function (domain, outPort = 80) { //If outport is not given, 80 is set as default. Later, change this default to reflect nginx's settings.
		if (!validate(domain, outPort)) return //Validates domain and outport, and if invalid, throws and returns.
		createStaticServer(domain, outPort)
		console.log("Done! Your static server has been set up!\nPoint your domain to this server and check " + chalk.cyan(domain) + " to verify!")
	})

program
	.command('proxy <domain> <inPort> [outPort]')
	.description('Create a proxy server, listening at port number.')
	.action(function (domain, inPort, outPort = "80") { //Inbound port is necessary, but outbound is set to 80 by default. Again, will change this to reflect nginx's settings.
		if (!validate(domain, inPort, outPort)) return
		createProxyServer(domain, inPort, outPort)
		console.log("Done! Your reverse proxy server has been set up!\nPoint your domain to this server and check " + chalk.cyan(domain) + " to verify!")
	})

program
	.command('list')
	.description('List all available servers.')
	.action(function () {
		// Stuff happens here
	})

program
	.command('kill <domain>')
	.description('Kill a server.')
	.action(function (domain) {
		// Stuff happens here
	})

program
	.command('*') // This should pick invalid commands, but it doesn't, yet.
	.action(function () {
		console.log("Invalid command. Type " + chalk.cyan('up --help') + " for help.")
	})

// Adds custom help text to the automatically generated help.
program.on('--help', function () {
	console.log('');
	console.log('  Usage:');
	console.log('');
	console.log('   ', chalk.yellow('$ up'), chalk.cyan('static'), chalk.blue('domain-name'));
	console.log('      Set up a static server at domain-name');
	console.log('');
	console.log('   ', chalk.yellow('$ up'), chalk.cyan('proxy'), chalk.blue('domain-name port-number'));
	console.log('      Set up a proxy server listening at port-number');
	console.log('');
});

// Parses commands passed to `up` and chooses one of the above commands.
program.parse(process.argv);