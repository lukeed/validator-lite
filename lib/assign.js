/**
 * Simple `Object.assign` replacement
 */
export default function (tar) {
	var src;
	tar = tar || {};
	for (var s = 1; s < arguments.length; s++) {
		src = Object(arguments[s]);
		for (var k in src) {
			if (src.hasOwnProperty(k)) {
				tar[k] = src[k];
			}
		}
	}
	return tar;
}
