let test = require('tape'),
    cutils = require('..'),
    { createCanvasEventEmitter } = cutils,
    { EventEmitter } = require('events');



test('CanvasEventEmitter constructor', (t) => {
  t.plan(2);
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

  source.addEventListener = (e, f) => {
    ee.on(e, f);
  };

  var cee = createCanvasEventEmitter(canvas, source);

  cee.on('click', (e) => {
    e.preventDefault();
    t.equals(e.button, 55);
  });

  ee.emit('click', {
    preventDefault: () => {
      t.pass("preventDefault  called");
    },
    button: 55,
    pageX: 300,
    pageY: 500,
    type: 'click'
  });
});
