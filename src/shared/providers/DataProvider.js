import {getCitiesByName, getCityByCoords, getWeather} from "../api";
import Parser from '../tools/Parser';

export class DataProvider {
    static async getCitiesData(name) {
        const data = await getCitiesByName(name)

        // remove cities with no population
        function filterDeadCities(data) {
            const results = data.results
            return results !== undefined ? results.filter(el => el.population) : null
        }

        return filterDeadCities(data)
    }

    static async getCityName(coords) {
        const data = await getCityByCoords(coords)

        const dataArr = data.postalCodes;
        let closest = []
        dataArr.reduce((prev, cur) => {
            const diff = coords[0] - cur.lat
            if (diff < prev) {
                closest = cur
                return diff
            }
            return prev
        }, 1)
        console.log(closest)
        return [closest.placeName.match(/\W/g).join("").trim(), closest.adminName1];
    }

    static async getWeather(cityData) {
        return await getWeather(Parser.parseCoords(cityData), Parser.parseTimezone(cityData))
    }
}