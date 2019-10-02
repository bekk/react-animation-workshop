export const getPosition = element => {
    const position = {
        x: element.offsetLeft,
        y: element.offsetTop
    };

    let parent = element.offsetParent;
    while (parent) {
        position.y += parent.offsetTop;
        position.x += parent.offsetLeft;
        parent = parent.offsetParent;
    }

    return position;
};

export const intersects = (event, element, offset = 5) => {
    const elementPosition = getPosition(element);
    return event.clientX >= elementPosition.x - offset
        && event.clientY >= elementPosition.y - offset
        && event.clientX <= elementPosition.x + element.offsetWidth + offset
        && event.clientY <= elementPosition.y + element.offsetHeight + offset;
};