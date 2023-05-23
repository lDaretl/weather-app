import { parseFullCityName } from "./parse";

// getting full city name
export function getCityFromData(data) {
    return parseFullCityName(data)
}

// getting coordinates from json data
export function getCoordsFromCurrentPosition(data) {
    return [data.coords.latitude, data.coords.longitude]
}

// getting coordinates from json data
export function getCoordsFromData(data) {
    return [data.latitude, data.longitude]
}

// getting list of cities
export function getAllCities(data) {
    const res = [];
    class City {
        constructor(arr) {
            const city = parseFullCityName(arr)
            this.name = city[0];
            this.admin1 = city[1];
            this.country = city[2];
        }
    }
    // getting only cities with population
    const keys = Object.keys(data)
    let iterator = 0;
    for (let item in data) {
        if (item !== undefined) {
            res.push(new City(data[keys[iterator]]))
            iterator++;
        }
    }
    return res;
}