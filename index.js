#!/usr/bin/env node

// Requiring npm modules
var program = require('commander');
var chalk = require('chalk');

// Requiring utils
var validate = require('./utils/validate');
var requirements = require('./utils/requirements');
var appendToList = require('./utils/listFile');

// Requiring Actions
var createProxyServer = require('./actions/createProxyServer');
var createStaticServer = require('./actions/createStaticServer');
var killServer = require('./actions/killServer');

var jsonFile;
// appendToList("example.com", "80");
// appendToList("example2.com", "80", "4000");
// appendToList("example2.com", "80", "4444");

console.log(jsonFile);
// Check for requirements such as OS version and nginx install. Throw and exit if requirements not found. #Roadmap: Add ability to satisfy any possible requirements.
requirements(); // Comment in development and uncomment this line in production. This should check whether the OS is compatible with this version of `up`

program
	.version('0.1.5');

program
	.command('static <domain> [outPort]')
	.description('Create a static server at this folder.')
	.action(function (domain, outPort) { //If outport is not given, 80 is set as default. Later, change this default to reflect nginx's settings.
		outPort = outPort || "80"; // This is a string because regex needs to validate it.
		if (!validate(domain, outPort)) return; //Validates domain and outport, and if invalid, throws and returns.
		createStaticServer(domain, outPort);
		if (outPort != "80" || "443") domain = domain + ":" + outPort;
		console.log("Done! Your static server has been set up!\nPoint your domain to this server and check " + chalk.cyan(domain) + " to verify!");
	});

program
	.command('proxy <domain> <inPort> [outPort]')
	.description('Create a proxy server, listening at port number.')
	.action(function (domain, inPort, outPort) { //Inbound port is necessary, but outbound is set to 80 by default. Again, will change this to reflect nginx's settings.
		outPort = outPort || "80"; // This is a string because regex needs to validate it.
		if (!validate(domain, inPort, outPort)) return;
		createProxyServer(domain, inPort, outPort);
		if (outPort != "80" || "443") domain = domain + ":" + outPort;
		console.log("Done! Your reverse proxy server has been set up!\nPoint your domain to this server and check " + chalk.cyan(domain) + " to verify!");
	});

program
	.command('list')
	.description('List all available servers.')
	.action(function () {
		// Stuff happens here
	});

program
	.command('kill <domain> [ourPort]')
	.description('Kill a server.')
	.action(function (domain, outPort) {
		outPort = outPort || "80"; // This is a string because regex needs to validate it.
		killServer(domain, outPort);
		console.log("\nDone! Your server has been killed!\n");
	});

program
	.command('*') // This should pick invalid commands, but it doesn't, yet.
	.action(function () {
		console.log("Invalid command. Type " + chalk.cyan('up --help') + " for help.");
	});

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