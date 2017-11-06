// These functions just return paths.

var list = 'etc/up-serve/servers.up';

function list(domain, inPort, outPort) {
    if (inPort) {
        return (list + '  ' + domain + ':' + outPort + '  ' + 'proxy' + '  ' + inPort);
    } else {
        return (list + '  ' + domain + ':' + outPort + '  ' + 'static');
    }
}

module.exports = listFile;