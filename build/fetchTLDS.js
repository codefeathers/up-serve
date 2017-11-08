var https = require('https');
var fs = require('fs-extra');

var file = fs.createWriteStream("./assets/tlds.txt");
https.get("https://data.iana.org/TLD/tlds-alpha-by-domain.txt", function(response) {
	response.pipe(file);
});