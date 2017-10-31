function parseToInt(inputString) {
	var parsing = /^\d+$/.exec(inputString);
	return (parsing || [])[0];
}

module.exports = parseToInt;