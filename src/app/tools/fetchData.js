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
    //TODO
    // сделать приоритетную сортировку (если имя города есть в имени области)
    const closestMatch = dataArr.postalCodes[0];
    return [closestMatch.placeName, closestMatch.adminName1];
}

// export async function fetchWeatherData(coords) {
//     const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,weathercode,pressure_msl,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_hours,precipitation_probability_max,windspeed_10m_max&current_weather=true&windspeed_unit=ms&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`)
//     return await response.json()
// }

