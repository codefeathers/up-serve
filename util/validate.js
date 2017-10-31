
var validator = require('validator')
// Using Validator
var isDomain = validator.isFQDN

function validate(domain, inPort, outPort = undefined) {
	var domainInvalidMsg = "\nDomain is not valid. Please use a valid domain name."
	var portInvalidMsg = ["\nPort should be a number.", "\nPort should be a number from 1 and 65535."]
	var validInPort = /^\d+$/.test(inPort)
	var validOutPort = /^\d+$/.test(outPort)
	var isTrue
	if (!isDomain(domain)) {
		console.log(domainInvalidMsg)
		return isTrue = false
	}
	if (typeof outPort == undefined) {
		if (!validInPort) {
			console.log(portInvalidMsg[0])
			return isTrue = false
		}
		if (!(validInPort > 0 && validInPort <= 65535)) {
			console.log(portInvalidMsg[1])
			return isTrue = false
		}
	}
	if (typeof outPort !== undefined) {
		if (!validInPort || !validOutPort) {
			console.log(portInvalidMsg[0])
			return isTrue = false
		}
		if (!((validInPort > 0 && validInPort <= 65535) && (validOutPort > 0 && validOutPort <= 65535))) {
			console.log(portInvalidMsg[1])
			return isTrue = false
		}
	}
	return isTrue
}

module.exports = validate