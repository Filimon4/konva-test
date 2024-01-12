import React from "react";
import {Line} from 'react-konva'
import { SHAPE_LINE_STYLE } from '..'

const EdgeLine = ({edgePos}) => {
    return (
        <>
            {edgePos["horizontal"].map(({ guide, offset }, i) => (
                <Line
                    key={i}
                    x={guide}
                    y={0}
                    points={[0, -6000, 0, 6000]}
                    {...SHAPE_LINE_STYLE}
                />
            ))}
            {edgePos["vertical"].map(({ guide, offset }, i) => (
                <Line
                    key={i}
                    x={0}
                    y={guide}
                    points={[-6000, 0, 6000, 0]}
                    {...SHAPE_LINE_STYLE}
                />
            ))}
        </>
    );
};

export {EdgeLine};
