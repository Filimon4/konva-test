import React, { useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import cubeImg from "./assets/cube.png";
import { rectUtil } from "./utils";
import { SHAPES } from "./snapAPI";
import {
    getClosesLine,
    getShapeEdgesLines,
    getSnapLines,
    getStageLines,
} from "./snapAPI";
import { CLOSESTSNAP, EDGELINE, SNAPLINE, STAGELINE } from './snapAPI'
import StageLine from './snapAPI'
import EdgeLine from './snapAPI'
import SnapLine from './snapAPI'
import SnapClosest from './snapAPI'

const App = () => {
    const [shapes, setShapes] = useState([]);
    const layer = useRef();
    const stage = useRef();
    const shapeDrag = useRef();

    const [edgePos, setEdgePos] = useState({ horizontal: [], vertical: [] });
    const [stageLines, setStageLines] = useState({
        vertical: [],
        horizontal: [],
    });
    const [snapLines, setSnapLines] = useState({
        vertical: [],
        horizontal: [],
    });
    const [snapClosest, setSnapClosest] = useState([{}]);

    const onDragMove = (e) => {
        const { target } = e;
        if (!target) return;

        //find possible snap line
        const allBounds = getStageLines(
            target,
            stage.current.attrs,
            layer.current.children
        );
        setStageLines(allBounds);
        //find snap edges of selected shape
        const shapeEdges = getShapeEdgesLines(target);
        setEdgePos(shapeEdges);
        //find all snap lines
        const snapLines = getSnapLines(allBounds, shapeEdges);
        setSnapLines(snapLines);
        //find closest snap line
        const closestSnap = getClosesLine(snapLines);
        setSnapClosest(closestSnap);

        if (snapLines === 0) {
            setSnapClosest([]);
            return;
        }

        let absPos = target.absolutePosition();
        // Find new position
        if (closestSnap.length > 0) {
            closestSnap.forEach((l) => {
                const position = l.bound + l.offset;
                if (l.orientation === "V") {
                    absPos = { ...absPos, y: position };
                } else if (l.orientation === "H") {
                    absPos = { ...absPos, x: position };
                }
            });
            target.setAbsolutePosition(absPos);
        }
    };

    return (
        <>
            <img alt={"cube"} src={cubeImg} width={50} height={50} />
            <br />
            <div
                onDrop={(e) => {
                    e.preventDefault();
                    stage.current.setPointersPositions(e);
                    setShapes((shape) => [
                        ...shape,
                        rectUtil(stage.current.getPointerPosition(), 100, 100),
                    ]);
                }}
                onDragOver={(e) => e.preventDefault()}
            >
                <Stage
                    width={window.innerWidth - 10}
                    height={window.innerHeight - 80}
                    ref={stage}
                >
                    <Layer
                        ref={layer}
                        onDragMove={onDragMove}
                        onDragEnd={() => {
                            setSnapClosest([]);
                        }}
                    >
                        {SHAPES.map(({ shape: Shape, ...props }) => (
                            <Shape
                                draggable
                                key={props.id}
                                name="shape"
                                {...props}
                                ref={shapeDrag}
                            />
                        ))}
                        {STAGELINE && <StageLine stageLines={stageLines} />}
                        {EDGELINE && <EdgeLine edgePos={edgePos} />}
                        {SNAPLINE && <SnapLine snapLines={snapLines} />}
                        {CLOSESTSNAP && (
                            <SnapClosest snapClosest={snapClosest} />
                        )}
                        {shapes.map((shape) => shape)}
                    </Layer>
                </Stage>
            </div>
        </>
    );
};

export default App;