var fs = require('fs-extra');
var shell = require('shelljs');

var removeFromArray = require('./removeFromArray');

var EOL = require('os').EOL; // \n if used on Linux, \r\n if used on Windows.

var listFilePath = "./servers.up";

function appendToList(domain, outPort, inPort) {
	
	inPort = inPort || undefined;
	var jsonFile = { "domains": [] };
	var domBlock;

	if (!inPort) {
		domBlock = {
			"domain": domain,
			"type": "static",
			"outPort": outPort
		};
	} else {
		domBlock = {
			"domain": domain,
			"type": "proxy",
			"outPort": outPort,
			"inPort": inPort
		};
	}
	
	if (fs.existsSync(listFilePath)) {
		jsonFile = fs.readFileSync(listFilePath);
		jsonFile = JSON.parse(jsonFile);

		/*for (name in jsonFile) {
			if (name == domain && jsonFile[name][outPort] == outPort) {
			delete jsonFile[domain];
			console.log('\nDomain was deleted successfully.\n');
			}
		}*/
		jsonFile = removeFromArray(jsonFile.domains, domain, outPort);
	}
	
	jsonFile.domains.push(domBlock);
	jsonFile = JSON.stringify(jsonFile, null, '\t');
	fs.writeFileSync(listFilePath, jsonFile);
}

function removeFromList (domain, outPort) {
	var jsonFile = {};
	if (fs.existsSync(listFilePath)) {
		jsonFile = fs.readFileSync(listFilePath);
		jsonFile = JSON.parse(jsonFile);
		
		// for (name in jsonFile) {
		// 	if (name == domain && jsonFile[domain].outPort == outPort) {
		// 	delete jsonFile[domain];
		// 	console.log('\nDomain was deleted successfully.\n');
		// 	}
		// }
		jsonFile = removeFromArray(jsonFile.domains, domain, outPort);

		jsonFile = JSON.stringify(jsonFile, null, '\t');
		fs.writeFileSync(listFilePath, jsonFile);
	}
	else console.log("\nNo servers were created using `up` yet.\n");
}

function readServers () {
	var serversList = JSON.parse(fs.readFileSync(listFilePath));
	if(!serversList[0]) return undefined;
	return serversList;
}

module.exports.appendToList = appendToList;
module.exports.readServers = readServers;
module.exports.removeFromList = removeFromList;