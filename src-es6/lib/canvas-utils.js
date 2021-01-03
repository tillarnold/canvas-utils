/**
 * @param {MouseEvent} e - DOM event
 * @param {HTMLCanvasElement} canvas - HTML canvas element
 *
 * @return {Object} the converted coordinate as object {x,y}
 */
export function convertEventCoords(e, canvas) {
  let rect = canvas.getBoundingClientRect()
    , x = e.pageX - rect.left - document.body.scrollLeft - document.documentElement.scrollLeft
    , y = e.pageY - rect.top - document.body.scrollTop - document.documentElement.scrollTop
    , computed = window.getComputedStyle(canvas)
  x *= canvas.width / parseInt(computed.width, 10)
  y *= canvas.height / parseInt(computed.height, 10)
  return { x, y }
}


/**
 * @param {CanvasRenderingContext2D} ctx - The context that should be rotated
 * @param {Number} x - coordinate
 * @param {Number} y - coordinate
 * @param {Number} r - Rotation in radians
 *
 * @return {CanvasRenderingContext2D} return the context passed in (for chaining)
 */
export function rotateContextAt(ctx, x, y, r) {
  ctx.translate(x, y)
  ctx.rotate(r)
  ctx.translate(-1 * x, -1 * y)
  return ctx
}


export function createCanvas(width, height) {
  const canvas = document.createElement('canvas')

  canvas.width = width
  canvas.height = height

  return canvas
}


export function canvasToImage(canvas) {
  const image = new Image()

  image.src = canvas.toDataURL('image/png')
  return image
}


export function cloneImageData(imageData) {
  const data = new Uint8ClampedArray(imageData.data)
  return new ImageData(data, imageData.width, imageData.height)
}


/**
 * Convert radians to degrees
 *
 * @param {Number} r - Angle in radians
 *
 * @return {Number} Angle in degree
 */
export const radiansToDegrees = r => r * 180 / Math.PI


/**
 * Convert degrees to radians
 *
 * @param {Number} d - Angle in degrees
 *
 * @return {Number} Angle in radian
 */
export const degreesToRadians = d => d * Math.PI / 180
