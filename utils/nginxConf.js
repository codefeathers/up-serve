'use strict';

// Simple function that takes a path and domain name,
// concatenates them with ".conf" and returns it.

const conf = (path, domain, outPort) => path + (domain || "default") + (outPort ? "." + outPort : "") + ".conf";

module.exports = conf;
