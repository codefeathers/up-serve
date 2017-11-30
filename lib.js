'use strict';

const { EOL } = require('os');

// Requiring npm modules
const chalk = require('chalk');

// Requiring Actions
const createProxyServer = require('./actions/createProxyServer');
const createStaticServer = require('./actions/createStaticServer');
const killServer = require('./actions/killServer');
const listServers = require('./actions/listServers');

// Requiring utils
const validate = require('./utils/validate');

function server (domain, outPort = "80") {
	// If outport is not given, 80 is set as default.
	outPort = String(outPort);
	validate(domain, outPort);
	// Validates domain and outport, and if invalid, throws and returns.
	createStaticServer(domain, outPort);
	if (outPort != "80" || "443") domain = domain + ":" + outPort;
	return (EOL + [
		"Done! Your static server has been set up!",
		"Point your domain to this server and check " +
			chalk.cyan(domain) +
			" to verify!"
	].join(EOL));
}

function proxy (domain, inPort, outPort = "80") {
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

function kill (domain, outPort = "80") {
	outPort = String(outPort);
	// This is a string because regex needs to validate it.
	killServer(domain, outPort);
	return (EOL + "Done! Your server has been killed!");
}

module.exports = {
	server,
	proxy,
	list,
	kill
};
