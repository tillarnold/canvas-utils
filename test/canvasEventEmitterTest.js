var test = require('tape');
var cutils = require('..');
var CanvasEventEmitter = cutils.CanvasEventEmitter;
var EventEmitter = require('events').EventEmitter;



test('CanvasEventEmitter constructor', function(t) {
  t.plan(3);
  var canvas = {
    width: 400,
    height: 200,
    getBoundingClientRect: function() {
      return {
        left: 200,
        top: 300
      };
    }
  };

  var ee = new EventEmitter();
  var source = {};

  source.addEventListener = function(e, f) {
    ee.on(e, f);
  };

  var cee = new CanvasEventEmitter(canvas, source);
  t.equals(cee._target, canvas);

  cee.on('click', function(e) {
    e.preventDefault();
    t.equals(e.button, 55);
  });

  ee.emit('click', {
    preventDefault: function() {
      t.pass("preventDefault  called");
    },
    button: 55,
    pageX: 300,
    pageY: 500,
    type: 'click'
  });
});
