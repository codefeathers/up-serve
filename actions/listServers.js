var readServers = require('../utils/listFile').readServers;
var prettyjson = require('prettyjson');

var EOL = require('os').EOL;

function listServers() {
	var serversList = readServers();
	if(serversList) console.log(EOL + prettyjson.render(serversList) + EOL);
	else console.log("\nNo servers were found! Create some using `up`!\n");
}

module.exports = listServers;