var fs = require('fs-extra');
var shell = require('shelljs');
var beautifyJSON = require("json-beautify");

var EOL = require('os').EOL; // \n if used on Linux, \r\n if used on Windows.

var listFilePath = "/etc/up-serve/servers.up";

function appendToList(domain, outPort, inPort) {
	
	inPort = inPort || undefined;
	var jsonFile = {};
	var domBlock;

	if (!inPort) {
		domBlock = {
				"type": "static",
				"outPort": outPort,
				"inPort": undefined
		}
	} else {
		domBlock = {
				"type": "proxy",
				"outPort": outPort,
				"inPort": inPort
		}
	}
	
	if (fs.existsSync(listFilePath)) {
		jsonFile = fs.readFileSync(listFilePath);
		jsonFile = JSON.parse(jsonFile);

		for (block in jsonFile) {
			if (block[domain] == domain && block[domain].outPort == outPort) {
				delete jsonFile.block;
				return;
			}
		}

		jsonFile[domain] = domBlock;
		jsonFile = beautifyJSON(jsonFile, null, 2, 30);
	}
	else {
		jsonFile[domain] = domBlock;
		jsonFile = beautifyJSON(jsonFile);
	}
	fs.writeFileSync(listFilePath, jsonFile);
}

function removeFromList (domain, outPort) {
	var jsonFile = {};
	if (fs.existsSync(listFilePath)) {
		jsonFile = fs.readFileSync(listFilePath);
		jsonFile = JSON.parse(jsonFile);

		for (block in jsonFile) {
			if (block[domain] == domain && block[domain].outPort == outPort) {
				delete jsonFile.block;
				console.log('\nDomain was deleted successfully.\n');
				return;
			}
		}

		jsonFile = beautifyJSON(jsonFile, null, 2, 30);
	}
	else {
		console.log("\Domain was not in my list. Are you sure?\n")
	}
	fs.writeFileSync(listFilePath, jsonFile);
}

function readServers () {
	return JSON.parse(fs.readFileSync(listFilePath));
}

module.exports.appendToList = appendToList;
module.exports.readServers = readServers;
module.exports.removeFromList = removeFromList;