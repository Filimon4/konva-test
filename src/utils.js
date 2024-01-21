import Rectangle from "./components/Rectangle"

export const SHAPES = [
    {
        id: "1",
        x: 1,
        y: 1,
        height: 100,
        width: 100,
        fill: "pink",
    },
    {
        id: '2',
        x: 170,
        y: 150,
        height: 100,
        width: 100,
        fill: "brown",
    }
];


export const rectUtil = ({x, y}, width, height) => {
    const props = {
        x,
        y,
        width,
        height,
        fill: 'red'
    }
    return (
        <Rectangle
            key={props.id}
            {...props}
        />
    )
}

