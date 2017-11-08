var fs = require('fs-extra');

var removeFromArray = require('./removeFromArray');

var listFilePath = "/etc/up-serve/servers.up";

function appendToList(domain, outPort, inPort) {
	
	inPort = inPort || undefined;
	var jsonFile = { "domains": [] };
	var domBlock = {
		"domain": domain,
		"outPort": outPort
	};

	if (!inPort) {
		domBlock.type = "static";
	} else {
		domBlock.type = "proxy";
		domBlock.inPort = inPort;
	}

	if (fs.existsSync(listFilePath)) {
		var jsonBuffer = JSON.parse(fs.readFileSync(listFilePath));
		jsonFile.domains = removeFromArray(jsonBuffer.domains, domain, outPort);
		console.log(jsonFile);
	}
	console.log(jsonFile);
	console.log(jsonFile.domains);
	jsonFile.domains.push(domBlock);
	console.log(jsonFile);
	jsonFile = JSON.stringify(jsonFile, null, '\t');
	console.log(jsonFile);
	fs.writeFileSync(listFilePath, jsonFile);
}

function removeFromList (domain, outPort) {
	var jsonFile = { "domains": [] };
	if (fs.existsSync(listFilePath)) {
		jsonFile = fs.readFileSync(listFilePath);
		jsonFile = JSON.parse(jsonFile);

		jsonFile = removeFromArray(jsonFile.domains, domain, outPort);

		jsonFile = JSON.stringify(jsonFile, null, '\t');
		fs.writeFileSync(listFilePath, jsonFile);
	}
	else console.log("\nNo servers were created using `up` yet.\n");
}

function readServers () {
	var serversList = JSON.parse(fs.readFileSync(listFilePath));
	if(!serversList.domains[0]) return undefined;
	return serversList;
}

module.exports.appendToList = appendToList;
module.exports.readServers = readServers;
module.exports.removeFromList = removeFromList;