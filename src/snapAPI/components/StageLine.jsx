import React from "react";
import {Line} from 'react-konva'
import { BOUNDS_LINE_STYLE } from '..'

const SageLine = ({ stageLines }) => {
    return (
        <>
            {stageLines["horizontal"].map((h, i) => (
                <Line
                    key={i}
                    x={h}
                    y={0}
                    points={[0, -6000, 0, 6000]}
                    {...BOUNDS_LINE_STYLE}
                />
            ))}
            {stageLines["vertical"].map((h, i) => (
                <Line
                    key={i}
                    x={0}
                    y={h}
                    points={[-6000, 0, 6000, 0]}
                    {...BOUNDS_LINE_STYLE}
                />
            ))}
        </>
    );
};

export default SageLine;
