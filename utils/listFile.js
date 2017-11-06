// These functions just return paths.
var fs = require('fs-extra');
var shell = require('shelljs');

var EOL = require('os').EOL; // \n if used on Linux, \r\n if used on Windows.

var listFilePath = 'etc/up-serve/servers.up';

function appendToList(domain, outPort, inPort) {
    fs.ensureFileSync(listFilePath) // Creates directory if doesn't exist

    if (inPort) {
        var addr = domain + ':' + outPort + '  ' + 'proxy' + '  ' + inPort + EOL;
    } else {
        var addr = domain + ':' + outPort + '  ' + 'static' + EOL;
    }

    //wirtes to the file in path
    fs.appendFileSync(listFilePath, addr);
}

module.exports = appendToList;