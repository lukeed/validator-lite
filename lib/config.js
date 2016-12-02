/**
 * Default Validator options
 */

function noop() {}

export default {
	rules: {},
	form: null,
	hijack: true,
	fieldClass: 'field',
	errorClass: 'error',
	defaultMsg: 'Required',
	onFail: noop,
	onPass: noop
};
