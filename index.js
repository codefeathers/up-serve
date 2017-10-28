#!/usr/bin/env node --harmony

var program = require('commander');
var shell = require('shelljs');
var fs = require('fs-extra');
var chalk = require('chalk');
var validator = require('validator');
var isFQDN = validator.isFQDN

/* Use in prod
if (!shell.which('nginx')) {
	shell.echo('I need nginx to work. Install nginx first. https://nginx.org/');
	shell.exit(1);
}
*/

program
	.version('0.0.1')

program
	.command('static <domain> [relativePath]')
	.description('Create a static server at this folder.')
	.action(function(domain) {
		if(!isFQDN(domain)) console.log('Domain is not valid. Please use a valid domain name.')
		// Stuff happens here
	})

program
	.command('proxy <domain> <port>')
	.description('Create a proxy server, listening at port number.')
	.action(function(domain, port) {
		if(!isFQDN(domain)) console.log('Domain is not valid. Please use a valid domain name.')
		if(typeof(port) != 'number') console.log('Port should be a number.')
		// Stuff happens here
	})
	
program
	.command('list')
	.description('List all available servers.')
	.action(function() {
		// Stuff happens here
	})
	
program
	.command('kill <domain>')
	.description('Kill a server.')
	.action(function(domain) {
		// Stuff happens here
	})

program
	.command('*')
	.action(function() {
		console.log('Invalid command. Type "up --help" for help.')
	})
	
program.on('--help', function(){
	console.log('');
	console.log('  Usage:');
	console.log('');
	console.log('   ', chalk.yellow('$ up'), chalk.cyan('static'), chalk.blue('domain-name'), chalk.grey('relative-path(optional)'));
	console.log('      Set up a static server at domain-name');
	console.log('');
	console.log('   ', chalk.yellow('$ up'), chalk.cyan('proxy'), chalk.blue('domain-name port-number'));
	console.log('      Set up a proxy server listening at port-number');
	console.log('');
	});

program.parse(process.argv);

if (program.peppers) {
	console.log('\nPlease add domain name.\nExample: up static domain.name')
}