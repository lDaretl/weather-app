const mouseLeavePin = (state, handler, element) => {
    state
        ? element.addEventListener('pointerleave', event => handler(event))
        : element.removeEventListener('pointerleave', event => handler(event))
}

export default mouseLeavePin;
