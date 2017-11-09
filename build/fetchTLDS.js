'use strict';

const https = require('https');
const fs = require('fs-extra');

const file = fs.createWriteStream("./assets/tlds.txt");
https.get("https://data.iana.org/TLD/tlds-alpha-by-domain.txt", function(response) {
	response.pipe(file);
});
