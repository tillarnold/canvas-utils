import { createCanvas
       , canvasToImage
       , cloneImageData } from './canvas-utils'


export function fromImage(img) {
  const {width, height} = img
      , canvas = createCanvas(width, height)
      , ctx = canvas.getContext('2d')

  ctx.drawImage(img, 0, 0, width, height)
  
  return fromContext(ctx, width, height)
}



export function fromCanvas(canvas) {
  const ctx = canvas.getContext('2d')
      , {width, height} = canvas
  
  return fromContext(ctx, width, height)
}


export function fromContext(ctx, width, height) {
  return fromImageData(ctx.getImageData(0, 0, width, height))
}


export function fromImageData(imageData) {
  return imageDataHelper(imageData)
}


function imageDataHelper(imageData) {

  const {width, height} = imageData
      , array = imageData.data

  function get(x, y)  {
    const first = (y*width+x)*4
        , r = array[first] 
        , g = array[first+1]
        , b = array[first+2]
    		, a = array[first+3]

    //we want != here (and NOT !==) because undefined == null
    return [r, g, b, a]
  }

  function set(x, y, [r,g,b,a=255]) {
    let first = (y*width+x)*4   

    array[first] = r
    array[first+1] = g
    array[first+2] = b
    array[first+3] = a
  }
  
  function map (fn) {
    forEach( (rgb,i,[x,y]) => 
       set(x,y,fn(rgb,i,[x,y]))
    ) 
  }
  
  function forEach (fn) {
    for(let i = 0; i< array.length; i+=4) {
      const x = (i/4)%width
          , y = Math.floor(i/4/width)
      fn(get(x,y),i,[x,y])
    }
  }
  
  function putImageData(ctx) {
     ctx.putImageData(imageData, 0, 0)
  }
  
  function createNewSameSize() {
   return imageDataHelper(new ImageData(width, height))
  }
  
  function toImage(){
    const canvas = createCanvas(width, height)
        , ctx = canvas.getContext('2d')
        
    putImageData(ctx)
    return canvasToImage(canvas)
   
  }
  
  function clone() {
    const clone = cloneImageData(imageData)
    return imageDataHelper(clone)
  }
  
  
  return Object.freeze({ map
                       , clone 
                       , get
                       , set
                       , putImageData
                       , forEach
                       , createNewSameSize
                       , toImage
                       , getImageData: () => imageData
                       , getWidth: () => width
                       , getHeight: () => height
                       })
  
}
