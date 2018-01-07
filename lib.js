'use strict';

const { EOL } = require('os');

// Requiring npm modules
const chalk = require('chalk');

// Requiring Actions
const createNewServer = require('./actions/createNewServer');
const createProxyServer = require('./actions/createProxyServer');
const killServer = require('./actions/killServer');
const listServers = require('./actions/listServers');

// Requiring utils
const validate = require('./utils/validate');

const pacversion = 'up-serve v. ' + require('./package.json').version;

function version () {
	return pacversion;
}

function server (options) {
	let { domain, path, outPort = "80" } = options;
	// If outport is not given, 80 is set as default.
	outPort = String(outPort);
	validate(domain, outPort);
	// Validates domain and outport, and if invalid, throws and returns.
	createNewServer(domain, path, outPort);
	if (outPort != "80" || "443") domain = domain + ":" + outPort;
	return (EOL + [
		"Done! Your static server has been set up!",
		"Point your domain to this server and check " +
			chalk.cyan(domain) +
			" to verify!"
	].join(EOL));
}

function proxy (options) {
	let { domain, inPort, outPort = "80" } = options;
	// Inbound port is necessary, but outbound is set to 80 by default.
	outPort = String(outPort);
	inPort = String(inPort);
	// This is a string because regex needs to validate it.
	validate(domain, inPort, outPort);
	createProxyServer(domain, inPort, outPort);
	if (outPort != "80" || "443") domain = domain + ":" + outPort;
	return (EOL + [
		"Done! Your reverse proxy server has been set up!",
		"Point your domain to this server and check " +
			chalk.cyan(domain) +
			" to verify!"].join(EOL));
}

function list () {
	return listServers();
}

function kill (options) {
	let { domain, outPort = "80" } = options;
	outPort = String(outPort);
	// This is a string because regex needs to validate it.
	killServer(domain, outPort);
	return (EOL + "Done! Your server has been killed!");
}

module.exports = {
	version,
	server,
	proxy,
	list,
	kill
};
