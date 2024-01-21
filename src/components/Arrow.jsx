import React, { useState } from "react";
import { Arrow, Circle } from "react-konva";

const ArrowLine = ({firstObject, secondObject}) => {
    const [start, setStart] = useState({x: 100, y: 100})
    const [end, setEnd] = useState({x: 200, y: 100})
    const [startSnapObj, setStartSnapObj] = useState()
    const [endSnapObj, setEndSnapObj] = useState()
    
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
            return snaps[0][0]
        }
        return null
    }

    return (
        <>
            <Arrow 
                points={[
                    startSnapObj ? startSnapObj.getClientRect().x : start.x, 
                    startSnapObj ? startSnapObj.getClientRect().y : start.y, 
                    endSnapObj ? endSnapObj.getClientRect().x : end.x,
                    endSnapObj ? endSnapObj.getClientRect().y : end.y
                ]}
                x={0}
                y={0}
                width={2}
                fill={"black"}
                stroke={"black"}
            />
            <Circle 
                x={startSnapObj ? startSnapObj.getClientRect().x : start.x}
                y={startSnapObj ? startSnapObj.getClientRect().y : start.y}
                radius={8}
                draggable
                snapAt={false}
                name="settings"
                fill="gray"
                onDragMove={(e) => {
                    const rect = e.target.getClientRect()
                    let absPos = e.target.getAbsolutePosition()
                    const layer = e.target.getParent()
                    const snap = findSnap(e.target, layer)
                    if (snap) {
                        const target = snap.getClientRect()
                        absPos = {...absPos, x: target.x+(rect.width/4) , y: target.y + (rect.height/4)}
                        e.target.setAbsolutePosition(absPos)
                        e.target.setAttr("snapAt", true)
                        setStart({x: absPos.x, y: absPos.y})
                        setStartSnapObj(snap)
                    } else {
                        e.target.setAttr("snapAt", false)
                        setStartSnapObj(null)
                    }
                    if (e.target.getAttr("snapAt") === false) {
                        setStart({x: e.target.getAbsolutePosition().x, y: e.target.getAbsolutePosition().y})
                    }
                }}
            />
            <Circle 
                x={endSnapObj ? endSnapObj.getClientRect().x : end.x}
                y={endSnapObj ? endSnapObj.getClientRect().y : end.y}
                radius={8}
                draggable
                snapAt={false}
                name="settings"
                fill="gray"
                onDragMove={(e) => {
                    const rect = e.target.getClientRect()
                    let absPos = e.target.getAbsolutePosition()
                    const layer = e.target.getParent()
                    const snap = findSnap(e.target, layer)
                    if (snap) {
                        const target = snap.getClientRect()
                        absPos = {...absPos, x: target.x+(rect.width/4) , y: target.y + (rect.height/4)}
                        e.target.setAbsolutePosition(absPos)
                        e.target.setAttr("snapAt", true)
                        setEnd({x: absPos.x, y: absPos.y})
                        setEndSnapObj(snap)
                    } else {
                        e.target.setAttr("snapAt", false)
                        setEndSnapObj(null)
                    }
                    if (e.target.getAttr("snapAt") === false) {
                        setEnd({x: e.target.getAbsolutePosition().x, y: e.target.getAbsolutePosition().y})
                    }
                }}
            />
        </>
    );
};

export default ArrowLine;
