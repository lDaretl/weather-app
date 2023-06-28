import { parseCoords } from "./parse";
import { fillWeatherCards } from "./fill";
import { fetchCityData, fetchCityName } from "./fetch";

export async function getWeatherAuto() {
    navigator.geolocation.getCurrentPosition(async position => {
        const coords = parseCoords(position)
        const nameCity = await fetchCityName(coords);
        fillWeatherCards({latitude: coords[0], longitude: coords[1], name: nameCity[0], admin1: nameCity[1]})
        cityInput.value = nameCity[0]
    }, err => console.error('Сan\'t get weather automaticly!\n', err))
}

export async function getListOfCities() {
    const city = cityInput.value
    if (city !== '') {
        const data = await fetchCityData(city.trim());
        console.log(data)
        return data ? data.filter(el => el !== undefined) : undefined
    } else {
        return undefined
    }
}