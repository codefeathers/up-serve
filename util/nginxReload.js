var { exec } = require('child_process');

function nginxReload() {
	exec('service nginx reload', (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
}

module.exports = nginxReload;