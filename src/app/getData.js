import { parseFullCityName } from "./tools";

// getting data about city by city name
export async function getCityData(city) {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=ru&format=json`)
    return response.json();
}

// getting data about city by city coords
export async function getCitynameByCoords(coords) {
    const response = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${coords[0]}&lng=${coords[1]}&username=Daret`)
    const dataArr = await response.json();
    const responsePostalCode = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${dataArr.postalCodes[0].postalCode}&username=Daret`);
    const dataArr2 = await responsePostalCode.json();
    return dataArr2.postalCodes[0].placeName
}

// getting short & full city names
export function getCityFromData(data) {
    return [data.results[0].name, parseFullCityName(data)]
}

// getting coordinates from json data
export function getCoordsFromCurrentPosition(data) {
    return [data.coords.latitude, data.coords.longitude]
}

// getting coordinates from json data
export function getCoordsFromData(data) {
    return [data.results[0].latitude, data.results[0].longitude]
}