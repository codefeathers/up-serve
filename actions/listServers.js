'use strict';

const { readServers } = require('../utils/listFile');
const prettyjson = require('prettyjson');

const { EOL } = require('os');

function listServers() {
	const serversList = readServers();
	if(serversList) return(`${prettyjson.render(serversList)}`);
	else throw new Error(`No servers were found! Create some using \`up\`!`);
}

module.exports = listServers;
