var general = require('./lib/canvas-utils.js');
var CanvasEventEmitter = require('./lib/canvasEventEmitter.js');



module.exports.CanvasEventEmitter = CanvasEventEmitter;

module.exports.convertEventCoords = general.convertEventCoords;
module.exports.rotateContextAt = general.rotateContextAt;

module.exports.radiansToDegrees = general.radiansToDegrees;
module.exports.degreesToRadians = general.degreesToRadians;
