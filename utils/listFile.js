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
    //reads file to check if domain already exist
    var data = fs.readFileSync(listFilePath);

    var dataString = data.toString().split("\n");

    var isDomainUnique = dataString.search(domain); // returns -1 if not found else line count
    var isOutPortUnique = dataString.search(outPort); // returns -1 if not found else line count

    if (isDomainUnique == -1 && isOutPortUnique == -1) {
        //wirtes to the file in path
        fs.appendFileSync(listFilePath, addr);
    } else if (isDomainUnique == -1 || isOutPortUnique == -1) {
        if (isDomainUnique == -1) {
            var deleteOutPortLine = dataString.slice(isOutPortUnique).join('\n');
            fs.appendFileSync(listFilePath, deleteOutPortLine);
            fs.appendFileSync(listFilePath, addr);

        } else {
            var deleteDomainLine = dataString.slice(isDomainUnique).join('\n');
            fs.appendFileSync(listFilePath, deleteDomainLine);
            fs.appendFileSync(listFilePath, addr);
        }

    } else {
        var deleteDomainLine = dataString.slice(isDomainUnique).join('\n');
        fs.appendFileSync(listFilePath, deleteDomainLine);

        var data = fs.readFileSync(listFilePath);

        var dataString = data.toString().split("\n");
        var isOutPortUnique = dataString.search(outPort); // returns -1 if not found else line count

        var deleteOutPortLine = dataString.slice(isOutPortUnique).join('\n');
        fs.appendFileSync(listFilePath, deleteOutPortLine);

        fs.appendFileSync(listFilePath, addr);

    }



}

module.exports = appendToList;