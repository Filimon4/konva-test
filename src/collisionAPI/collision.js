function haveIntersection(r1, r2) {
    return !(
        r2.x > r1.x + r1.width-2 ||
        r2.x + r2.width-2 < r1.x ||
        r2.y > r1.y + r1.height-2 ||
        r2.y + r2.height-2 < r1.y
    );
}
export const setCollition = (e, layer) => {
    const target = e.target;
    const targetRect = e.target.getClientRect();
    target.opacity(1)
    target.zIndex(4)
    let children = layer.current.children;
    children = children.filter(child => {
        const name = child.attrs.name;
        return name === 'settings' ? false : true;
    })
    children.forEach(element => {
        if (element !== target) {
            if (haveIntersection(targetRect, element.getClientRect())) {
                element.opacity(0.2)
            } else {
                element.opacity(1)
            }
        }
    });
}

export const checkCollisions = (e, layer) => {
    const target = e.target;
    const targetRect = e.target.getClientRect();
    target.opacity(1)
    target.zIndex(4)
    layer.current.children.forEach(element => {
        const name = element.attrs.name || null;
        if (element !== target && name !== "settings") {
            if (haveIntersection(targetRect, element.getClientRect())) {
                element.opacity(0.2)
            } else {
                element.opacity(1)
            }
        }
    });
}