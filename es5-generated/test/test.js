"use strict";

var test = require("tape");

var _require = require("..");

var convertEventCoords = _require.convertEventCoords;
var degreesToRadians = _require.degreesToRadians;
var radiansToDegrees = _require.radiansToDegrees;

//set up global scope
global.document = {
  body: { scrollLeft: 0,
    scrollTop: 0
  }
};

global.window = {
  getComputedStyle: function () {
    return { height: 400,
      width: 200
    };
  }
};

test("convertEventCoords", function (t) {
  t.plan(2);
  var event = { pageX: 500,
    pageY: 500
  },
      element = { width: 400,
    height: 200,
    getBoundingClientRect: function () {
      return { left: 200, top: 300 };
    }
  },
      coords = convertEventCoords(event, element);

  t.equal(coords.x, 600);
  t.equal(coords.y, 100);
});

test("degreesToRadians / radiansToDegrees", function (t) {
  t.plan(4);

  t.equal(degreesToRadians(58), 1.0122909661567112);
  t.equal(degreesToRadians(555), 9.68657734856853);
  t.equal(degreesToRadians(8), 0.13962634015954636);
  t.equal(radiansToDegrees(degreesToRadians(8)), 8);
});

require("./canvasEventEmitterTest.js");