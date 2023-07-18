const currentCityEl = () => {
    console.log(!cityInput.classList.contains('hide'))
    if (!cityInput.classList.contains('hide')) {
        return cityInput
    } else {
        return cityName
    }
}

export default currentCityEl;