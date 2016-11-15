# validator-lite [![Build Status](https://travis-ci.org/lukeed/validator-lite.svg?branch=master)](https://travis-ci.org/lukeed/validator-lite)

> Lightweight Form Validation (no dependencies)


## Install

```
$ npm install --save validator-lite
```


## Usage

```js
var Validator = require('validator-lite');
var val = Validator({
  form: document.getElementById('demo'),
  onPass: function (elem) {
    window.location.href = '/welcome';
  }
}, {
  customTest: function (val, arg) {
    // `false` ~~> no error
    return (val === arg) ? false : 'Value must be equal to: ' + arg;
  }
});

```


## API

### Validator([options], [tests]);

> Add custom tests or override included defaults.

#### options.form
Type: `Element`<br>
Default: `null`

Lorem ipsum.

#### options.rules
Type: `Object`<br>
Default: `{}`

Lorem ipsum.

#### options.errorClass
Type: `String`<br>
Default: `'error'`

Lorem ipsum.

#### options.defaultMsg
Type: `String`<br>
Default: `'Required'`

Lorem ipsum.

#### options.onFail
Type: `Function`<br>
Default: `noop`

Lorem ipsum.

#### options.onPass
Type: `Function`<br>
Default: `noop`

Lorem ipsum.


#### tests.email(val)
#### tests.password(val, arg)
#### tests.url(val)
#### tests.minLength(val, arg)
#### tests.maxLength(val, arg)
#### tests.btwLength(val, arg)
#### tests.equals(val, arg)


## License

MIT © [Luke Edwards](https://lukeed.com)
