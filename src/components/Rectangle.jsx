import React, { useEffect, useRef, useState } from "react";
import { Rect, Circle } from "react-konva";

const Rectangle = ({ width, height, x, y, ...props }) => {
    const rect = useRef();
    const [edit, setEdit] = useState(true);
    const [cords, setCords] = useState({
        topLeft: { x: x, y: y },
        topRight: { x: x + width, y: y },
        bottomLeft: { x: x, y: y + height },
        bottomRight: { x: x + width, y: y + height },
    });

    const updateSize = (e) => {
        const {target } = e;
        const id = target.attrs.id;
        const posRect = target.getClientRect()

        if (id === "1") {
            setCords(pos => ({
                topLeft: { x: posRect.x, y: posRect.y },
                topRight: { x: pos.topRight.x, y: posRect.y },
                bottomLeft: { x: posRect.x, y: pos.bottomLeft.y },
                bottomRight: { x: pos.bottomRight.x, y: pos.bottomRight.y},
            }));
        } else if (id === "2") {
            setCords(pos => ({
                topLeft: { x: pos.topLeft.x, y: posRect.y },
                topRight: { x: posRect.x, y: posRect.y },
                bottomLeft: { x: pos.bottomLeft.x, y: pos.bottomLeft.y },
                bottomRight: { x: posRect.x, y: pos.bottomRight.y },
            }));
        } else if (id === "3") {
            setCords(pos => ({
                topLeft: { x: posRect.x, y: pos.topLeft.y },
                topRight: { x: pos.topRight.x, y: pos.topRight.y },
                bottomLeft: { x: posRect.x, y: posRect.y },
                bottomRight: { x: pos.bottomRight.x, y: posRect.y },
            }));
        } else if (id === "4") {
            setCords(pos => ({
                topLeft: {x: pos.topLeft.x, y: pos.topLeft.y},
                topRight: { x: posRect.x, y: pos.topRight.y },
                bottomLeft: { x: pos.bottomLeft.x, y: posRect.y },
                bottomRight: { x: posRect.x, y: posRect.y },
            }));
        }
    };

    const updateRect = (e) => {
        const target = e.currentTarget.getClientRect();
        
        setCords(pos => ({
            topLeft: { x: target.x, y: target.y },
            topRight: { x: target.x + target.width, y: target.y },
            bottomLeft: { x: target.x, y: target.y + target.height },
            bottomRight: {
                x: target.x + target.width,
                y: target.y + target.height,
            },
        }));
    };

    const onAnchorMouseEnter = (e) => {
        const target = e.currentTarget;
        target.stroke("red");
    };

    const onAnchorMouseLeave = (e) => {
        const target = e.currentTarget;
        target.stroke("gray");
    };


    return (
        <>
            <Rect
                draggable
                x={cords.topLeft.x}
                y={cords.topLeft.y}
                width={Math.abs(cords.topLeft.x  - cords.topRight.x)}
                height={Math.abs(cords.topLeft.y - cords.bottomLeft.y)}
                {...props}
                ref={rect}
                onDragMove={updateRect}
                onClick={(e) => {
                    const editable = edit === false ? 'settings' : 'rect'
                    rect.current.setAttr('name', editable)
                    setEdit(!edit)
                }}
            />
            {edit && (
                <>
                    <Circle
                        id={"1"}
                        draggable
                        name="settings"
                        x={cords.topLeft.x}
                        y={cords.topLeft.y}
                        radius={8}
                        strokeWidth={2}
                        fill="gray"
                        onMouseEnter={onAnchorMouseEnter}
                        onMouseLeave={onAnchorMouseLeave}
                        onDragMove={(e) => {
                            const posRect = e.currentTarget.getClientRect()
                            setCords(pos => ({
                                topLeft: { x: posRect.x, y: posRect.y },
                                topRight: { x: pos.topRight.x, y: posRect.y },
                                bottomLeft: { x: posRect.x, y: pos.bottomLeft.y },
                                bottomRight: { x: pos.bottomRight.x, y: pos.bottomRight.y},
                            }));
                        }}
                    />
                    <Circle
                        id={"2"}
                        draggable
                        name="settings"
                        x={cords.topRight.x}
                        y={cords.topRight.y}
                        radius={8}
                        strokeWidth={2}
                        fill="gray"
                        stroke={"gray"}
                        onMouseEnter={onAnchorMouseEnter}
                        onMouseLeave={onAnchorMouseLeave}
                        onDragMove={(e) => {
                            const posRect = e.currentTarget.getClientRect()
                            console.log(posRect)
                            setCords(pos => ({
                                topLeft: { x: pos.topLeft.x, y: posRect.y },
                                topRight: { x: posRect.x, y: posRect.y },
                                bottomLeft: { x: pos.bottomLeft.x, y: pos.bottomLeft.y },
                                bottomRight: { x: posRect.x, y: pos.bottomRight.y },
                            }));
                        }}
                    />
                    <Circle
                        id={"3"}
                        draggable
                        name="settings"
                        x={cords.bottomLeft.x}
                        y={cords.bottomLeft.y}
                        radius={8}
                        strokeWidth={2}
                        fill="gray"
                        onMouseEnter={onAnchorMouseEnter}
                        onMouseLeave={onAnchorMouseLeave}
                        onDragMove={(e) => {
                            const posRect = e.currentTarget.getClientRect()
                            setCords(pos => ({
                                topLeft: { x: posRect.x, y: pos.topLeft.y },
                                topRight: { x: pos.topRight.x, y: pos.topRight.y },
                                bottomLeft: { x: posRect.x, y: posRect.y },
                                bottomRight: { x: pos.bottomRight.x, y: posRect.y },
                            }));
                        }}
                    />
                    <Circle
                        id={"4"}
                        draggable
                        name="settings"
                        x={cords.bottomRight.x}
                        y={cords.bottomRight.y}
                        radius={8}
                        strokeWidth={2}
                        fill="gray"
                        onMouseEnter={onAnchorMouseEnter}
                        onMouseLeave={onAnchorMouseLeave}
                        onDragMove={(e) => {
                            const posRect = e.currentTarget.getClientRect()
                            setCords(pos => ({
                                topLeft: {x: pos.topLeft.x, y: pos.topLeft.y},
                                topRight: { x: posRect.x, y: pos.topRight.y },
                                bottomLeft: { x: pos.bottomLeft.x, y: posRect.y },
                                bottomRight: { x: posRect.x, y: posRect.y },
                            }));
                        }}
                    />
                </>
            )}
        </>
    );
};

export default Rectangle;
