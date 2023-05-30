// getting full city name
export function parseFullCityName(data) {
    return [data.name, (data.name === data.admin1) ? '' : data.admin1, data.country]
}

// getting coordinates from current position
export function parseCoordsFromCurrentPosition(data) {
    return [data.coords.latitude, data.coords.longitude]
}

// getting coordinates from json data
export function parseCoordsFromData(data) {
    return [data.latitude, data.longitude]
}