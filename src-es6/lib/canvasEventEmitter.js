import EventEmitter from 'jvent'
import { convertEventCoords } from './canvas-utils.js'

/**
 * @constructor
 * @param {Element} target - the canvas that should emit the events
 * @param {Element} eventSource - defaults to window.document
 */
const createCanvasEventEmitter = function createCanvasEventEmitter(target, eventSource = window.document) {
  let isIn = false
  const emitter = new EventEmitter()
        /**
         * Get the coordinates of an event relative to
         * the target element
         * @param {MouseEvent} event - DOM event
         * @return {Object} the converted coordinate as object {x,y}
         */
      , getCoords = event => convertEventCoords(event, target)

        /**
         * Calculate if the coordinates (as given by getCoords)
         * are on the canvas
         * @param {Object} xy - object with the x and y coordinates
         * @return {Boolean} true if on canvas else false
         */
      , areCoordsOnCanvas = function areCoordsOnCanvas(xy) {
          const { x, y } = xy
              , { width, height } = target

          if (x < 0 || y < 0) {
            return false
          }

          if (x > width || y > height) {
            return false
          }

          return true
        }

        /**
         * Wraps the DOM event into a CanvasEventEmitter event and emits it.
         * @param {Event} event - the DOM event
         * @param {Object} xy - the coordinate to emit
         * @param {string} type - optional defaults to event.type
         *
         * @return {undefined}
         */
      , emitCanvasEventRaw = function emitCanvasEventRaw(event, xy, type = event.type) {

          const { x, y } = xy

          emitter.emit(type, { x
                             , y
                             , target
                             , event
                             , button: event.button
                             , preventDefault: () => event.preventDefault()
                             })
        }


        /**
         * Emits the given DOM Event if the coordinates are on the canvas
         * @param {Event} event - the DOM event
         * @param {string} overrideType - optional defaults to event.type
         * @return {undefined}
         */
      , emitCanvasEventIfOnCanvas = function emitCanvasEventIfOnCanvas(event, overrideType) {
          const xy = getCoords(event)

          if (!areCoordsOnCanvas(xy)) {
            return
          }

          emitCanvasEventRaw(event, xy, overrideType)
        }

        /**
         * Attaches the DOM listeners
         * Should only be called once
         * @return {undefined}
         */
      , initListeners = function initListeners() {
          //add the basic listeners to the dom
          ['mousedown', 'mouseup'].forEach( eventType => {
            eventSource.addEventListener(eventType, emitCanvasEventIfOnCanvas)
          })


          //Add listener for mousemove
          //We calculate mouseover and mouseout from this
          eventSource.addEventListener('mousemove', event => {

            const xy = getCoords(event)
                , onCanvas = areCoordsOnCanvas(xy)

            if (onCanvas) {
              //Emit the standard mousemove event
              emitCanvasEventRaw(event, xy)
            }


            //Emit mouseover and mouseout
            if (onCanvas && !isIn) {
              isIn = true
              emitCanvasEventRaw(event, xy, 'mouseover')
              emitCanvasEventRaw(event, xy, 'mousein')
            }

            if (!onCanvas && isIn) {
              isIn = false
              emitCanvasEventRaw(event, xy, 'mouseout')
              emitCanvasEventRaw(event, xy, 'mouseleave')
            }

          })

          //Listener for contextmenu. also trigers the click event
          eventSource.addEventListener('contextmenu', event => {
            emitCanvasEventIfOnCanvas(event)
            emitCanvasEventIfOnCanvas(event, 'rightclick')
            emitCanvasEventIfOnCanvas(event, 'click')
          })
          
          eventSource.addEventListener('click', event => {
            emitCanvasEventIfOnCanvas(event)
            if(event.button == 0) {
              emitCanvasEventIfOnCanvas(event, 'leftclick')
            }
          })
        }

  initListeners()
  return emitter
}

export default createCanvasEventEmitter
