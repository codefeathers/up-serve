#!/usr/bin/env node

'use strict';

const { EOL } = require('os');

// Requiring npm modules
const program = require('commander');
const chalk = require('chalk');
//var fs = require('fs-extra');

// Requiring Actions
const createProxyServer = require('./actions/createProxyServer');
const createStaticServer = require('./actions/createStaticServer');
const killServer = require('./actions/killServer');
const listServers = require('./actions/listServers');
const killAllConfirm = require('./actions/killAllConfirm');

// Requiring utils
const validate = require('./utils/validate');
const requirements = require('./utils/requirements');

// Check for requirements such as OS version and nginx install.
// Throw and exit if requirements not found.
// #Roadmap: Add ability to satisfy any possible requirements.

requirements(); // Comment in development and uncomment this line in production.
// This should check whether the OS is compatible with this version of `up`

program
	.version('0.2.0');

program
	.command('static <domain> [outPort]')
	.description('Create a static server at this folder.')
	.action(function (domain, outPort) {
		// If outport is not given, 80 is set as default.
		// Later, change this default to reflect nginx's settings.
		outPort = outPort || "80";
		// This is a string because regex needs to validate it.
		if (!validate(domain, outPort)) return;
		// Validates domain and outport, and if invalid, throws and returns.
		createStaticServer(domain, outPort);
		if (outPort != "80" || "443") domain = domain + ":" + outPort;
		console.log(EOL + [
			"Done! Your static server has been set up!",
			"Point your domain to this server and check " +
				chalk.cyan(domain) +
				" to verify!"
		].join(EOL));
	});

program
	.command('proxy <domain> <inPort> [outPort]')
	.description('Create a proxy server, listening at port number.')
	.action(function (domain, inPort, outPort) {
		// Inbound port is necessary, but outbound is set to 80 by default.
		// Again, will change this to reflect nginx's settings.
		outPort = outPort || "80";
		// This is a string because regex needs to validate it.
		if (!validate(domain, inPort, outPort)) return;
		createProxyServer(domain, inPort, outPort);
		if (outPort != "80" || "443") domain = domain + ":" + outPort;
		console.log(EOL + [
			"Done! Your reverse proxy server has been set up!",
			"Point your domain to this server and check " +
				chalk.cyan(domain) +
				" to verify!"
		].join(EOL));
	});

program
	.command('list')
	.description('List all available servers.')
	.action(function () {
		listServers();
	});

program
	.command('kill <domain> [ourPort]')
	.description('Kill a server.')
	.action(function (domain, outPort) {
		outPort = outPort || "80";
		// This is a string because regex needs to validate it.
		killServer(domain, outPort);
		console.log(EOL + "Done! Your server has been killed!"+ EOL);
	});

program
	.command('kill-all')
	.description('Warning! Will completely kill all servers and reset nginx')
	.action(function() {
		//new Promise(resolve => killed\killAllConfirm();
		killAllConfirm();
	});

program
	.command('*') // This should pick invalid commands, but it doesn't, yet.
	.action(function () {
		console.log(EOL + "Invalid command. Type " +
			chalk.cyan('up --help') + " for help." + EOL);
	});

// Adds custom help text to the automatically generated help.
program.on('--help', function () {
	console.log('');
	console.log('  Usage:');
	console.log('');
	console.log('   ',
		chalk.yellow('$ up'),
		chalk.cyan('static'),
		chalk.blue('domain-name'));
	console.log('      Set up a static server at domain-name');
	console.log('');
	console.log('   ',
		chalk.yellow('$ up'),
		chalk.cyan('proxy'),
		chalk.blue('domain-name port-number'));
	console.log('      Set up a proxy server listening at port-number');
	console.log('');
});

// Parses commands passed to `up` and chooses one of the above commands.
program.parse(process.argv);
