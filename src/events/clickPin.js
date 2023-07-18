const pinImg = document.getElementById('pinImg')

// animate & getting weather automaticly by pressing geolocation pin
const clickPin = (state, handler) => {
    state
        ? pinImg.addEventListener('click', handler)
        : pinImg.removeEventListener('click', handler)
}

export default clickPin;
