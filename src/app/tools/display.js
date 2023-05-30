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
export function displayShowSearch() {
    displayShow(cityBlock);
    displayHide(cityName);
    cityInput.focus()
}

// show search & list of cities
export function displayShowFullSearch() {
    displayShowSearch()
    displayShow(cityList)
}

// hide search
export function displayHideSearch() {
    cityInput.focus()
    displayHide(cityBlock);
    displayShow(cityName);
}

// hide search & list of cities
export function displayHideFullSearch() {
    displayHideSearch()
    displayHide(cityList)
}

// create list of cities
export function displayCityList(arrData) {
    if(arrData) {
        return arrData.map((value, index) => {
            if (value !== undefined) {
                const city = parseFullCityName(value);
                cityList.insertAdjacentHTML("beforeend", `<div class="list__item" id="itemCity${index}">${city[0]}, ${city[1] ? city[1] + ', ' : ''}${city[2]}</div>`)
            }
        })
    }
}