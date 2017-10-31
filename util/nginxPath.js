function availableSites() {
	var availableSites = "/etc/nginx/available-sites/"
	return availableSites
}

function enabledSites() {
	var enabledSites = "/etc/nginx/enabled-sites/"
	return enabledSites
}

function conf(path, domain) {
	return (path + domain + ".conf")
}

module.exports.conf = conf
module.exports.availableSites = availableSites
module.exports.enabledSites = enabledSites