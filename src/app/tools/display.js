import { parseFullCityName } from "./parse";

// hide element
export function displayHide(idEl) {
    idEl.classList.add('hide')
}

// show element
export function displayShow(idEl) {
    idEl.classList.remove('hide')
}

// show search
export function displaySearchShow() {
    displayShow(cityBlock);
    displayHide(cityName);
    cityInput.focus()
}

// hide search
export function displaySearchHide() {
    cityInput.focus()
    displayHide(cityBlock);
    displayShow(cityName);
}


export function displayCities (arrData) {
    return arrData.map((value, index) => {
        const city = parseFullCityName(value);
        console.log(city)
        cityList.insertAdjacentHTML("beforeend", `<div class="list__item" id="listItem${index}">${city[0]}, ${city[1] ? city[1] + ', ' : ''}${city[2]}</div>`)
    })
}