const test = require('tape')
    , { convertEventCoords
      , degreesToRadians
      , radiansToDegrees
      , fromImage
      , fromCanvas
      , fromContext
      , fromImageData
      } = require('..')


//set up global scope
global.document = {
  body: { scrollLeft: 0
        , scrollTop: 0
        }
}

global.window = {
  getComputedStyle: () => ({ height: 400
                           , width: 200
                           })
}

test('convertEventCoords', t => {
  t.plan(2)
  const event = { pageX: 500
                , pageY: 500
                }
      , element = { width: 400
                  , height: 200
                  , getBoundingClientRect: () => ({left: 200, top: 300})
                  }
      , coords = convertEventCoords(event, element)

  t.equal(coords.x, 600)
  t.equal(coords.y, 100)
})

test('degreesToRadians / radiansToDegrees', t => {
  t.plan(4)

  t.equal(degreesToRadians(58), 1.0122909661567112)
  t.equal(degreesToRadians(555), 9.68657734856853)
  t.equal(degreesToRadians(8), 0.13962634015954636)
  t.equal(radiansToDegrees(degreesToRadians(8)), 8)
})

test('image data functions', t => {
  const WIDTH = 999
      , HEIGHT = 123
      , IMAGE = { width: WIDTH, height: HEIGHT }
      , IMAGEDATA = { width: WIDTH, height: HEIGHT, data: {}}
      , CTX = { drawImage : (img, x, y, w, h) =>  { t.equal(x, 0)
                                                    t.equal(y, 0)
                                                    t.equal(w, WIDTH)
                                                    t.equal(h, HEIGHT)
                                                    t.equal(img, IMAGE)
                                                  }
              , getImageData: (x, y, w, h) => { t.equal(x,0)
                                                t.equal(y,0)
                                                t.equal(w,WIDTH)
                                                t.equal(h,HEIGHT)
                                                return IMAGEDATA
                                              }
              }
     , CANVAS = { getContext: () => CTX } 
  t.plan(16)
  
  global.document.createElement = () => CANVAS
  
  const helper = fromImage(IMAGE)
  t.equals(helper.getWidth(), WIDTH)
  t.equals(helper.getHeight(), HEIGHT)
  t.equals(helper.getImageData(), IMAGEDATA)

  helper.set(7,32,[10,20,30])
  t.deepEqual(helper.get(7,32),[10,20,30,255])

  t.equals(helper.getImageData().data[(32*WIDTH+7)*4], 10 )
  t.equals(helper.getImageData().data[(32*WIDTH+7)*4+1], 20 )
  t.equals(helper.getImageData().data[(32*WIDTH+7)*4+2], 30 )
})

require('./canvasEventEmitterTest.js')
