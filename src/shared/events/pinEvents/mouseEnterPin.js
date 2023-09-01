export const mouseEnterPin = (state, handler) => {
    state
        ? pinImg.addEventListener('pointerenter', event => handler(event))
        : pinImg.removeEventListener('pointerenter', event => handler(event))
}