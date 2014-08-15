/**
 * e: DOM event
 * canvas: HTML canvas element
 */
var convertEventCoords = function convertEventCoords(e,canvas) {
  var x = Math.round((e.pageX - canvas.offsetLeft)*canvas.width/canvas.offsetWidth);
  var y = Math.round((e.pageY - canvas.offsetTop)*canvas.height/canvas.offsetHeight);
  return {x:x,y:y};
}

module.exports.convertEventCoords = convertEventCoords;
