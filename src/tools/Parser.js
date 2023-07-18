export default class Parser {

    // getting full city name
    static parseFullCityName(data) {
        return [data.name, (data.name === data.admin1) ? '' : data.admin1, data.country]
    }

    // getting coordinates from current position/json data
    static parseCoords(data) {
        if (data.coords) {
            return [data.coords.latitude, data.coords.longitude]
        } else if (data.latitude) {
            return [data.latitude, data.longitude]
        }
    }

    static parseTimezone(data) {
        if (data.timezone) {
            return data.timezone
        } else {
            return Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    }

    // getting all full cities names
    static parseListOfCities(arrData) {
        if (arrData) {
            const results = [];
            arrData.map(value => {
                results.push(this.parseFullCityName(value))
            })
            return results;
        } else {
            return undefined
        }
    }

}