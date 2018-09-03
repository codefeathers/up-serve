'use strict';

const e = /[-\\^$*+?.()|[\]{}]/g;
const escape = s => s.replace(e, '\\$&');
const dedent = remove => (n = 1) => str =>
	str
		.split('\n')
		.map(l => l.
			replace(
				new RegExp(`^${escape(remove).repeat(n)}`),
				''
			))
		.join('\n');

module.exports = dedent;
module.exports.tabs = dedent('\t');
module.exports.spaces = dedent(' ');
