export function clickList(state, handler) {
    state
        ? cityList.addEventListener('click', handler)
        : cityList.removeEventListener('click', handler)

}