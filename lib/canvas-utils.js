var EventEmitter = require('events').EventEmitter;
var util = require('util');
/**
 * e: DOM event
 * canvas: HTML canvas element
 */
var convertEventCoords = function convertEventCoords(e,canvas) {
  var x = Math.round((e.pageX - canvas.offsetLeft)*canvas.width/canvas.offsetWidth);
  var y = Math.round((e.pageY - canvas.offsetTop)*canvas.height/canvas.offsetHeight);
  return {x:x,y:y};
};


/**
 * @constructor
 * @param {Element} target the canvas that should emit the events
 * @param {Element} eventSource defaults to window.document
 */
var CanvasEventEmitter = function CanvasEventListener(target,eventSource) {
  var that = this;
  this._target = target;
  eventSource = eventSource || window.document;
  ['click','mousedown','mouseup','mousemove'].forEach(function(elem){
    eventSource.addEventListener(elem,function(e){
      that._emitCanvasEvent(e);
    });
  });
};
 
util.inherits(CanvasEventEmitter, EventEmitter);
/**
 * Emits the given DOM Event if the coordinates are on the canvas
 * @param {Event} 
 */ 
CanvasEventEmitter.prototype._emitCanvasEvent = function(e) {
  var xy = convertEventCoords(e,this._target);

  if (xy.x < 0 || xy.y < 0) {
    return; 
  }

  if(xy.x > this._target.width || xy.y > this._target.height) {
    return;
  }

  this.emit(e.type,{
    x:xy.x,
    y:xy.y,
    target: this._target,
      event:e
  });
};


module.exports.CanvasEventEmitter = CanvasEventEmitter;
module.exports.convertEventCoords = convertEventCoords;
