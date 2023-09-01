export const mouseLeavePin = (state, handler) => {
    state
        ? pinImg.addEventListener('pointerleave', event => handler(event))
        : pinImg.removeEventListener('pointerleave', event => handler(event))
}