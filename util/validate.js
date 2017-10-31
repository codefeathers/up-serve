var validator = require('validator')
// Using Validator
var isDomain = validator.isFQDN

function validate(domain, inPort = undefined, outPort = undefined) {
	var domainInvalidMsg = "\nDomain is not valid. Please use a valid domain name."
	var portInvalidMsg = ["\nPort should be a number.", "\nPort should be a number from 1 and 65535."]
	var validInPort = /^\d+$/.exec(inPort)
	var validOutPort = /^\d+$/.exec(outPort)
	var isTrue = true
	if (!isDomain(domain)) {
		console.log(domainInvalidMsg)
		return isTrue = false
	}
	if (typeof inPort == undefined) {
		if (!validOutPort) {
			console.log(portInvalidMsg[0])
			return isTrue = false
		}
		if (!(validOutPort > 0 && validOutPort <= 65535)) {
			console.log(portInvalidMsg[1])
			return isTrue = false
		}
	}
	if (typeof inPort !== undefined) {
		if (!validInPort || !validOutPort) {
			console.log(portInvalidMsg[0])
			return isTrue = false
		}
		if (typeof outPort !== undefined) {
			console.log(validInPort)
			if (!((validInPort > 0 && validInPort <= 65535) && (validOutPort > 0 && validOutPort <= 65535))) {
				console.log(portInvalidMsg[1])
				return isTrue = false
			}
		}
		return isTrue
	}
}

module.exports = validate