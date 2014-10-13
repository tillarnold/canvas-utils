/**
 * e: DOM event
 * canvas: HTML canvas element
 */
var convertEventCoords = function convertEventCoords(e, canvas) {
  var rect = canvas.getBoundingClientRect();
  var x = e.pageX - rect.left - document.body.scrollLeft;
  var y = e.pageY - rect.top - document.body.scrollTop;

  x *= canvas.width / parseInt(window.getComputedStyle(canvas).width);
  y *= canvas.height / parseInt(window.getComputedStyle(canvas).height);

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


module.exports.convertEventCoords = convertEventCoords;
module.exports.rotateContextAt = rotateContextAt;
