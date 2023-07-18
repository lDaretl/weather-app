import DataServices from '../API/DataServices'
import Parser from './Parser';

export default class GetData {
    static async getCityData(name) {
        const data = await DataServices.getCitiesDataByName(name)

        // remove cities with no population
        function filterDeadCities(data) {
            const results = data.results
            return results !== undefined ? results.filter(el => el.population) : null
        }

        return filterDeadCities(data)
    }

    // getting data about city by city coords
    static async getCityName(coords) {
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

    static async getWeather(cityData) {
        return await DataServices.getWeatherData(Parser.parseCoords(cityData), Parser.parseTimezone(cityData))
    }
}



