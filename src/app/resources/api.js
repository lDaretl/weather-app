const username = 'Daret';

export const links = {
    openMeteoCity: (city) => `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=ru&format=json`,
    openMeteoWeather: (coords) => `https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,weathercode,pressure_msl,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_hours,precipitation_probability_max,windspeed_10m_max&current_weather=true&windspeed_unit=ms&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
    geoNames : (coords) => `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${coords[0]}&lng=${coords[1]}&username=${username}`
}