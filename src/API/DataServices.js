export default class DataServices {
    static #username = "Daret";

    static async getCitiesDataByName(name) {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=ru&format=json`)
        const data = await response.json();
        return data;
    }

    static async getCitiesDataByCoords(coords) {
        const response = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${coords[0]}&lng=${coords[1]}&username=${this.#username}`)
        const data = await response.json();
        return data;
    }

    static async getWeatherData(coords, timezone) {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,weathercode,pressure_msl,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_hours,precipitation_probability_max,windspeed_10m_max&current_weather=true&windspeed_unit=ms&timezone=${timezone}`)
        const data = await response.json();
        return data;
    }
}