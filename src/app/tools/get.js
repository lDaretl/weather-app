import { parseCoordsFromCurrentPosition} from "./parse";
import { getWeather } from "../getWeather";
import { displayShow } from "./display";
import { fetchCityData, fetchCityNameByCoords } from "./fetchData";
//const cityName = document.getElementById('cityName')

//export const citiesData = []

export function getWeatherAuto() {
    navigator.geolocation.getCurrentPosition(async position => {
        const coords = parseCoordsFromCurrentPosition(position)
        const nameCity = await fetchCityNameByCoords(coords);
        getWeather(coords, nameCity)
        cityInput.value = nameCity[0]
    }, err => console.error('Сan\'t get weather automaticly!\n', err))
}

export async function getlistOfCities() {
    cityList.innerHTML = ''
    try {
        const city = cityInput.value
        if (city !== '') {
            const data = await fetchCityData(city.trim());
            //console.log(data ? data.filter(el => el !== undefined) : undefined)
            displayShow(cityList)
            return data ? data.filter(el => el !== undefined) : undefined
        } else {
            return undefined
        }
    } catch (err) {}
    
}