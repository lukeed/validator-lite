'use strict';

import assign from './assign';

// Default Test Methods
// -- if (condition is true) then (no error) else (error msg)

var tests = {
	minLength: function (val, arg) {
		return (val.length >= arg) ? false : 'Please enter at least ' + arg + ' characters';
	},

	maxLength: function (val, arg) {
		return (val.length <= arg) ? false : 'Please enter ' + arg + ' characters or less';
	},

	btwLength: function (val, arg) {
		return tests.minLength(val, arg[0]) || tests.maxLength(val, arg[1]) || false;
	},

	equals: function (val, arg) {
		return (val === arg) ? false : 'These values do not match';
	},

	email: function (val) {
		// return /^(?:\w+\-?\.?\+?)*\w+@(?:\w+\.\-?)+\w+$/.test(val) ? false : 'Please provide a valid email address';
		return /^[a-z0-9+_-]+(?:\.[a-z0-9+_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(val) ? false : 'Please provide a valid email address';
	},

	url: function (val) {
		// requires http(s):// to start
		return /((https?):\/\/)+(www\.)?[^\s\.]+\.[^\s]{2,}/gi.test(val) ? false : 'Please provide a valid URL.';
	},

	password: function (val, arg) {
		arg = assign({min: 8, upp: true, low: true, sym: true}, arg);
		if (val.length < arg.min) {
			return 'Password must be at least ' + arg.min + ' characters';
		} else if (arg.upp && !/^(?=.*[A-Z]).*$/.test(val)) {
			return 'Password must contain at least one uppercase letter';
		} else if (arg.low && !/^(?=.*[a-z]).*$/.test(val)) {
			return 'Password must contain at least one lowercase letter';
		} else if (arg.sym && !/^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).*$/.test(val)) {
			return 'Password must contain at least one symbol';
		}
		return false;
	}
};

export default tests;
