'use strict';

// Parses a string, and returns true if it is an IP Address.

function isIP(str) {
	const segments = str
		.split(".")
		.map(Number);
	if (!segments.length === 4) {
		return false;
	}
	for(let i = 0; i < segments.length; i++) {
		const segment = segments[i];
		if (Number.isNaN(segment)) {
			return false;
		}
		if (segment < 1 || segment > 255) {
			return false;
		}
	}
	if (segments[3] > 254) {
		return false;
	}
	return true;
}

module.exports = isIP;
