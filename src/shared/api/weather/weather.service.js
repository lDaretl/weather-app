export const getWeather = async (coords, timezone) => {
    try {
        const url = 'https://api.open-meteo.com/v1/forecast'
        const place = `latitude=${coords[0]}&longitude=${coords[1]}`
        const paramsHourly = 'hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,weathercode,pressure_msl,windspeed_10m,is_day'
        const paramsDaily = 'daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_hours,precipitation_probability_max,windspeed_10m_max'
        const currentWeather = 'current_weather=true'
        const windSpeedUnits = "windspeed_unit=ms"
        const timeZone = `timezone=${timezone}`
        const req = `${url}?${place}&${paramsHourly}&${paramsDaily}&${currentWeather}&${windSpeedUnits}&${timeZone}`
        const res = await fetch(req)
        if(!res.ok)
            return null
        return await res.json();
    } catch (e) {
        console.log(e)
    }
}