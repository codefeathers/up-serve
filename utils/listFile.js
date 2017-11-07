var fs = require('fs-extra');
var shell = require('shelljs');

var EOL = require('os').EOL; // \n if used on Linux, \r\n if used on Windows.

var listFilePath = "/etc/up-serve/servers.up";

function appendToList(domain, outPort, inPort) {

	if (!inPort) {
		var domBlock = {
			domain: {
				"type": "static",
				"outPort": outPort,
				"inPort": undefined
			}
		}
	} else {
		var domBlock = {
			domain: {
				"type": "proxy",
				"outPort": outPort,
				"inPort": inPort
			}
		}
	}
	if (fs.existsSync(listFilePath)) {
		var jsonFile = fs.readFileSync(listFilePath);
		jsonFile = JSON.parse(jsonFile);

		for (block in jsonFile) {
			if (block.domain == domain && block.outPort == outPort) {
				delete jsonFile.block;
				return;
			}
		}

		jsonFile.domain = domBlock.domain;
	}
	else {
		var jsonFile = JSON.stringify(domBlock) + EOL;
	}
		fs.writeFileSync(listFilePath, jsonFile);

}

module.exports = appendToList;