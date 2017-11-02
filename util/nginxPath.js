// These functions just return paths. Later, these should be modified to poll from nginx's config.

function availableSites() {
	var availableSites = "/etc/nginx/sites-available/";
	return availableSites;
}

function enabledSites() {
	var enabledSites = "/etc/nginx/sites-enabled/";
	return enabledSites;
}

function webRoot() {
	var webRoot = "/var/www/";
	return webRoot;
}

module.exports.availableSites = availableSites;
module.exports.enabledSites = enabledSites;
module.exports.webRoot = webRoot;