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

test('degreesToRadians / radiansToDegrees', function(t) {
  t.plan(4);

  t.equal(cutils.degreesToRadians(58), 1.0122909661567112);
  t.equal(cutils.degreesToRadians(555), 9.68657734856853);
  t.equal(cutils.degreesToRadians(8), 0.13962634015954636);
  t.equal(cutils.radiansToDegrees(cutils.degreesToRadians(8)), 8);
});

require('./canvasEventEmitterTest.js');
