'use strict'

function hexXor(){
  const errMsg = 'hex-xor error';
  let baseStr = '0123456789abcdef',
  res;

  baseStr += baseStr += baseStr = baseStr.split('');

  function validHex(str){
    let regExp = /^[A-Fa-f0-9]*$/;
    return (typeof str === 'string' && regExp.test(str));
  }

  function buffIt(data,arr){
    let str= '',
    hs = baseStr.split('');

    _.forEach(Array(arr[0] * 2),function(){
      str += hs[_.random(0, 15)]
    })
    _.forEach(Array(arr[1] * 2),function(){
      data += hs[_.random(0, 15)]
    })
    str += data;
    return str;
  }

  function isOdd(i) {
    return i % 2;
  }

  function encrypt(data, shif, conf){
    let arr = [], obj = {}, rep, dat;

    if(!validHex(data)){
      obj.data = 'invalid hex string';
      obj.err = true;
      return obj;
    }

    if(conf.buff && !conf.encrypt){
      let arr2 = conf.buff;
      data = data.slice(arr2[0] * 2, -(arr2[1] * 2))
    }

    data = _.toLower(data);

    if(conf.reverse && conf.encrypt){
      data = data.split('').reverse().join('');
    }

    if(_.lt(shif, 1) || _.gt(shif, 15)){
      obj.data = 'shift must be between 1-15';
      obj.err = true;
      return obj;
    }

    try {
      data = data.split('');
      _.forEach(data, function(i,e){
        let rep;
        if(isOdd(e) && conf.encrypt || !isOdd(e) && !conf.encrypt){
          rep = _.indexOf(baseStr, i) + 16 - shif;
        } else if(!isOdd(e) && conf.encrypt || isOdd(e) && !conf.encrypt) {
          rep = _.indexOf(baseStr, i) + shif;
        }
        arr.push(baseStr[rep])
      })
      obj.data = _.join(arr,'');

      if(conf.reverse && !conf.encrypt){
        dat = obj.data;
        obj.data = dat.split('').reverse().join('');
      }

      if(conf.buff && conf.encrypt){
        obj.data = buffIt(obj.data,conf.buff)
      }

      if(conf.uppercase && !conf.encrypt){
        obj.data = _.toUpper(obj.data);
      }

      obj.err = false;
      return obj;
    } catch (err) {
      console.error(err)
      obj.data = errMsg;
      obj.err = true;
      return obj;
    }
  }

  return {
    enc: function(data, shif, conf, cb){
      if(_.isFunction(conf)){
        cb = conf;
        conf = {};
      }
      conf.encrypt = true;
      res = encrypt(data, shif, conf);
      cb(res.err, res.data);
    },
    dec: function(data, shif, conf, cb){
      if(_.isFunction(conf)){
        cb = conf;
        conf = {};
      }
      conf.encrypt = false;
      res = encrypt(data, shif, conf);
      cb(res.err, res.data);
    },
    encP: function(data, shif, conf){
      if(!conf){
        conf = {};
      }
      return new Promise(function(resolve, reject){
        conf.encrypt = true;
        res = encrypt(data, shif, conf);
        if(res.err || _.eq(res.data, '')){
          reject(errMsg);
        } else {
          resolve(res.data);
        }
      })
    },
    decP: function(data, shif, conf){
      if(!conf){
        conf = {};
      }
      return new Promise(function(resolve, reject){
        conf.encrypt = false;
        res = encrypt(data, shif, conf);
        if(res.err || _.eq(res.data, '')){
          reject(errMsg);
        } else {
          resolve(res.data);
        }
      })
    },
    encSync: function(data, shif, conf){
      if(!conf){
        conf = {};
      }
      conf.encrypt = true;
      res = encrypt(data, shif, conf);
      if(res.err || _.eq(res.data, '')){
        return errMsg;
      }
      return res.data;
    },
    decSync: function(data, shif, conf){
      if(!conf){
        conf = {};
      }
      conf.encrypt = false;
      res = encrypt(data, shif, conf);
      if(res.err || _.eq(res.data, '')){
        return errMsg;
      }
      return res.data;
    }
  }
}

const hx = new hexXor();
