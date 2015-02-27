# canvas-utils
[![NPM version](https://badge.fury.io/js/canvas-utils.svg)](http://badge.fury.io/js/canvas-utils)
[![Code Climate](https://codeclimate.com/github/tillarnold/canvas-utils/badges/gpa.svg)](https://codeclimate.com/github/tillarnold/canvas-utils)
[![Build Status](https://travis-ci.org/tillarnold/canvas-utils.svg?branch=master)](https://travis-ci.org/tillarnold/canvas-utils)
[![devDependency Status](https://david-dm.org/tillarnold/canvas-utils/dev-status.svg)](https://david-dm.org/tillarnold/canvas-utils#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/tillarnold/canvas-utils/badge.svg?branch=master)](https://coveralls.io/r/tillarnold/canvas-utils?branch=master)


> Utility functions for working with the HTML5 canvas

# functions

```js
var canvasUtils = require('canvas-utils');
```
## canvasUtils.convertEventCoords(e, canvas)

This function returns the coordinates of mouse events relative to a
DOM element. For example a Canvas.

`e` is a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent).

`canvas` is a a DOM element.

returns an Object with a `x` and `y` property representing the
pixel on the canvas that the event was fired on.

```js
canvas.addEventListener('click', function(event) {
  var xy = convertEventCoords(event, canvas);
  canvas.getContext('2d').fillRect(xy.x,xy.y,10,10)
});
```

This is a little verbose. For a nicer way to do this have a look at the [CanvasEventEmitter](#canvaseventemitter)

## canvasUtils.rotateContextAt(ctx, x, y, rotation)
Rotates a context around a point.

`ctx` is a [CanvasRenderingContext2D](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D).
(That's the thing you get when you do `canvas.getContext('2d')`)

`x` is the x-coordinate of the rotation.

`y` is the y-coordinate.

`rotation` is the rotation in radians.

Returns the `ctx` passed in.
## canvasUtils.radiansToDegrees(radians)
Converts `radians`to degrees.

## canvasUtils.degreesToRadians(degrees)
Converts `degrees`to radians.


# CanvasEventEmitter

```js
var createCanvasEventEmitter = require('canvas-utils').createCanvasEventEmitter;
```

## var cee = createCanvasEventEmitter(target, eventSource = window.document);

`target` is the canvas for which events should be emitted.

`eventSource` is the element where the event listeners are attached. It defaults to `window.document`.

[Demo for the CanvasEventEmitter on requirebin](http://requirebin.com/?gist=48c497080c0d4f1dea9a)

## Events

A `CanvasEventEmitter` is a standart node [EventEmitter](nodejs.org/api/events.html#events_class_events_eventemitter).
It emits the following events: `click`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`, `contextmenu`

The event object you get for all of these looks like this:

| Property       | Description |
|----------------|-------------------------------------------------------|
| x              | the x coordinate of the event relative to the canvas |
| y              | the y coordinate of the event relative to the canvas |
| target         | the canvas the event belongs to (The `target` you passed into the constructor |
| event          | the original DOM event emitted on the `eventSource` |
| button         | the button property from the `event` |
| preventDefault | a function that called `preventDefault` on the `event` |


```js
cee.on('click',function(e){
  e.preventDefault();
  ctx.fillRect(e.x-5,e.y-5,10,10);
});
```

## Release History
* 2014-11-02   v0.5.0   Add `radiansToDegrees` and `degreesToRadians`.
* 2014-10-13   v0.4.0   Add `mouseover` and `mouseout` events.
* 2014-10-06   v0.3.2   Fix README typo.
* 2014-10-06   v0.3.1   Fix e.button and e.preventDefault().
* 2014-10-06   v0.3.0   Improve convertEventCoords.
* 2014-09-26   v0.2.0   Add contextmenu event.
* 2014-09-12   v0.1.0   Add CanvasEventEmitter.
* 2014-08-16   v0.0.1   Initial version.
