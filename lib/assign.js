/**
 * Simple `Object.assign` replacement
 */
export default function (tar, src) {
	tar = tar || {};
	for (var k in src) {
		if (src.hasOwnProperty(k)) {
			tar[k] = src[k];
		}
	}
	return tar;
}
