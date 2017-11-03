// These functions just return paths. Later, these should be modified to poll from nginx's config.

var available = "/etc/nginx/sites-available/";
var enabled = "/etc/nginx/sites-enabled/";
var wwwRoot = "/var/www/";

function availableSites() {
	return available;
}

function enabledSites() {
	return enabled;
}

function webRoot() {
	return wwwRoot;
}

function webRootDomain(domain, outPort) {
	rootWithDomain = wwwRoot + domain + "." + outPort;
	return rootWithDomain;
}

module.exports.availableSites = availableSites;
module.exports.enabledSites = enabledSites;
module.exports.webRoot = webRoot;
module.exports.webRootDomain = webRootDomain;