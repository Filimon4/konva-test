import React from "react";
import {Line} from 'react-konva'
import { SNAP_LINE_STYLE } from '..'

const SnapClosest = ({snapClosest}) => {
    return (
        <>
            {snapClosest.map(({ bound, orientation }, i) => (
                <Line
                    points={
                        orientation === "H"
                            ? [0, -6000, 0, 6000]
                            : [-6000, 0, 6000, 0]
                    }
                    x={orientation === "H" ? bound : 0}
                    y={orientation === "V" ? bound : 0}
                    {...SNAP_LINE_STYLE}
                />
            ))}
        </>
    );
};

export {SnapClosest};
