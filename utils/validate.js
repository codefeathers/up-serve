var validator = require('validator');
var parseToInt = require('./parseToInt');
var isIP = require('./isIP');

// Using Validator
var isDomain = validator.isFQDN;

function validate(domain, inPort, outPort) {
	//
	inPort = inPort || undefined;
	outPort = outPort || 80;

	// Error messages
	var domainInvalidMsg = ["\nPlease use a domain name instead of an IP address.", "\nDomain is not valid. Please use a valid domain name."];
	var portInvalidMsg = ["\nPort should be a number.", "\nPort should be a number from 1 and 65535."];
	
	// ARGV returns a string as input. Port numbers should be parsed to int to validate them. If validation fails, these will return undefined and will fail the subsequent test.
	var validInPort = parseToInt(inPort);
	var validOutPort = parseToInt(outPort);

	// The value of isInvalid will be returned back. If none of the `if`s are true, the default value `true` is returned `domain`, `inPort` and `outPort` are considered validated.
	var isValid = true;

	// Throw if IP is given instead of domain name.
	if (isIP(domain)) {
		console.log(domainInvalidMsg[0]);
		return isValid = false;
	}

	// Throw if input is not a Fully Qualified Domain Name (FQDN)
	if (!isDomain(domain)) {
		console.log(domainInvalidMsg[1]);
		return isValid = false;
	}

	// Enter if `inPort` is not defined. This happens for `up static` where no inbound ports are required.
	if (typeof inPort == undefined) {
		if (!validOutPort) {
			console.log(portInvalidMsg[0]); // `outPort` is not an integer.
			return isValid = false;
		}
		if (!(validOutPort > 0 && validOutPort <= 65535)) {
			console.log(portInvalidMsg[1]); // `outPort` is not within port range.
			return isValid = false;
		}
	}

	// Enter if `inPort` is defined. This happens for `up proxy` where inbound port is required.
	if (typeof inPort !== undefined) {
		if (!validInPort || !validOutPort) {
			console.log(portInvalidMsg[0]); // Either `inPort` or `outPort` is not an integer.
			return isValid = false;
		}
		if (typeof outPort !== undefined) {
			if (!((validInPort > 0 && validInPort <= 65535) && (validOutPort > 0 && validOutPort <= 65535))) {
				console.log(portInvalidMsg[1]); // Either `inPort` or `outPort` are not within port range.
				return isValid = false;
			}
		}
		return isValid; // If any of the `if`s were true, `isInvalid = false`. If not, `isInvalid = true`.
	}
}

module.exports = validate;