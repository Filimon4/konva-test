import React, { useEffect, useRef, useState } from "react";
import { Arrow, Circle } from "react-konva";

const ArrowLine = ({firstObject, secondObject}) => {
    const arrow = useRef()
    const startRef = useRef()
    const endRef = useRef()
    const [start, setStart] = useState({x: 100, y: 100})
    const [end, setEnd] = useState({x: 200, y: 100})
    
    const findSnap = (target, layer) => {
        let snaps = []
        const targetCords = target.getClientRect()
        layer.children.forEach((child, i) => {
            if (child.getAttr('arrowSnap') === true) {
                const cords = child.getClientRect()
                const a = targetCords.x - cords.x
                const b = targetCords.y - cords.y
                const dist = Math.sqrt(a*a + b*b)
                if (dist < 80) {
                    snaps.push([child, dist])
                }
            }
        })
        if (snaps.length > 0) {
            snaps = snaps.sort((a,b) => a[1] - b[1])
            console.log(snaps[0])
            return snaps[0][0]
        }
        return null
    }

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
                ref={startRef}
                onDragMove={(e) => {
                    let absPos = e.target.getAbsolutePosition()
                    const layer = e.target.getParent()
                    const snap = findSnap(e.target, layer)
                    console.log(snap)
                    if (snap) {
                        const target = snap.getClientRect()
                        absPos = {...absPos, x: target.x+(e.target.getClientRect().width/4) , y: target.y + (e.target.getClientRect().height/4)}
                        e.target.setAbsolutePosition(absPos)
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
                ref={endRef}
                onDragMove={(e) => {
                    let absPos = e.target.getAbsolutePosition()
                    const layer = e.target.getParent()
                    const snap = findSnap(e.target, layer)
                    console.log(snap)
                    if (snap) {
                        const target = snap.getClientRect()
                        absPos = {...absPos, x: target.x+(e.target.getClientRect().width/4) , y: target.y + (e.target.getClientRect().height/4)}
                        e.target.setAbsolutePosition(absPos)
                    }
                }}
            />
        </>
    );
};

export default ArrowLine;
