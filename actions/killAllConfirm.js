'use strict';

const { EOL } = require('os');

const prompt = require('prompt');
const shell = require('shelljs');

const killAll = require('./killALL');

function killAllConfirm () {
	// Start the prompt

	prompt.start();

	const property = {
		name: 'yesno',
		message: 'This will completely destroy all configs and reset nginx. ' +
			'Are you sure?',
		validator: /y[es]*|n[o]?/,
		warning: 'Must respond yes or no',
		default: 'no'
	};

	prompt.get(property, function (err, res) {
		if(res.yesno == "no") {
			console.log("Aborted!");
			shell.exit(0);
		}
		else {
			console.log("Deleting all servers...");
			killAll();
			console.log(EOL +
				"Done. All configs have been destroyed. Hope you're happy.");
		}
	});
}

module.exports = killAllConfirm;
