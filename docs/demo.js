// hex-xor demo
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function test(testStr, shift, conf){

  // callback
  hx.enc(testStr, shift, conf, function(err, data){
    if(err){return console.log(err)}
    $('#callbackenc').val(data)

    hx.dec(data, shift, conf, function(err,data){
      if(err){return console.log(err)}
      $('#callbackdec').val(data)
    })
  })

  //sync
  let encSync = hx.encSync(testStr, shift, conf),
  decSync = hx.decSync(encSync, shift, conf);
  $('#syncenc').val(encSync)
  $('#syncdec').val(decSync)

  // promise
  hx.encP(testStr, shift, conf).then(function(res) {
    $('#promiseenc').val(res);

    hx.decP(res, shift, conf).then(function(res) {
      $('#promisedec').val(res);
    }).catch(function(err){
      console.log(err)
    });

  }).catch(function(err){
    console.log(err)
  });
}

function str2hex(str) {
	let hex = '';
	for(var i=0;i<str.length;i++) {
		hex += '' + str.charCodeAt(i).toString(16);
	}
	return hex;
}

const div = $('<div />'),
headerTpl = _.template('<h5 class="{{title}} col-sm-12">{{title}}</h5>'),
inputTpl = _.template('<div class="col-sm-6"><div class="form-group"><label>{{title}}</label><input id="{{ID}}" type="text" class="form-control"></div></div>'),
bodyConf = {
  header:['callback', 'sync', 'promise'],
  input: {dec: 'decode', enc: 'encode'},
  test: ['string', 'hex']
};

$('body').append(
  div.clone().addClass('container').append(
    $('<h2 />', {
      class:'mt-4 mb-4',
      text:'hex-xor'
    }),
    div.clone().addClass('row demo').append(
      inputTpl({title: 'config', ID:'config'}),
      inputTpl({title: 'shift', ID:'xorshift'})
    )
  )
)

$(document).ready(function() {
  let defaults = {
    reverse:true,
    uppercase:true,
    buff:[1,2]
  };

  $('#config').val(JSON.stringify(defaults))

  _.forEach(bodyConf.test, function(i){
    $('.demo').append(inputTpl({title: i, ID: i}))
  })

  _.forEach(bodyConf.header, function(i){
    $('.demo').append(headerTpl({title: i}))
    _.forIn(bodyConf.input, function(key,val){
      $('.' + i).after(inputTpl({title: key, ID: i + val}))
    })
    $('.' + i).siblings('div').find('input').not('#config,#xorshift,#string').attr('readonly', true)
  })

  $('#string').on('keyup', function(){
    $('#hex').val(str2hex($(this).val())).keyup()
  }).on('change', function(){
    $('#hex').val(str2hex($(this).val())).keyup()
  })

  $('#hex').on('keyup', function(){
    console.log($(this).val())
    test($(this).val(), parseInt($('#xorshift').val()), JSON.parse($('#config').val()))
  })

  $('#xorshift').attr({
    type: 'number',
    value: 1,
    min: 0,
    max: 15,
    step: 1
  }).on('change', function(){
    $(this).val(_.round($(this).val()))
    $('#hex').keyup();
  }).on('keyup', function(){
    $(this).val(_.round($(this).val()))
    $('#hex').keyup();
  })

});
