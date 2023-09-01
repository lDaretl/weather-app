const cityInput = document.querySelector('#cityInput')
const cityName = document.querySelector('#cityName')

const currentCityEl = () => {
    if (!cityInput.classList.contains('hide')) {
        return cityInput
    } else {
        return cityName
    }
}

export default currentCityEl;