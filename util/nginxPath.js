function availableSites() {
	var availableSites = "/etc/nginx/available-sites/";
	return availableSites;
}

function enabledSites() {
	var enabledSites = "/etc/nginx/enabled-sites/";
	return enabledSites;
}

function homeDir() {
	return "/var/www/";
}

module.exports.availableSites = availableSites;
module.exports.enabledSites = enabledSites;
module.exports.homeDir = homeDir;