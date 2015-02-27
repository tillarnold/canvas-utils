"use strict";

var test = require("tape");
var cutils = require("..");
var createCanvasEventEmitter = cutils.createCanvasEventEmitter;
var _require = require("events");

var EventEmitter = _require.EventEmitter;

test("CanvasEventEmitter constructor", function (t) {
  t.plan(2);
  var canvas = {
    width: 400,
    height: 200,
    getBoundingClientRect: function getBoundingClientRect() {
      return {
        left: 200,
        top: 300
      };
    }
  };

  var ee = new EventEmitter();
  var source = {};

  source.addEventListener = function (e, f) {
    ee.on(e, f);
  };

  var cee = createCanvasEventEmitter(canvas, source);

  cee.on("click", function (e) {
    e.preventDefault();
    t.equals(e.button, 55);
  });

  ee.emit("click", {
    preventDefault: function () {
      t.pass("preventDefault  called");
    },
    button: 55,
    pageX: 300,
    pageY: 500,
    type: "click"
  });
});