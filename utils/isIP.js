'use strict';

// Parses a string, and returns true if it is an IP Address.

function isIP(str) {
	const IPv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
	return IPv4.test(str);
}

module.exports = isIP;
