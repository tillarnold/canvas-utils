var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
/**
 * e: DOM event
 * canvas: HTML canvas element
 */
var convertEventCoords = function convertEventCoords(e, canvas) {
  var x = Math.round((e.pageX - canvas.offsetLeft) * canvas.width / canvas.offsetWidth);
  var y = Math.round((e.pageY - canvas.offsetTop) * canvas.height / canvas.offsetHeight);
  return {
    x: x,
    y: y
  };
};


/**
 *
 * @param {CanvasRenderingContext2D} ctx - The context that should be rotated
 * @param {Number} x - coordinate
 * @param {Number} y - coordinate
 * @param {Number} r - Rotation in radians
 *
 */
var rotateContextAt = function rotateContextAt(ctx, x, y, r) {
  ctx.translate(x, y);
  ctx.rotate(r);
  ctx.translate(-1 * x, -1 * y);
};


/**
 * @constructor
 * @param {Element} target the canvas that should emit the events
 * @param {Element} eventSource defaults to window.document
 */
var CanvasEventEmitter = function CanvasEventListener(target, eventSource) {
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
    button: event.button,
    preventDefault: function() {
      event.preventDefault();
    }
  });
};


module.exports.CanvasEventEmitter = CanvasEventEmitter;
module.exports.convertEventCoords = convertEventCoords;
module.exports.rotateContextAt = rotateContextAt;
