import { parseCoordsFromCurrentPosition } from "./parse";
import { getWeather } from "../getWeather";
import { fetchCityData, fetchCityNameByCoords } from "./fetchData";

export async function getWeatherAuto() {
    navigator.geolocation.getCurrentPosition(async position => {
        const coords = parseCoordsFromCurrentPosition(position)
        const nameCity = await fetchCityNameByCoords(coords);
        getWeather(coords, nameCity)
        cityInput.value = nameCity[0]
    }, err => console.error('Сan\'t get weather automaticly!\n', err))
}

export async function getListOfCities() {
    const city = cityInput.value
    console.log(city, 'city')
    if (city !== '') {
        const data = await fetchCityData(city.trim());
        console.log(data, '1')
        return data ? data.filter(el => el !== undefined) : undefined
    } else {
        return undefined
    }
}