var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var convertEventCoords = require('./canvas-utils.js').convertEventCoords;

/**
 * @constructor
 * @param {Element} target the canvas that should emit the events
 * @param {Element} eventSource defaults to window.document
 */
var CanvasEventEmitter = function CanvasEventEmitter(target, eventSource) {
  var that = this;
  this._target = target;
  eventSource = eventSource || window.document;
  ['click', 'mousedown', 'mouseup', 'mousemove'].forEach(function(elem) {
    eventSource.addEventListener(elem, function(e) {
      that._emitCanvasEvent(e);
    });
  });

  eventSource.addEventListener('contextmenu', function(e) {
    that._emitCanvasEvent(e);
    that._emitCanvasEvent(e, 'click');
  });

};

inherits(CanvasEventEmitter, EventEmitter);
/**
 * Emits the given DOM Event if the coordinates are on the canvas
 * @param {Event}
 */
CanvasEventEmitter.prototype._emitCanvasEvent = function(e, overrideType) {
  var xy = convertEventCoords(e, this._target);

  if (xy.x < 0 || xy.y < 0) {
    return;
  }

  if (xy.x > this._target.width || xy.y > this._target.height) {
    return;
  }

  this.emit(overrideType || e.type, {
    x: xy.x,
    y: xy.y,
    target: this._target,
    event: e,
    button: e.button,
    preventDefault: function() {
      e.preventDefault();
    }
  });
};

module.exports = CanvasEventEmitter;
