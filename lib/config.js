/**
 * Default Validator options
 */

function noop() {}

export default {
	form: null,
	rules: {},
	fieldClass: 'field',
	errorClass: 'error',
	defaultMsg: 'Required',
	onFail: noop,
	onPass: noop
};
