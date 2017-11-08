function removeFromArray (arr, dom, port) {
	var shouldDelete = [];

	for(var i = 0; i < arr.length; i++) if((arr[i].domain == dom) && (arr[i].outPort == port)) shouldDelete = [true, i];

	if (shouldDelete[0]) {
		arr.splice(shouldDelete[1], 1);
	}
	return arr;
}

module.exports = removeFromArray;