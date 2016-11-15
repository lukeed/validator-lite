# validator-lite [![Build Status](https://travis-ci.org/lukeed/validator-lite.svg?branch=master)](https://travis-ci.org/lukeed/validator-lite)

> Lightweight Form Validation (no dependencies)


## Install

```
$ npm install --save validator-lite
```


## Usage

```html
<form id="demo">
  <div class="form-control">
    <label>Email Address</label>
    <input type="email" name="email">
  </div>
  <div class="form-control">
    <label>Password</label>
    <input id="pw" type="password" name="password1">
  </div>
  <div class="form-control">
    <label>Confirm Password</label>
    <input type="password" name="password2">
  </div>
  <button type="submit">Register</button>
</form>

<script src="validator.min.js"></script>
<script>
  var demo = document.getElementById('demo');
  var val = new Validator({
    form: demo,
    rules: {
      email: {
      	required: true,
      	message: 'You must enter an email',
      	test: 'email'
      },
      password1: {
      	required: true,
      	message: 'You must enter a password',
      	test: 'password'
      },
      password2: {
      	required: true,
      	test: 'equals'
      	message: 'Please confirm your password',
      	arg: function () {
          return demo.querySelector('input#pw').value;
      	}
      },
    },
    onFail: function () {
      alert('Please correct all errors!');
    },
    onPass: function (elem) {
      elem.reset();
      window.location.href = '/welcome';
    }
  });
</script>


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
