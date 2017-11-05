// Parse an input string and return a number if it is an integer. If it's a float, string, or array, return undefined.

function parseToInt(inputString) {
	var parsing = /^\d+$/.exec(inputString);
	return (parsing || [])[0];
}

module.exports = parseToInt;