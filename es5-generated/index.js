"use strict";

var createCanvasEventEmitter = require("./lib/canvasEventEmitter.js");

var _require = require("./lib/canvas-utils.js");

var radiansToDegrees = _require.radiansToDegrees;
var degreesToRadians = _require.degreesToRadians;
var rotateContextAt = _require.rotateContextAt;
var convertEventCoords = _require.convertEventCoords;

module.exports = { createCanvasEventEmitter: createCanvasEventEmitter,
  radiansToDegrees: radiansToDegrees,
  degreesToRadians: degreesToRadians,
  rotateContextAt: rotateContextAt,
  convertEventCoords: convertEventCoords
};