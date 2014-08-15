var test = require('tape');
var cutils = require('..');
var convertEventCoords = cutils.convertEventCoords;

test('convertEventCoords', function (t) {
  t.plan(2);
  var coords = convertEventCoords({pageX:1042,pageY:212},{
    offsetWidth: 254,
    offsetHeight: 127,
    width: 400,
    height:200,
    offsetLeft: 833,
    offsetTop: 64 
  });

  t.equal(coords.x,329);
  t.equal(coords.y,233);
});
