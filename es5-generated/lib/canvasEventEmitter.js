"use strict";

var _require = require("events");

var EventEmitter = _require.EventEmitter;

var _require2 = require("./canvas-utils.js");

var convertEventCoords = _require2.convertEventCoords;

/**
 * @constructor
 * @param {Element} target - the canvas that should emit the events
 * @param {Element} eventSource - defaults to window.document
 */
module.exports = function createCanvasEventEmitter(target) {
  var eventSource = arguments[1] === undefined ? window.document : arguments[1];

  var emitter = new EventEmitter();
  var isIn = false,

  /**
   * Get the coordinates of an event relative to
   * the target element
   */
  getCoords = function getCoords(event) {
    return convertEventCoords(event, target);
  },

  /**
   * Calculate if the coordinates (as given by getCoords)
   * are on the canvas
   */
  areCoordsOnCanvas = function areCoordsOnCanvas(xy) {
    var x = xy.x;
    var y = xy.y;
    var width = target.width;
    var height = target.height;

    if (x < 0 || y < 0) {
      return false;
    }

    if (x > width || y > height) {
      return false;
    }

    return true;
  },

  /**
   * Wraps the DOM event into a CanvasEventEmitter event and emits it.
   * @param {Event} event - the DOM event
   * @param {Object} xy - the coordinate to emit
   * @param {string} overrideType - optional defaults to event.type
   */
  emitCanvasEventRaw = function emitCanvasEventRaw(event, xy) {
    var type = arguments[2] === undefined ? event.type : arguments[2];
    return (function () {
      var x = xy.x;
      var y = xy.y;

      emitter.emit(type, { x: x,
        y: y,
        target: target,
        event: event,
        button: event.button,
        preventDefault: function () {
          return event.preventDefault();
        }
      });
    })();
  },

  /**
   * Emits the given DOM Event if the coordinates are on the canvas
   * @param {Event} event
   */
  emitCanvasEventIfOnCanvas = function emitCanvasEventIfOnCanvas(event, overrideType) {
    var xy = getCoords(event);

    if (!areCoordsOnCanvas(xy)) {
      return;
    }

    emitCanvasEventRaw(event, xy, overrideType);
  },

  /**
   * Attaches the DOM listeners
   * Should only be called once
   */
  initListeners = function initListeners() {
    //add the basic listeners to the dom
    ["click", "mousedown", "mouseup"].forEach(function (eventType) {
      eventSource.addEventListener(eventType, emitCanvasEventIfOnCanvas);
    });

    //Add listener for mousemove
    //We calculate mouseover and mouseout from this
    eventSource.addEventListener("mousemove", function (event) {

      var xy = getCoords(event),
          onCanvas = areCoordsOnCanvas(xy);

      if (onCanvas) {
        //Emit the standard mousemove event
        emitCanvasEventRaw(event, xy);
      }

      //Emit mouseover and mouseout
      if (onCanvas && !isIn) {
        isIn = true;
        emitCanvasEventRaw(event, xy, "mouseover");
      }

      if (!onCanvas && isIn) {
        isIn = false;
        emitCanvasEventRaw(event, xy, "mouseout");
      }
    });

    //Listener for contextmenu. also trigers the click event
    eventSource.addEventListener("contextmenu", function (event) {
      emitCanvasEventIfOnCanvas(event);
      emitCanvasEventIfOnCanvas(event, "click");
    });
  };

  initListeners();
  return emitter;
};