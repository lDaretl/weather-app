// getting full city name
export function parseFullCityName(data) {
    return [data.name, (data.name === data.admin1) ? '' : data.admin1, data.country]
}

// getting coordinates from current position/json data
export function parseCoords(data) {
    if (data.coords) {
        return [data.coords.latitude, data.coords.longitude]
    } else if (data.latitude) {
        return [data.latitude, data.longitude]
    }
}

export function parseTimezone(data) {
    if (data.timezone) {
        return data.timezone
    } else {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    }
}

// getting all full cities names
export function parseListOfCities(arrData) {
    if (arrData) {
        const results = [];
        arrData.map(value => {
            results.push(parseFullCityName(value))
        })
        return results;
    } else {
        return undefined
    }
}