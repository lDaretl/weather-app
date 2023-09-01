export function clickDocument(state, handler) {
    state
        ? document.addEventListener('click', handler)
        : document.removeEventListener('click', handler)
}