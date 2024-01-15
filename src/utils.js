import Rectangle from "./components/Rectangle"

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

