const mouseEnterPin = (state, handler, element) => {
    state
        ? element.addEventListener('pointerenter', event => handler(event))
        : element.removeEventListener('pointerenter', event => handler(event))
}

export default mouseEnterPin;