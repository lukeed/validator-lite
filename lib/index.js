'use strict';

import assign from './assign';
import config from './config';
import tests from './tests';

function Validator(el, opts, methods) {
	this.form = el;
	this.opts = assign(config, opts);
	this.methods = assign(tests, methods);
	console.log('hello', methods);
	return this;
}

Validator.prototype = {
	/**
	 * Check all input fields within a `<form>` element.
	 * @param  {Node} form  A form element
	 * @return {Boolean}    Error status; `false` = no errors
	 */
	checkAll: function (form) {
		var self = this;

		self.hasErrors = 0;
		self.form = form || self.form;
		if (!self.form) {
			throw new Error('Must have a `<form>` to process!');
		}

		var fields = [].slice.call(self.form.getElementsByClassName(self.opts.fieldClass));

		// loop thru all fields
		fields.length && fields.forEach(function (el) {
			// skip if not `rules` are attached
			if (!el.rules) return;
			// validate each
			self.hasErrors = (self.checkOne(el) || self.hasErrors) || 0;
		});

		return self.hasErrors;
	},

	/**
	 * Check a single input field.
	 * @param  {Node} field  An input or its wrapper.
	 * @return {Boolean}     Error status; `false` = no errors
	 */
	checkOne: function (field, rules) {
		rules = field.rules || {};
		var el = this.getInput(field),
			val = this.getValue(el.name),
			has = 0,
			msg = '';

		// is a value required?
		var isReq = !!(el.required) || rules.required;

		// determine a field's method of testing
		var test = typeof rules.test === 'function' ? rules.test : this.methods[rules.test];

		// check if there is even a value
		if (isReq && !val.length) {
			msg = rules.message || this.opts.defaultMsg;
		} else if (val.length && test) {
			// get test args
			var arg = (typeof rules.arg === 'function') ? rules.arg() : rules.arg;
			msg = test.apply(el, [val, arg]);
		}

		// a message ~~> an error
		has = !!msg;

		// attach error status to field
		field.status = {error: has, message: msg};

		// add/remove the error labels
		this.setError(field);

		// return error status
		return has;
	},

	/**
	 * Get the `input` within a field
	 * @return {Node}   The `<input>` element
	 */
	getInput: function (field) {
		var t = field.nodeName;
		return (t === 'TEXTAREA' || t === 'INPUT') ? field : field.querySelector('input,textarea');
	},

	/**
	 * Get an `input`s value by its name.
	 * @param  {String} name  The `<input>`'s name attribute
	 * @return {Mixed}        String|Array|Boolean
	 */
	getValue: function (name) {
		return this.form.elements[name].value;
	},

	/**
	 * Update an input field's DOM state.
	 * @param {Node} field       The <input>'s field.
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
	}
};

export default Validator;
