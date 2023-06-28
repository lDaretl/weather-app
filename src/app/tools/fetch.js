import DataServices from '../../API/DataServices'
import { parseCoords, parseTimezone } from "./parse";

// getting data about city by city name
export async function fetchCityData(name) {
    const data = await DataServices.getCitiesDataByName(name)

    // remove cities with no population
    function filterDeadCities(data) {
        const results = data.results
        return results !== undefined ? results.filter(el => el.population) : null
    }

    return filterDeadCities(data)
}

// getting data about city by city coords
export async function fetchCityName(coords) {
    const data = await DataServices.getCitiesDataByCoords(coords)
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
export async function fetchWeather(cityData) {
    return await DataServices.getWeatherData(parseCoords(cityData), parseTimezone(cityData))
}

