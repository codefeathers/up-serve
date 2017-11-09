'use strict';

const { readServers } = require('../utils/listFile');
const prettyjson = require('prettyjson');

const { EOL } = require('os');

function listServers() {
	const serversList = readServers();
	if(serversList) console.log(EOL + prettyjson.render(serversList) + EOL);
	else console.log(EOL +
		"No servers were found! Create some using `up`!" +
		EOL);
}

module.exports = listServers;
