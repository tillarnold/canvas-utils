"use strict";

var general = require("./lib/canvas-utils.js");
var createCanvasEventEmitter = require("./lib/canvasEventEmitter.js");

module.exports.createCanvasEventEmitter = createCanvasEventEmitter;

module.exports.convertEventCoords = general.convertEventCoords;
module.exports.rotateContextAt = general.rotateContextAt;

module.exports.radiansToDegrees = general.radiansToDegrees;
module.exports.degreesToRadians = general.degreesToRadians;