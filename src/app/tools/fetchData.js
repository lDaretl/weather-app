// getting data about city by city name
export async function getCityData(city) {
    async function fetchCityData (city) {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=ru&format=json`)
        return response.json();
    }
    
    // delete cities with no population
    function filterDeadCities(data) {
        const results = data.results
        for (let item in results) {
            if (!results[item].population) {
                delete results[item]
            }
        }
        return results;
    }

    return filterDeadCities(await fetchCityData(city))
}

// getting data about city by city coords
export async function getCityNameByCoords(coords) {
    const response = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${coords[0]}&lng=${coords[1]}&username=Daret`)
    const dataArr = await response.json();
    const responsePostalCode = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${dataArr.postalCodes[0].postalCode}&username=Daret`);
    const dataArr2 = await responsePostalCode.json();
    return dataArr2.postalCodes[0].placeName
}

