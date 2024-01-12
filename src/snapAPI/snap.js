import {GUIDELINE_OFFSET} from './utils'

export const getStageLines = (target, {width, height}, objects) => {
    const vertical = [0, height / 2, height]
    const horizontal = [0, width / 2, width]


    objects.forEach(element => {
        const { x, y, width, height } = element.attrs

        if ((x && y) && element !== target) {
            vertical.push([y, y + height / 2, y + height])
            horizontal.push([x, x + width / 2, x + width])
        }
    });
    return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat()
    }
}

export const getShapeEdgesLines = (target) => {
    const shape = target.getClientRect()
    const absPos = target.absolutePosition()

    return {
        horizontal: [
            {
                guide: Math.round(shape.x),
                offset: Math.round(absPos.x - shape.x),
                snap: 'start'
            },
            {
                guide: Math.round(shape.x + shape.width / 2),
                offset: Math.round(absPos.x - shape.x - shape.width / 2),
                snap: 'center'
            },
            {
                guide: Math.round(shape.x + shape.width),
                offset: Math.round(absPos.x - shape.x - shape.width),
                snap: 'end'
            }
        ],
        vertical: [
            {
                guide: Math.round(shape.y),
                offset: Math.round(absPos.y - shape.y),
                snap: "start"
            },
            {
                guide: Math.round(shape.y + shape.height / 2),
                offset: Math.round(absPos.y - shape.y - shape.height / 2),
                snap: "center"
            },
            {
                guide: Math.round(shape.y + shape.height),
                offset: Math.round(absPos.y - shape.y - shape.height),
                snap: "end"
            }
        ]
    }
}

export const getSnapLines = (allBounds, shapeEdges) => {
    const getAvailableSnap = (dir) => {
        const result = [];
        allBounds[dir].forEach(bound => {
            shapeEdges[dir].forEach(edge => {
                const { snap, guide, offset } = edge
                const delta = Math.abs(bound - guide)

                if (delta < GUIDELINE_OFFSET) {
                    result.push({
                        bound,
                        delta,
                        snap,
                        offset,
                    })
                }
            })
        })
        return result;
    }

    const getSnapLine = ({ bound, offset, snap }, orientation) => {
        return { bound, offset, snap, orientation }
    }

    const lineV = getAvailableSnap('vertical')
    const lineH = getAvailableSnap('horizontal')

    const closetsLines = []

    const [minV] = lineV.sort((a, b) => a.delta - b.delta);
    const [minH] = lineH.sort((a, b) => a.delta - b.delta);

    if (minV) closetsLines.push(getSnapLine(minV, "V"))
    if (minH) closetsLines.push(getSnapLine(minH), "H")

    return {
        'horizontal': lineH,
        'vertical': lineV
    }
}

export const getClosesLine = (snapLines) => {

    const getSnapLine = ({ bound, offset, snap }, orientation) => {
        return { bound, offset, snap, orientation }
    }
    const closetsLines = []

    const lineV = snapLines['vertical']
    const lineH = snapLines['horizontal']

    const [minV] = lineV.sort((a, b) => a.delta - b.delta);
    const [minH] = lineH.sort((a, b) => a.delta - b.delta);

    if (minV) closetsLines.push(getSnapLine(minV, "V"))
    if (minH) closetsLines.push(getSnapLine(minH, "H"))

    return closetsLines;
}