const hx = require('../lib');

(function(){
  let testStr = '9876543210fedcba',
  shift = 1,
  conf = {
    reverse: true,
    uppercase: true,
    buff: [1,3]
  }

  // test callback
  hx.enc(testStr, shift, conf, function(err, data){
    if(err){return console.log(err)}
    console.log('callback enc: ' + data)

    hx.dec(data, shift, conf, function(err,data){
      if(err){return console.log(err)}
      console.log('callback dec: ' + data)
    })
  })

  // test sync
  let encSync = hx.encSync(testStr, shift, conf),
  decSync = hx.decSync(encSync, shift, conf);
  console.log('sync enc: ' + encSync)
  console.log('sync dec: ' + decSync)

  // test promise
  hx.encP(testStr, shift, conf).then(function(res) {
    console.log('promise enc: ' + res);

    hx.decP(res, shift, conf).then(function(res) {
      console.log('promise dec: ' + res);
    }).catch(function(err){
      console.log(err)
    });

  }).catch(function(err){
    console.log(err)
  });
})()
