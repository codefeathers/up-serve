'use strict';

// These functions just return paths.
// Later, these should be modified to poll from nginx's config.

const npath = "/etc/nginx/";
const enabled = npath + "sites-enabled/";
const confDpath = npath + "conf.d/";
const upPath = "/etc/up-serve/";
const wwwRoot = upPath + "static/";
const serverListPath = upPath + "servers";

const nginxPath = () => npath;
module.exports = nginxPath;
module.exports.enabledSites = () => enabled;
module.exports.confD = () => confDpath;
module.exports.webRoot = () => wwwRoot;
module.exports.webRootDomain =
	(domain, outPort) =>
		wwwRoot + domain + '.' + outPort;
module.exports.serversUp = () => serverListPath + '.up';
module.exports.serversBakUp = () => serverListPath + '.bak.up';
