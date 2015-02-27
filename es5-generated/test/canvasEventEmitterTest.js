"use strict";

var test = require("tape");

var _require = require("..");

var createCanvasEventEmitter = _require.createCanvasEventEmitter;

var _require2 = require("events");

var EventEmitter = _require2.EventEmitter;

test("CanvasEventEmitter constructor", function (t) {
  t.plan(11);

  var ee = new EventEmitter(),
      source = {
    addEventListener: function addEventListener(e, f) {
      ee.on(e, f);
    }
  },
      canvas = { height: 400,
    width: 200,
    getBoundingClientRect: function () {
      return { left: 200,
        top: 300
      };
    }
  },
      cee = createCanvasEventEmitter(canvas, source);

  cee.on("mousedown", function () {
    t.fail("mousedown should not be called. The coordinates are outside");
  });

  ee.emit("mousedown", { pageX: 401,
    pageY: 500,
    type: "mousedown"
  });

  ee.emit("mousedown", { pageX: 199,
    pageY: 400,
    type: "mousedown"
  });

  cee.once("click", function (e) {
    e.preventDefault();
    t.equals(e.button, 55);
  });

  ee.emit("click", { preventDefault: function () {
      return t.pass("preventDefault  called");
    },
    button: 55,
    pageX: 300,
    pageY: 500,
    type: "click"
  });

  cee.on("contextmenu", function () {
    t.pass("contextmenu called");
  });

  cee.on("click", function (e) {
    t.equals(e.event.type, "contextmenu", "click called with contextmenu");
  });

  ee.emit("contextmenu", { pageX: 300,
    pageY: 500,
    type: "contextmenu"
  });

  var moveCounter = 0;
  cee.on("mousemove", function () {
    if (++moveCounter > 4) {
      t.fail("mouse move called more than 4 times");
    }
    t.pass("mousemove called the " + moveCounter + " time");
  });

  var mouseoutCalled = false;
  cee.on("mouseout", function () {
    if (mouseoutCalled) {
      t.fail("mouseout called twice!");
    }

    mouseoutCalled = true;
    t.pass("mouseout called");
  });

  var mouseoverTimes = 0;
  cee.on("mouseover", function () {
    if (++mouseoverTimes > 2) {
      t.fail("mouseover called more than twice!");
    }

    t.pass("mouseover called");
  });

  ee.emit("mousemove", { pageX: 300,
    pageY: 500,
    type: "mousemove"
  });

  ee.emit("mousemove", { pageX: 800,
    pageY: 500,
    type: "mousemove"
  });

  ee.emit("mousemove", { pageX: 300,
    pageY: 550,
    type: "mousemove"
  });

  //move inside canvas
  ee.emit("mousemove", { pageX: 300,
    pageY: 550,
    type: "mousemove"
  });

  ee.emit("mousemove", { pageX: 350,
    pageY: 550,
    type: "mousemove"
  });
});