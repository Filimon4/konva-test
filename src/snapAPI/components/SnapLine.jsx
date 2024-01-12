import React from "react";
import {Line} from 'react-konva'
import { SNAP_LINE_STYLE } from '..'

const SnapLine = ({snapLines}) => {
    return (
        <>
            {snapLines["horizontal"].map(({ bound, delta }, i) => {
                return (
                    <>
                        <Line
                            key={i}
                            x={bound}
                            y={0}
                            points={[0, -6000, 0, 6000]}
                            {...SNAP_LINE_STYLE}
                        />
                    </>
                );
            })}
            {snapLines["vertical"].map(({ bound, delta }, i) => (
                <Line
                    key={i}
                    x={0}
                    y={bound}
                    points={[-6000, 0, 6000, 0]}
                    {...SNAP_LINE_STYLE}
                />
            ))}
        </>
    );
};

export {SnapLine};
