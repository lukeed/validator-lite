!function e(t,r,s){function n(o,i){if(!r[o]){if(!t[o]){var u="function"==typeof require&&require;if(!i&&u)return u(o,!0);if(a)return a(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var f=r[o]={exports:{}};t[o][0].call(f.exports,function(e){var r=t[o][1][e];return n(r?r:e)},f,f.exports,e,t,r,s)}return r[o].exports}for(var a="function"==typeof require&&require,o=0;o<s.length;o++)n(s[o]);return n}({1:[function(e,t,r){!function(e,s){"object"==typeof r&&"undefined"!=typeof t?t.exports=s():"function"==typeof define&&define.amd?define(s):e.Validator=s()}(this,function(){"use strict";function e(){}function t(e,t){return this.opts=r({},s,e),this.methods=r({},n,t),this.attach(this.opts.form),this}var r=function(e){var t;e=e||{};for(var r=1;r<arguments.length;r++){t=Object(arguments[r]);for(var s in t)t.hasOwnProperty(s)&&(e[s]=t[s])}return e},s={rules:{},form:null,hijack:!0,fieldClass:"field",errorClass:"error",defaultMsg:"Required",onFail:e,onPass:e},n={minLength:function(e,t){return!(e.length>=t)&&"Please enter at least "+t+" characters"},maxLength:function(e,t){return!(e.length<=t)&&"Please enter "+t+" characters or less"},btwLength:function(e,t){return n.minLength(e,t[0])||n.maxLength(e,t[1])||!1},equals:function(e,t){return e!==t&&"These values do not match"},email:function(e){return!/^[a-z0-9+_-]+(?:\.[a-z0-9+_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(e)&&"Please provide a valid email address"},url:function(e){return!/((https?):\/\/)+(www\.)?[^\s\.]+\.[^\s]{2,}/gi.test(e)&&"Please provide a valid URL."},password:function(e,t){return t=r({min:8,upp:!0,low:!0,sym:!0},t),e.length<t.min?"Password must be at least "+t.min+" characters":t.upp&&!/^(?=.*[A-Z]).*$/.test(e)?"Password must contain at least one uppercase letter":t.low&&!/^(?=.*[a-z]).*$/.test(e)?"Password must contain at least one lowercase letter":!(!t.sym||/^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).*$/.test(e))&&"Password must contain at least one symbol"}};return t.prototype={attach:function(e){var t=this.opts,r=this;t.hijack&&(r.form=e)&&(r.form.onsubmit=function(s){return s.preventDefault(),r.checkAll(this)?t.onFail(e):t.onPass(e)})},checkAll:function(e){var t=this;if(t.inputs=[],t.hasErrors=0,t.form=e||t.form,!t.form)throw new Error("Must have a `<form>` to process!");var r=[].slice.call(t.form.elements),s=t.opts.rules;return r.length&&r.forEach(function(e){e.rules=e.rules||s[e.name],e.rules&&(t.inputs.push(e),t.hasErrors=t.checkOne(e)||t.hasErrors||0)}),t.hasErrors},checkOne:function(e,t){t=t||e.rules||{};var r=this.getValue(e),s=this.getField(e,this.form),n="",a=0,o=!!e.required||t.required,i="function"==typeof t.test?t.test:this.methods[t.test];if(o&&!r.length)n=t.message||this.opts.defaultMsg;else if(r.length&&i){var u="function"==typeof t.arg?t.arg():t.arg;n=i.apply(e,[r,u])}return a=!!n,s.status={error:a,message:n},this.setError(s),a},getField:function(e,t){for(var r=new RegExp(this.opts.fieldClass,"i");(e=e.parentNode)&&!r.test(e.className)&&e!==t;);return e},getValue:function(e){return this.form.elements[e.name].value},setError:function(e,t){t=t||0;var r=e.status.error,s=this.opts.errorClass,n=e.getElementsByClassName(s)[0];!t&&r||!n?r&&n?n.innerText=e.status.message:r&&!n&&(n=document.createElement("span"),n.className=s,n.innerText=e.status.message,e.appendChild(n),e.classList.add(s)):(e.classList.remove(s),e.removeChild(n))},reset:function(){var e=this;e.inputs&&e.inputs.forEach(function(t){var r=e.getField(t,e.form);r.status={error:0},e.setError(r,1)})}},t})},{}],2:[function(e,t,r){"use strict";var s=e("../lib"),n=document.getElementById("basic"),a=(document.getElementById("blurs"),document.getElementById("form3"),new s({fieldClass:"form__field",errorClass:"form__field--error",onFail:function(e){},onPass:function(e){},rules:{text:{required:1,message:"Custom required message"},email:{required:1,message:"You must enter an email",test:"email"},password1:{required:1,message:"You must enter a password",test:"password"},password2:{required:1,message:"Please confirm your password",test:"equal",arg:function(){}}}},{custom:function(e,t){return e!==t&&"Value MUST be: "+t}}));a.attach(n)},{"../lib":1}]},{},[2]);