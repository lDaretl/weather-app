export default function submitSearch(state, handler) {
    state
        ? searchForm.addEventListener('submit', handler)
        : searchForm.removeEventListener('submit', handler)
}
