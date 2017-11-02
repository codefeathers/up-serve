// Simple function that takes a path and domain name, concatenates them with ".conf" and returns it.

function conf(path, domain) {
	return (path + domain + ".conf");
}

module.exports = conf;