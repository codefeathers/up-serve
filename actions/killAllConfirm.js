'use strict';

const readline = require('readline');
const killALL = require('./killALL').kill;
const noKill = require('./killALL').noKill;

function killAllConfirm() {
	console.log("\nThis action will destroy all nginx servers and return to default configuration.\nAre you sure you want to do this?" + "\nConfirm y[es] / n[o]:");
	const rl = readline.createInterface({ input: process.stdin });

	const line = () => new Promise(resolve => rl.once('line', resolve));

	line().then(line => {
		line.trim();
		if((/^(y(es)?|n(o)?)$/).test(line)) {
			line == "y" || "yes" ? killALL() : noKill();
		}
	});
}

module.exports = killAllConfirm;