import React, { useEffect, useRef, useState } from "react";
import { Arrow, Circle } from "react-konva";

const ArrowLine = ({firstObject, secondObject}) => {
    const arrow = useRef()
    const [start, setStart] = useState({x: 0, y: 0})
    const [end, setEnd] = useState({x: 100, y: 100})
    // change to refStart and refEnd
    // the arrow will be rendiring from the refStart to refEnd

    return (
        <>
            <Arrow 
                points={[0, 0, 100, 100]}
                x={0}
                y={0}
                width={2}
                fill={"black"}
                stroke={"black"}
                ref={arrow}
            />
            <Circle 
                x={start.x}
                y={start.y}
                radius={8}
                draggable
                name="settings"
                fill="gray"
                onDragMove={(e) => {
                    const root = e.target
                    let absPos = root.getAbsolutePosition()
                    const target = e.target.getClientRect()
                    const layer = e.target.getParent()
                    const nearest = []
                    layer.children.forEach(child => {
                        if (child.className === 'Rect') {
                            const posChild = child.getClientRect()
                            const a = target.x - posChild.x
                            const b = target.y - posChild.y
                            if (Math.sqrt( a*a + b*b ) < 90) {
                                nearest.push({child: child, dist: Math.sqrt( a*a + b*b ), x: posChild.x, y: posChild.y})
                            }
                        }
                    })
                    const near = nearest.sort((a, b) => a.dist - b.dist)[0]

                    if (near) {
                        absPos = {...absPos, x: near.x, y: near.y}
                        console.log([absPos.x, absPos.y,  ...arrow.current.getPoints().slice(2,4)])
                        arrow.current.setPoints([absPos.x, absPos.y,  ...arrow.current.getPoints().slice(2,4)]) 
                    } else {
                        setStart({x: target.x, y: target.y})
                    }
                }}
            />
            <Circle 
                x={end.x}
                y={end.y}
                radius={8}
                draggable
                name="settings"
                fill="gray"
                onDragMove={(e) => {
                    const target = e.target.getClientRect()
                    setEnd({x: target.x, y: target.y})
                }}
            />
        </>
    );
};

export default ArrowLine;
