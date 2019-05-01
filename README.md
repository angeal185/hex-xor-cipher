# hex-xor-cipher
xor cipher for shift base encrypting and decrypting hexadecimal string

Adds an extra layer of protection to your already encrypted code's hex output by essentially turning it into nothing but valid hex.

### Installation


demo: https://angeal185.github.io/hex-xor-cipher/

npm

```sh
$ npm install hex-xor-cipher --save
```

bower

```sh
$ bower install hex-xor-cipher --save
```

git
```sh
$ git clone git@github.com:angeal185/hex-xor-cipher.git
```

### nodejs

```js
const hx = require('hex-xor-cipher')
```

#### browser

```html
<script src="./path-to/lodash.min.js"></script>
<script src="./dist/hex-xor.min.js"></script>
```

#### info
* Adds a shif-based hex-xor to a valid hex string
* `000000` with a shift value of `1` would become `1f1f1f`
* `000000` with a shift value of `2` would become `2e2e2e`
* `000000` with a shift value of `1`  and `{reverse: true}` would become `f1f1f1`
* `000000` with a shift value of `1`  and `{uppercase: true}` would become `F1F1F1`
* `000000` with a shift value of `1`  and `{buff: [1,2]}` might become `73f1f1f1c48e`

#### API

```js
//default options
{
    reverse: false, // {boolean} ~ reverse hex string
    uppercase: false, //  {boolean} ~ output uppercase hex
    buff: false //  {boolean/array} ~ prepend/append random hex buffer  
}
/*
* reverse should be set to either true or false for both
  encrypt/decrypt ~ default: false

* buff accepts either a boolean for false or an array for true.
  ~ [1,2] would prepend/slice 1 byte(2 hex chars) to the start
    and append/slice 2 bytes(4 hex chars) of random data to the end
*/


/**
 *  callback
 *  htc.enc(hex, key, config, cb) / htc.dec(hex, key, config, cb)
 *  @param {string} hex ~ valid hex string
 *  @param {integer} shift ~ integer between 1-15
 *  @param {object} config ~ optional options
 *  @param {function} cb ~ callback function(err,data)
 **/

hx.enc(testStr, shift, config, cb) //returns callback
hx.dec(testStr, shift, config, cb) //returns callback

/**
 *  sync
 *  htc.encSync(hex, key, config)
 *  @param {string} hex ~ valid hex string
 *  @param {integer} shift ~ integer between 1-15
 *  @param {object} config ~ optional options
 **/

hx.encSync(testStr, shift, config) //returns a string
hx.decSync(testStr, shift, config) //returns a string

/**
 *  promise
 *  hx.encP(testStr, shift) / hx.decP(testStr, shift)
 *  @param {string} hex ~ valid hex string
 *  @param {integer} shift ~ integer between 1-15
 *  @param {object} config ~ optional options
 **/

hx.encP(testStr, shift, config) //returns a promise
hx.decP(testStr, shift, config) //returns a promise

// demo
const testStr = '01234567890abcdef',
shift = 1,
config = {
    reverse: true,
    uppercase: true,
    buff: [2,4]
}
/* callback */
//encrypt
hx.enc(testStr, shift, config, function(err, data){
    if(err){return console.log(err)}
    console.log(data)

    // decrypt
    hx.dec(data, shift, config, function(err,data){
      if(err){return console.log(err)}
      console.log(data)
    })
})
/* end callback */

/* sync */
// encrypt
let encSync = hx.encSync(testStr, shift, config),
// decrypt
decSync = hx.decSync(encSync, shift, config);
console.log('sync enc: ' + encSync)
console.log('sync dec: ' + decSync)
/* end sync */

/* promise */
//encrypt
hx.encP(testStr, shift, config).then(function(res) {
    console.log('promise enc: ' + res);

    //decript
    hx.decP(res, shift, config).then(function(res) {
      console.log('promise dec: ' + res);
    }).catch(function(err){
      console.log(err)
    });

}).catch(function(err){
    console.log(err)
});
/* end promise */
```
