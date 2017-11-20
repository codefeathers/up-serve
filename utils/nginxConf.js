'use strict';

// Simple function that takes a path and domain name,
// concatenates them with ".conf" and returns it.

function conf(path, domain, outPort) {
	domain = domain || "";
	outPort = outPort || "";
	return (path + domain + "." + outPort + ".conf");
}

module.exports = conf;
