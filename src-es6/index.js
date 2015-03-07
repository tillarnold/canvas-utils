let createCanvasEventEmitter = require('./lib/canvasEventEmitter.js')
  , { radiansToDegrees
    , degreesToRadians
    , rotateContextAt
    , convertEventCoords
    } = require('./lib/canvas-utils.js');

module.exports = { createCanvasEventEmitter
                 , radiansToDegrees
                 , degreesToRadians
                 , rotateContextAt
                 , convertEventCoords
                 };
