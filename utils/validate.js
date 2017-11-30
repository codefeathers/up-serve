'use strict';

const parseToInt = require('./parseToInt');
const isIP = require('./isIP');

// Using Validator
const isDomain = require('./isFQDN');

function validate(domain, inPort, outPort) {
	//
	inPort = inPort || undefined;
	outPort = outPort || 80;

	// Error messages
	const domainInvalidMsg = [
		"Please use a domain name instead of an IP address.",
		"Domain is not valid. Please use a valid domain name."
	];
	const portInvalidMsg = [
		"Port should be a number.",
		"Port should be a number from 1 and 65535."
	];
	
	// ARGV returns a string as input.
	// Port numbers should be parsed to int to validate them.
	// If validation fails, these will return undefined and
	// will fail the subsequent test.
	const validInPort = parseToInt(inPort);
	const validOutPort = parseToInt(outPort);

	// Throw if IP is given instead of domain name.
	if (isIP(domain)) {
		throw new Error(domainInvalidMsg[0]);
	}

	// Throw if input is not a Fully Qualified Domain Name (FQDN)
	if (!isDomain(domain)) {
		throw new Error(domainInvalidMsg[1]);
	}

	// Enter if `inPort` is not defined.
	// This happens for `up static` where no inbound ports are required.
	if (typeof inPort == undefined) {
		if (!validOutPort) {
			throw new Error(portInvalidMsg[0]);// `outPort` is not an integer.
		}
		if (!(validOutPort > 0 && validOutPort <= 65535)) {
			throw new Error(portInvalidMsg[1]);
			// `outPort` is not within port range.
		}
	}

	// Enter if `inPort` is defined. This happens for `up proxy` where
	// inbound port is required.
	if (typeof inPort !== undefined) {
		if (!validInPort || !validOutPort) {
			throw new Error(portInvalidMsg[0]);
			// Either `inPort` or `outPort` is not an integer.
		}
		if (typeof outPort !== undefined) {
			if (!(
				(validInPort > 0 && validInPort <= 65535) &&
				(validOutPort > 0 && validOutPort <= 65535)
			)) {
				throw new Error(portInvalidMsg[1]);
				// Either `inPort` or `outPort` are not within port range.
			}
		}
	}
}

module.exports = validate;
