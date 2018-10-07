'use strict';

const readlineSync = require('readline-sync');

const { EOL } = require('os');

const killALL = require('./killALL').kill;
const { noKill } = require('./killALL');

function killAllConfirm() {
	console.log(`This action will destroy all nginx servers and return\
		to default configuration.`);
	if (readlineSync.keyInYN(`Are you sure you want to do this?`)) {
		killALL();
	}
	else {
		noKill();
	}
}

module.exports = killAllConfirm;
