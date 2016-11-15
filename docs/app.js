'use strict';

var Validator = require('../lib');

var basic = document.getElementById('basic');
var blurs = document.getElementById('blurs');
var form3 = document.getElementById('form3');

var val = new Validator({
	fieldClass: 'form__field',
	errorClass: 'form__field--error',
	onFail: function (el) {
		console.log('failed', el);
	},
	onPass: function (el) {
		console.log('Passed', el);
	},
	rules: {
		text: {required: 1, message: 'Custom required message'},
		email: {required: 1, message: 'You must enter an email', test: 'email'},
		password1: {required: 1, message: 'You must enter a password', test: 'password'},
		password2: {required: 1, message: 'Please confirm your password', test: 'equal', arg: function () {
			// return
		}}
	}
}, {
	custom: function (val, arg) {
		return val === arg ? false : 'Value MUST be: ' + arg;
	}
});

val.attach(basic);

// var val2 = new Validator({fieldClass: 'hello'});

console.log(val);
// console.log(val2);
