'use strict';

const { EOL } = require('os');

const fs = require('fs-extra');

const removeFromArray = require('./removeFromArray');
const listFilePath = require('./nginxPath').serversUp;

function appendToList(domain, outPort, inPort) {
	
	inPort = inPort || undefined;
	let jsonFile = { "domains": [] };
	const domBlock = {
		"domain": domain,
		"outPort": outPort
	};

	if (!inPort) {
		domBlock.type = "static";
	} else {
		domBlock.type = "proxy";
		domBlock.inPort = inPort;
	}

	if (fs.existsSync(listFilePath())) {
		const jsonBuffer = JSON.parse(fs.readFileSync(listFilePath()));
		jsonFile.domains = removeFromArray(jsonBuffer.domains, domain, outPort);
	}
	jsonFile.domains.push(domBlock);
	jsonFile = JSON.stringify(jsonFile, null, '\t');
	fs.writeFileSync(listFilePath(), jsonFile);
}

function removeFromList (domain, outPort) {
	if (fs.existsSync(listFilePath())) {
		let jsonFile = { "domains": [] };
		const jsonBuffer = JSON.parse(fs.readFileSync(listFilePath()));
		jsonFile.domains = removeFromArray(jsonBuffer.domains, domain, outPort);

		jsonFile = JSON.stringify(jsonBuffer, null, '\t');
		fs.writeFileSync(listFilePath(), jsonFile);
	}
	else console.log(EOL + "No servers were created using `up` yet." + EOL);
}

function readServers () {
	const serversList = JSON.parse(fs.readFileSync(listFilePath()));

	if(!serversList.domains[0]) return undefined;
	return serversList;
}

module.exports.appendToList = appendToList;
module.exports.readServers = readServers;
module.exports.removeFromList = removeFromList;
