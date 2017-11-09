var fs = require('fs-extra');

var removeFromArray = require('./removeFromArray');
var listFilePath = require('./nginxPath').serversUp;

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

	if (fs.existsSync(listFilePath())) {
		var jsonBuffer = JSON.parse(fs.readFileSync(listFilePath()));
		jsonFile.domains = removeFromArray(jsonBuffer.domains, domain, outPort);
	}
	jsonFile.domains.push(domBlock);
	jsonFile = JSON.stringify(jsonFile, null, '\t');
	fs.writeFileSync(listFilePath(), jsonFile);
}

function removeFromList (domain, outPort) {
	if (fs.existsSync(listFilePath())) {
		var jsonFile = { "domains": [] };
		var jsonBuffer = JSON.parse(fs.readFileSync(listFilePath()));
		jsonFile.domains = removeFromArray(jsonBuffer.domains, domain, outPort);

		jsonFile = JSON.stringify(jsonBuffer, null, '\t');
		fs.writeFileSync(listFilePath(), jsonFile);
	}
	else console.log("\nNo servers were created using `up` yet.\n");
}

function readServers () {
	var serversList = JSON.parse(fs.readFileSync(listFilePath()));

	if(!serversList.domains[0]) return undefined;
	return serversList;
}

module.exports.appendToList = appendToList;
module.exports.readServers = readServers;
module.exports.removeFromList = removeFromList;