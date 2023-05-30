// getting data about city by city name
export async function fetchCityData(city) {
    async function fetchCityData (city) {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=ru&format=json`)
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
export async function fetchCityNameByCoords(coords) {
    const response = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${coords[0]}&lng=${coords[1]}&username=Daret`)
    const dataArr = await response.json();
    const closestMatch = dataArr.postalCodes[0]
    return [closestMatch.placeName, closestMatch.adminName1]
}

