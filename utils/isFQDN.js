// Module courtesy of TRGWII
// Original: https://github.com/trgwii/isFQDN

'use strict';

const fs = require('fs-extra');
const path = require('path');

// Official list of TLDs should be fetched from:
// https://data.iana.org/TLD/tlds-alpha-by-domain.txt

// You must have received a copy of the list along with `up`
// Run `npm run build` to update the cached list

function isFQDN(domain) {

	// Importing and parsing `tlds.txt` file
	const tldspath = path.join(__dirname, '/../assets/tlds.txt');
	const tlds = fs.readFileSync(tldspath, 'utf8')
		.split(/[\r\n]+/)
		.filter(x => !x.startsWith('#'));
		
	if (domain.length > 253) {
		return false;
	}

	const labels = domain.split('.').reverse();

	if (labels.length < 2) {
		return false;
	}

	const [ tld ] = labels;

	if (!tlds.includes(tld.toUpperCase())) {
		return false;
	}

	for (const label of labels) {

		const len = label.length;

		if (len > 63 || len === 0) {
			return false;
		}

		for (let i = 0; i < len; i++) {

			const char = label[i];

			if ((i === 0 || i === len - 1) && char === '-') {
				return false;
			}

			if (!char.match(/^[a-zA-Z0-9-]$/)) {
				return false;
			}
		}
	}
	return true;
}

module.exports = isFQDN;
