// Parses a string, and returns true if it is an IP Address.

function isIP(str) {
	var segments = str
	  .split('.')
	  .map(Number);
	if (!segments.length === 4) {
	  return false;
	}
	for (var segment of segments) {
	  if (Number.isNaN(segment)) {
		return false;
	  }
	  if (segment < 1 || segment > 255) {
		return false;
	  }
	}
	if (segments[3] > 254) {
	  return false;
	}
	return true;
}

module.exports = isIP;