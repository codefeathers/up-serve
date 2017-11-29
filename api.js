'use strict';

const { EOL } = require('os');

// Requiring npm modules
const chalk = require('chalk');

// Requiring Actions
const createProxyServer = require('./actions/createProxyServer');
const createStaticServer = require('./actions/createStaticServer');
const killServer = require('./actions/killServer');
const listServers = require('./actions/listServers');
const killAllConfirm = require('./actions/killAllConfirm');

// Requiring utils
const validate = require('./utils/validate');

function server (domain, outPort) {
	// If outport is not given, 80 is set as default.
	// Later, change this default to reflect nginx's settings.
	outPort = String(outPort) || "80";
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
}

function proxy (domain, inPort, outPort) {
	// Inbound port is necessary, but outbound is set to 80 by default.
	// Again, will change this to reflect nginx's settings.
	outPort = String(outPort) || "80";
	inPort = String(inPort);
	// This is a string because regex needs to validate it.
	if (!validate(domain, inPort, outPort)) return;
	createProxyServer(domain, inPort, outPort);
	if (outPort != "80" || "443") domain = domain + ":" + outPort;
	console.log(EOL + [
		"Done! Your reverse proxy server has been set up!",
		"Point your domain to this server and check " +
			chalk.cyan(domain) +
			" to verify!"].join(EOL));
}

function list () {
	listServers();
}

function kill (domain, outPort) {
	outPort = String(outPort) || "80";
	// This is a string because regex needs to validate it.
	killServer(domain, outPort);
	console.log(EOL + "Done! Your server has been killed!"+ EOL);
}

function reset () {
	killAllConfirm();
}

module.exports = {
	server,
	proxy,
	list,
	kill,
	reset
};
