'use strict';

// funcs
function getCity() {
    return prompt('Введите город:', 'Москва')
}

function getCoord(data) {
    const coord = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
    const rightCoord = coord.split(' ').reverse()
    return rightCoord;
}

// var
//const blockMain = document.querySelector('.cards__item--1')
const currentWind = document.getElementById('currentWind')
const maxWindDay = document.getElementById('maxWindDay')
const currentTemp = document.getElementById('currentTemp')
const maxTempDay = document.getElementById('maxTempDay')
const minTempDay = document.getElementById('minTempDay')
const rainPosib = document.getElementById('rainPosib')
const cityNow = document.querySelector('#cityNow span')
let city = '';
const daysOfTheWeekRu = {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    7: 'Воскресенье',
}
const weatherCodesEn = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'partly cloudy',
    3: 'overcast',
    45: 'Fog',
    48: 'depositing rime fog',
    51: 'drizzle light',
    53: 'drizzle moderate',
    55: 'drizzle heavy',
    56: 'Freezing Drizzle light',
    57: 'Freezing Drizzle dense',
    61: 'Rain light',
    63: 'Rain moderate',
    65: 'Rain heavy',
    66: 'Freezing Rain Light',
    67: 'Freezing Rain heavy',
    71: 'Snow fall slight',
    73: 'Snow fall moderate',
    75: 'Snow fall heavy',
    77: 'Snow grains',
    80: 'Rain showers slight',
    81: 'Rain showers moderate',
    82: 'Rain showers violent',
    85: 'Snow showers slight',
    86: 'Snow showers heavy',
    95: 'Thunderstorm Slight',
    '*': 'Thunderstorm heavy',
    96: 'hunderstorm with slight hail',
    ['99 *']: 'hunderstorm with heavy hail'
}

// main
async function main() {
    fetch(`https://geocode-maps.yandex.ru/1.x?geocode=${getCity()}&apikey=bc0a7b38-a726-4b82-bdde-2d26048742c8&kind=locality&format=json&lang=ru_RU`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            city = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted
            return getCoord(data)
        })

        //`https://api.open-meteo.com/v1/forecast?latitude=${coord[0]}&longitude=${coord[1]}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,rain,snowfall,snow_depth,cloudcover,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,windspeed_10m_max&current_weather=true&windspeed_unit=ms&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`

        .then(coord => {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coord[0]}&longitude=${coord[1]}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,weathercode,pressure_msl,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_hours,precipitation_probability_max,windspeed_10m_max&current_weather=true&windspeed_unit=ms&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    function roundNum (prop) {
                        return Math.round(Number(prop))
                    }

                    function addSign (num) {
                        return num > 0 ? '+' + num : num 
                    }

                    // 1st card
                    const propNow = data.current_weather
                    const propDaily = data.daily
                    const propHour = data.hourly
                    const date = new Date()
                    const timeNow = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}T${String(date.getHours()).padStart(2, '0')}:00`

                    //const dateNow = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}`
                    const currentIndex = propNow.time.indexOf(timeNow)

                    const properties = new Object()

                    properties.city = city
                    properties.currentWind = roundNum(propNow.windspeed)
                    properties.currentTemp = addSign(roundNum(propNow.temperature))
                    properties.maxTempDay = addSign(roundNum(propDaily.temperature_2m_max[0]))
                    properties.minTempDay = addSign(roundNum(propDaily.temperature_2m_min[0]))
                    properties.rainPosib = roundNum(propDaily.precipitation_probability_max[0])
                    properties.pressure = roundNum(propHour.pressure_msl[currentIndex] * 0.750064)


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
                            document.querySelector(`.day--${i+1} .max-min__max`).innerHTML = addSign(roundNum(fiveDaysTempMax[i])) + '°'
                            document.querySelector(`.day--${i+1} .max-min__min`).innerHTML = addSign(roundNum(fiveDaysTempMin[i])) + '°'
                        }
                    }

                    fillTemp()


                    return properties
                })
                .then(prop => {
                    console.log(prop)

                    cityNow.innerHTML = prop.city
                    currentTemp.innerHTML = prop.currentTemp
                    maxTempDay.innerHTML = prop.maxTempDay + '°'
                    minTempDay.innerHTML = prop.minTempDay + '°'
                    currentWind.innerHTML = prop.currentWind + ' м/с'
                    rainPosib.innerHTML = prop.rainPosib + '%'
                    pressure.innerHTML = prop.pressure + ' мм рт. ст.'
                })
        })
}

main()

// https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.62&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,rain,snowfall,snow_depth,cloudcover,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,windspeed_10m_max&current_weather=true&windspeed_unit=ms&timezone=Europe%2FMoscow