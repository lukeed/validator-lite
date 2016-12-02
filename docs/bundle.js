(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Validator = factory());
}(this, (function () { 'use strict';

/**
 * Simple `Object.assign` replacement
 */
var assign = function (tar) {
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
};

/**
 * Default Validator options
 */

function noop() {}

var config = {
	rules: {},
	form: null,
	hijack: true,
	fieldClass: 'field',
	errorClass: 'error',
	defaultMsg: 'Required',
	onFail: noop,
	onPass: noop
};

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

function Validator(opts, methods) {
	this.opts = assign({}, config, opts);
	this.methods = assign({}, tests, methods);
	this.attach(this.opts.form);
	return this;
}

Validator.prototype = {
	/**
	 * Attach to & save a `<form>`, incl listeners
	 * @param  {Node} form  A form element
	 */
	attach: function (form) {
		var o = this.opts,
			self = this;
		if ((self.form = form) && o.hijack) {
			self.form.onsubmit = function (e) {
				e.preventDefault();
				return self.checkAll(this) ? o.onFail(form) : o.onPass(form);
			};
		}
	},

	/**
	 * Check all input fields within a `<form>` element.
	 * @param  {Node} form  A form element
	 * @return {Boolean}    Error status; `false` = no errors
	 */
	checkAll: function (form) {
		var self = this;

		self.inputs = [];
		self.hasErrors = 0;
		self.form = form || self.form;
		if (!self.form) {
			throw new Error('Must have a `<form>` to process!');
		}

		var inputs = [].slice.call(self.form.elements);
		var rules = self.opts.rules;

		// loop thru all inputs
		inputs.length && inputs.forEach(function (el) {
			// attach ruleset
			el.rules = el.rules || rules[el.name];
			// skip if no `rules` provided / can be attached
			if (!el.rules) return;
			// save as known input
			self.inputs.push(el);
			// validate each
			self.hasErrors = (self.checkOne(el) || self.hasErrors) || 0;
		});

		return self.hasErrors;
	},

	/**
	 * Check a single input field.
	 * @param  {Node} input    An `input` element
	 * @param  {Object} rules  The `<input>`s ruleset
	 * @return {Boolean}       Error status; `false` = no errors
	 */
	checkOne: function (input, rules) {
		rules = rules || input.rules || {};
		var val = this.getValue(input),
			fld = this.getField(input, this.form),
			msg = '',
			has = 0;

		// is a value required?
		var isReq = !!(input.required) || rules.required;

		// determine a field's method of testing
		var test = typeof rules.test === 'function' ? rules.test : this.methods[rules.test];

		// check if there is even a value
		if (isReq && !val.length) {
			msg = rules.message || this.opts.defaultMsg;
		} else if (val.length && test) {
			// get test args
			var arg = (typeof rules.arg === 'function') ? rules.arg() : rules.arg;
			msg = test.apply(input, [val, arg]);
		}

		// a message ~~> an error
		has = !!msg;

		// attach error status to field
		fld.status = {error: has, message: msg};

		// add/remove the error labels
		this.setError(fld);

		// return error status
		return has;
	},

	/**
	 * Get the `input`'s parent field
	 * @param  {Node} el    An `input` element
	 * @param  {Node} form  The parent `<form>`; stop here.
	 * @return {Node}       The `field` parent element.
	 */
	getField: function (el, form) {
		var rgx = new RegExp(this.opts.fieldClass, 'i');
		while ((el = el.parentNode) && !rgx.test(el.className) && (el !== form));
		return el;
	},

	/**
	 * Get an `input`s value by its name.
	 * @param  {Node} el  The `input` to read.
	 * @return {Mixed}    String|Array|Boolean
	 */
	getValue: function (el) {
		return this.form.elements[el.name].value;
	},

	/**
	 * Update an input field's DOM state.
	 * @param {Node} field       The <input>'s parent field.
	 * @param {Boolean} toReset  If error state should force reset.
	 */
	setError: function (field, toReset) {
		toReset = toReset || 0;
		var has = field.status.error,
			errCls = this.opts.errorClass,
			errElm = field.getElementsByClassName(errCls)[0];

		// if not long `has` error or asked `toReset`
		if ((toReset || !has) && errElm) {
			// do cleanup
			field.classList.remove(errCls);
			field.removeChild(errElm);
		} else if (has && errElm) {
			// update error's message
			errElm.innerText = field.status.message;
		} else if (has && !errElm) {
			// create new error elem
			errElm = document.createElement('span');
			errElm.className = errCls;
			errElm.innerText = field.status.message;
			// add to `field`
			field.appendChild(errElm);
			// add error class
			field.classList.add(errCls);
		}
	},

	/**
	 * Reset all fields, if has a form with inputs
	 */
	reset: function () {
		var self = this;
		self.inputs && self.inputs.forEach(function (el) {
			var fld = self.getField(el, self.form);
			fld.status = {error: 0};
			self.setError(fld, 1);
		});
	}
};

return Validator;

})));

},{}],2:[function(require,module,exports){
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

},{"../lib":1}]},{},[2]);
