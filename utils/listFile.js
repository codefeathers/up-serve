'use strict';

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
		domBlock.type = "static/server";
	} else {
		domBlock.type = "proxy server";
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
		const jsonContent = fs.readFileSync(listFilePath(), "utf-8");
		const jsonBuffer = JSON.parse(jsonContent);
		for (let i = 0; i < (jsonBuffer.domains).length; i ++) {
			if(jsonBuffer.domains[i].domain == domain){
				jsonFile.domains =
					removeFromArray(jsonBuffer.domains, domain, outPort);
		
				jsonFile = JSON.stringify(jsonFile, null, '\t');
				fs.writeFileSync(listFilePath(), jsonFile);
				return;
			}
		}
		throw new Error("This domain does not exist in servers.up");
	}
	else throw new Error("No servers were created using `up` yet.");
}

function readServers () {
	let serversList;
	if (fs.existsSync(listFilePath())) {
		serversList = JSON.parse(fs.readFileSync(listFilePath()));
		if(!serversList.domains[0]) {
			throw new Error("No domains exist in servers.up");
		}
	}
	else {
		return "No servers were created using `up` yet.";
	}
	return serversList;
}

module.exports.appendToList = appendToList;
module.exports.readServers = readServers;
module.exports.removeFromList = removeFromList;
