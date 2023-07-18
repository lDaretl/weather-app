// get the weather for the selected city from the list
export default function clickList(state, handler) {
    state
        ? cityList.addEventListener('click', handler)
        : cityList.removeEventListener('click', handler)

}