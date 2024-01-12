import { Rect } from "react-konva"

export const rectUtil = ({ x, y }, width, height) => {
    return (
        <Rect
            fill='red'
            x={x - width / 2}
            y={y - height / 2}
            width={width}
            height={height}
            draggable
        />
    )
}

