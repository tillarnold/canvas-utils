var test = require('tape');
var cutils = require('..');
var convertEventCoords = cutils.convertEventCoords;


global.document = {};
global.document.body = {};
global.document.body.scrollLeft = 0;
global.document.body.scrollTop = 0;


global.window = {};
global.window.getComputedStyle = function() {
  return {
    height: 400,
    width: 200
  };
};

test('convertEventCoords', function(t) {
  t.plan(2);
  var coords = convertEventCoords({
    pageX: 500,
    pageY: 500
  }, {
    width: 400,
    height: 200,
    getBoundingClientRect: function() {
      return {
        left: 200,
        top: 300
      };
    }
  });


  t.equal(coords.x, 600);
  t.equal(coords.y, 100);
});
