'use strict';

// These functions just return paths.
// Later, these should be modified to poll from nginx's config.

const npath = "/etc/nginx/";
const enabled = npath + "sites-enabled/";
const confDpath = npath + "conf.d/";
const upPath = "/etc/up-serve/";
const wwwRoot = upPath + "static/";
const serverListPath = upPath + "servers";

function nginxPath() {
	return npath;
}

function enabledSites() {
	return enabled;
}

function confD() {
	return confDpath;
}

function webRoot() {
	return wwwRoot;
}

function webRootDomain(domain, outPort) {
	const path = wwwRoot + domain + "." + outPort;
	return path;
}

function serversUp() {
	const path = serverListPath + ".up";
	return path;
}

function serversBakUp() {
	const path = serverListPath + ".bak.up";
	return path;
}

module.exports = nginxPath;
module.exports.confD = confD;
module.exports.enabledSites = enabledSites;
module.exports.webRoot = webRoot;
module.exports.webRootDomain = webRootDomain;
module.exports.serversUp = serversUp;
module.exports.serversBakUp = serversBakUp;
