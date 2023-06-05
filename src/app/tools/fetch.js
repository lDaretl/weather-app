import { links } from '../resources/api'
import { parseCoords } from "./parse";

// getting data about city by city name
export async function fetchCityData(city) {
    async function fetchCityData(city) {
        const response = await fetch(links.openMeteoCity(city))
        return response.json();
    }

    // remove cities with no population
    function filterDeadCities(data) {
        const results = data.results
        return results !== undefined ? results.filter(el => el.population) : null
    }

    return filterDeadCities(await fetchCityData(city))
}

// getting data about city by city coords
export async function fetchCityName(position) {
    const response = await fetch(links.geoNames(parseCoords(position)))
    const data = await response.json();
    console.log(data)
    const dataArr = data.postalCodes;
    const match = dataArr.filter(item => item.adminName1.includes(item.placeName))
    if (match) {
        const index = dataArr.indexOf(match[0])
        dataArr.unshift(dataArr[index])
            dataArr.splice(index + 1, 1)
    }
    return [dataArr[0].placeName, dataArr[0].adminName1];
}

// getting weather data
export async function fetchWeather(dataRaw) {
    const response = await fetch(links.openMeteoWeather(parseCoords(dataRaw)))
    return await response.json()
}

