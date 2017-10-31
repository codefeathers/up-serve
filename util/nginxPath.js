function availableSites() {
	var availableSites = "/etc/nginx/available-sites/"
	return availableSites
}

function enabledSites() {
	var enabledSites = "/etc/nginx/enabled-sites/"
	return enabledSites
}

module.exports.availableSites = availableSites
module.exports.enabledSites = enabledSites