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
import { CLOSESTSNAP, EDGELINE, SNAPLINE, STAGELINE } from "./snapAPI";
import StageLine from "./snapAPI/components/StageLine";
import EdgeLine from "./snapAPI/components/EdgeLine";
import SnapLine from "./snapAPI/components/SnapLine";
import SnapClosest from "./snapAPI/components/SnapClosest";
import { setCollition, checkCollisions } from "./collisionAPI/collision";
import Rectangle from "./components/Rectangle";
import Arrow from './components/Arrow'

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
        if(shapeEdges == null) return;
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
                        onDragMove={(e) => {
                            onDragMove(e);
                            checkCollisions(e, layer);
                        }}
                        onDragEnd={(e) => {
                            setSnapClosest([]);
                            setCollition(e, layer)
                        }}
                    >
                        {SHAPES.map(({...props }) => (
                            <Rectangle
                                key={props.id}
                                {...props}
                                ref={shapeDrag}
                            />
                        ))}
                        <Arrow />
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
