import { Rect } from "react-konva"

export const SNAP_LINE_STYLE = {
    stroke: "red",
    strokeWidth: 3,
    name: "guid-line",
    dash: [7, 10]
};

export const SHAPE_LINE_STYLE = {
    stroke: "green",
    strokeWidth: 1,
    name: "guid-line",
    dash: [5, 30]
};

export const BOUNDS_LINE_STYLE = {
    stroke: "black",
    strokeWidth: 1,
    name: "guid-line",
    dash: [7, 10]
}

export const GUIDELINE_OFFSET = 8

export const SHAPES = [
    {
        id: "1",
        x: 1,
        y: 1,
        height: 100,
        width: 100,
        fill: "pink",
        shape: Rect
    },
    {
        id: '2',
        x: 170,
        y: 150,
        height: 100,
        width: 100,
        fill: "brown",
        shape: Rect
    }
];
