'use strict';

module.exports = function (input, opts) {
	if (typeof input !== 'string') {
		throw new TypeError('Expected a string; got ' + typeof input);
	}

	opts = opts || {};

	return input + ' & ' + (opts.postfix || 'rainbows');
};
