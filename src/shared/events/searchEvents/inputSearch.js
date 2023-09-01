export function inputSearch(state, handler) {
    state
        ? cityInput.addEventListener('input', handler)
        : cityInput.removeEventListener('input', handler)        
}