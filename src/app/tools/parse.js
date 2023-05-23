export function parseFullCityName(data) {
    return [data.name, (data.name === data.admin1) ? '' : data.admin1, data.country]
}