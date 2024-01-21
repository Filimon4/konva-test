import React, { useRef } from 'react'
import {Circle} from 'react-konva' 

const Cycle = () => {
  const circle = useRef()

  return (
    <>
      <Circle 
        draggable
        x={100}
        y={100}
        radius={50}
        fill='blue'
        strokeEnabled={true}r
        ref={circle}
      />
      
    </>
  )
}

export default Cycle