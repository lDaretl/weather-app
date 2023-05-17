const cityNow = document.querySelector('#cityNow span')

export function parseFullCityName(data) {
    return `${data.results[0].name}, ${(data.results[0].name === data.results[0].admin1) ? '' : data.results[0].admin1 + ', '}${data.results[0].country}`;
}

export function displayHide(idEl) {
    idEl.classList.add('hide')
}

export function displayShow(idEl) {
    idEl.classList.remove('hide')
}

export function searchShow() {
    displayShow(cityInput);
    displayHide(cityNow);
    cityInput.focus()
}

export function searchHide() {
    cityInput.focus()
    displayHide(cityInput);
    displayShow(cityNow);
}