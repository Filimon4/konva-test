function haveIntersection(r1, r2) {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
    );
}
export const setCollition = (e, layer) => {
    const target = e.target;
    const targetRect = e.target.getClientRect();
    target.opacity(1)
    target.zIndex(4)
    layer.current.children.forEach(element => {
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
        if (element !== target) {
            if (haveIntersection(targetRect, element.getClientRect())) {
                element.opacity(0.2)
            } else {
                element.opacity(1)
            }
        }
    });
}