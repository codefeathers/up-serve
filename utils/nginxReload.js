'use strict';

const { execSync } = require('child_process');

function nginxReload() {
	try {
		execSync('service nginx reload', {
			stdio: 'ignore'
		});
		execSync('service nginx start', {
			stdio: 'ignore'
		});
	} catch (err) {
		throw new Error('nginx failed to load');
	}
	return;
}

module.exports = nginxReload;
