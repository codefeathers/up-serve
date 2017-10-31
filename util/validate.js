var validator = require('validator');
var parseToInt = require('./parseToInt');

// Using Validator
var isDomain = validator.isFQDN

function validate(domain, inPort = undefined, outPort = "80") {
	var domainInvalidMsg = "\nDomain is not valid. Please use a valid domain name."
	var portInvalidMsg = ["\nPort should be a number.", "\nPort should be a number from 1 and 65535."]
	//var validInPort = /^\d+$/.exec(inPort)[0]
	//var validOutPort = /^\d+$/.exec(outPort)[0]
	//var regex = /^\d+$/.exec(outPort);
	//var validInPort = regex ? regex[0] : null;
	
	var validInPort = parseToInt(inPort)
	var validOutPort = parseToInt(outPort)

	var isValid = true
	if (!isDomain(domain)) {
		console.log(domainInvalidMsg)
		return isValid = false
	}
	if (typeof inPort == undefined) {
		if (!validOutPort) {
			console.log(portInvalidMsg[0])
			return isValid = false
		}
		if (!(validOutPort > 0 && validOutPort <= 65535)) {
			console.log(portInvalidMsg[1])
			return isValid = false
		}
	}
	if (typeof inPort !== undefined) {
		if (!validInPort || !validOutPort) {
			console.log(portInvalidMsg[0])
			return isValid = false
		}
		if (typeof outPort !== undefined) {
			if (!((validInPort > 0 && validInPort <= 65535) && (validOutPort > 0 && validOutPort <= 65535))) {
				console.log(portInvalidMsg[1])
				return isValid = false
			}
		}
		return isValid
	}
}

module.exports = validate