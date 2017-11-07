// These functions just return paths. Later, these should be modified to poll from nginx's config.

var enabled = "/etc/nginx/sites-enabled/";
var conf = "/etc/nginx/conf.d/";
var wwwRoot = "/var/www/";

function enabledSites() {
	return enabled;
}

function confD() {
	return conf;
}

function webRoot() {
	return wwwRoot;
}

function webRootDomain(domain, outPort) {
	var rootWithDomain = wwwRoot + domain + "." + outPort;
	return rootWithDomain;
}

module.exports.confD = confD;
module.exports.enabledSites = enabledSites;
module.exports.webRoot = webRoot;
module.exports.webRootDomain = webRootDomain;