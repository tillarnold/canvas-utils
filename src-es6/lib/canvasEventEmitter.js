import { EventEmitter } from 'events'
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
         */
      , getCoords = event => convertEventCoords(event, target)

        /**
         * Calculate if the coordinates (as given by getCoords)
         * are on the canvas
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
         * @param {string} overrideType - optional defaults to event.type
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
         * @param {Event} event
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
         */
      , initListeners = function initListeners() {
          //add the basic listeners to the dom
          ['click', 'mousedown', 'mouseup'].forEach( eventType => {
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
            }

            if (!onCanvas && isIn) {
              isIn = false
              emitCanvasEventRaw(event, xy, 'mouseout')
            }

          })

          //Listener for contextmenu. also trigers the click event
          eventSource.addEventListener('contextmenu', event => {
            emitCanvasEventIfOnCanvas(event)
            emitCanvasEventIfOnCanvas(event, 'click')
          })
        }

  initListeners()
  return emitter
}

export default createCanvasEventEmitter
