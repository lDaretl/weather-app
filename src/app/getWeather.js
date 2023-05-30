// import
import { weatherCodesRu, weatherCodesEn } from './resource/weatherCodes';
import { daysOfTheWeekRu, daysOfTheWeekEn } from './resource/daysOfTheWeek';
import { weatherIconsDay, weatherIconsNight } from './resource/weatherIcons';

// var
const currentWind = document.getElementById('currentWind')
//const maxWindDay = document.getElementById('maxWindDay')
const currentTemp = document.getElementById('currentTemp')
const maxTempDay = document.getElementById('maxTempDay')
const minTempDay = document.getElementById('minTempDay')
const rainPosib = document.getElementById('rainPosib')
const cityName = document.getElementById('cityName')
const dayNow = document.getElementById('dayName')
const weatherDescription = document.getElementById('weatherDescription')
const nowIcon = document.querySelector('#nowIcon')

// getting weather
export async function getWeather(coords, cityNames) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,weathercode,pressure_msl,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_hours,precipitation_probability_max,windspeed_10m_max&current_weather=true&windspeed_unit=ms&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`)
        .then(res => res.json())
        .then(data => {
            function roundNum(prop) {
                return Math.round(Number(prop))
            }

            function addSign(num) {
                return num > 0 ? '+' + num : num
            }

            // 1st card
            const cityPartialName = `${cityNames[0]}, ${cityNames[1] ? cityNames[1] : cityNames[2]}`
            const propNow = data.current_weather
            const propDaily = data.daily
            const propHour = data.hourly
            const weatherCodeNow = propNow.weathercode
            const date = new Date()
            const timeNow = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:00`

            function isDay(prop) {
                return prop ? weatherIconsDay : weatherIconsNight;
            }

            //const dateNow = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}`
            const currentIndex = propNow.time.indexOf(timeNow)
            const currentIndexHour = propHour.time.indexOf(timeNow)

            const properties = new Object()

            properties.city = cityPartialName
            properties.currentWind = roundNum(propNow.windspeed)
            properties.currentTemp = addSign(roundNum(propNow.temperature))
            properties.maxTempDay = addSign(roundNum(propDaily.temperature_2m_max[0]))
            properties.minTempDay = addSign(roundNum(propDaily.temperature_2m_min[0]))
            properties.rainPosib = roundNum(propDaily.precipitation_probability_max[0])
            properties.pressure = roundNum(propHour.pressure_msl[currentIndex] * 0.750064)
            properties.dayNow = daysOfTheWeekRu[date.getDay()]
            properties.nowIcon = `./assets/images/${isDay(propNow.is_day)[weatherCodeNow]}.svg`
            properties.weatherDescription = weatherCodesRu[weatherCodeNow]

            function fillHours(hourIndex) {
                const element = document.querySelector(`#hours`).children
                for (let index in Object.keys(element)) {
                    const item = element[index].children
                    const time = hourIndex + (Number(index) + 1)
                    item[0].innerText = `${new Date(propHour.time[time]).getHours() + ':00'}`
                    item[1].children[0].src = `./assets/images/${isDay(propHour.is_day)[propHour.weathercode[time]]}.svg`
                    item[2].innerText = `${addSign(roundNum(propHour.temperature_2m[time]))}`
                }
            }

            fillHours(currentIndexHour)

            // 4th card
            const dayOfTheWeek = date.getDay()

            function fillDays(day) {
                const fiveDaysRow = [];
                day++
                for (let i = 0; i < 5; i++) {
                    if (day >= 7) {
                        fiveDaysRow.push(daysOfTheWeekRu[day]);
                        day -= 6;
                    } else {
                        fiveDaysRow.push(daysOfTheWeekRu[day]);
                        day++;
                    }
                }

                for (let i = 1; i <= fiveDaysRow.length; i++) {
                    document.querySelector(`.day--${i} .day__text`).innerHTML = fiveDaysRow[i - 1]
                }
            }

            fillDays(dayOfTheWeek)

            function fillTemp() {
                const fiveDaysTempMax = [];
                const fiveDaysTempMin = [];
                for (let i = 1; i < 6; i++) {
                    fiveDaysTempMax.push(propDaily.temperature_2m_max[i])
                    fiveDaysTempMin.push(propDaily.temperature_2m_min[i])
                }

                for (let i = 0; i < fiveDaysTempMin.length; i++) {
                    document.querySelector(`.day--${i + 1} .max-min__max`).innerHTML = addSign(roundNum(fiveDaysTempMax[i])) + '°'
                    document.querySelector(`.day--${i + 1} .max-min__min`).innerHTML = addSign(roundNum(fiveDaysTempMin[i])) + '°'
                }
            }

            fillTemp()

            function fillDailyIcons() {
                for (let i = 1; i < 6; i++) {
                    document.getElementById(`dayIcon${i}`).src = `./assets/images/${weatherIconsDay[propDaily.weathercode[i]]}.svg`
                }
            }

            fillDailyIcons()

            return properties
        })
        .then(prop => {
            cityName.innerText = prop.city
            currentTemp.innerHTML = prop.currentTemp
            maxTempDay.innerHTML = prop.maxTempDay + '°'
            minTempDay.innerHTML = prop.minTempDay + '°'
            currentWind.innerHTML = prop.currentWind + ' м/с'
            rainPosib.innerHTML = prop.rainPosib + '%'
            pressure.innerHTML = prop.pressure + ' мм рт. ст.'
            dayNow.innerHTML = prop.dayNow
            nowIcon.src = prop.nowIcon

            weatherDescription.innerHTML = prop.weatherDescription
        })
}