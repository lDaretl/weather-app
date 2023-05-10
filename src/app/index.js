'use strict';

// funcs
function getCity(cityNow) {
    return prompt('Введите город:','Москва', cityNow);
}

// function getCityOnly(data) {
//     return data.name;
//     // try {
//     //     const c = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName
//     //     return c
//     // } catch {
//     //     try {
//     //         return data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName
//     //     } catch {
//     //         return data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.SubAdministrativeAreaName
//     //     }
//     // }
// }

function getCoord(data) {
    return ;
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
const dayNow = document.getElementById('dayName')
const weatherDescription = document.getElementById('weatherDescription')
const nowIcon = document.querySelector('#nowIcon')


let city = '';
let cityOnly = '';
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
const weatherCodesRu = {
    0: 'Ясное небо',
    1: 'В основном ясно',
    2: 'Переменная облачность',
    3: 'Пасмурно',
    45: 'Туман',
    48: 'Туман',
    51: 'Легкая Морось',
    53: 'Морось',
    55: 'Сильная Морось',
    56: 'Ледяная морось',
    57: 'Сильная ледяная морось',
    61: 'Небольшой дождь',
    63: 'Дождь',
    65: 'Сильный дождь',
    66: 'Ледяной дождь',
    67: 'Сильный ледяной дождь',
    71: 'Небольшой снег',
    73: 'Снег',
    75: 'Сильный снегопад',
    77: 'Сильный снегопад',
    80: 'Сильный дождь',
    81: 'Ливень',
    82: 'Сильный ливень',
    85: 'Небольшой снег',
    86: 'Сильный снегопад',
    95: 'Гроза',
    '*': 'Сильная гроза',
    96: 'Гроза с градом',
    ['99 *']: 'Сильная гроза с градом'
}

const weatherIcons = {
    0: 'clear-day',
    1: 'partly-cloudy-day',
    2: 'cloudy',
    3: 'overcast',
    45: 'fog',
    48: 'fog',
    51: 'drizzle',
    53: 'drizzle',
    55: 'drizzle',
    56: 'sleet',
    57: 'sleet',
    61: 'drizzle',
    63: 'rain',
    65: 'rain',
    66: 'sleet',
    67: 'sleet',
    71: 'snow',
    73: 'snow',
    75: 'snow',
    77: 'snow',
    80: 'rain',
    81: 'rain',
    82: 'rain',
    85: 'snow',
    86: 'snow',
    95: 'thunderstorms',
    '*': 'thunderstorms',
    96: 'thunderstorms-snow',
    ['99 *']: 'thunderstorms-snow'
}

// getting weather
async function getWeather() {
    const cityInput = getCity(cityOnly);
    console.log(cityInput)
    if (cityInput) {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=10&language=ru&format=json`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                city = `${data.results[0].name}, ${(data.results[0].name === data.results[0].admin1) ? '' : data.results[0].admin1 + ', '}${data.results[0].country}` ;
                cityOnly = data.results[0].name;
                return [data.results[0].latitude, data.results[0].longitude]
            })
            .then(coord => {
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coord[0]}&longitude=${coord[1]}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,weathercode,pressure_msl,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_hours,precipitation_probability_max,windspeed_10m_max&current_weather=true&windspeed_unit=ms&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        function roundNum(prop) {
                            return Math.round(Number(prop))
                        }

                        function addSign(num) {
                            return num > 0 ? '+' + num : num
                        }

                        // 1st card
                        const propNow = data.current_weather
                        const propDaily = data.daily
                        const propHour = data.hourly
                        const weatherCodeNow = propNow.weathercode
                        const date = new Date()
                        const timeNow = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:00`

                        //const dateNow = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}`
                        const currentIndex = propNow.time.indexOf(timeNow)
                        const currentIndexHour = propHour.time.indexOf(timeNow)

                        const properties = new Object()

                        properties.city = city
                        properties.currentWind = roundNum(propNow.windspeed)
                        properties.currentTemp = addSign(roundNum(propNow.temperature))
                        properties.maxTempDay = addSign(roundNum(propDaily.temperature_2m_max[0]))
                        properties.minTempDay = addSign(roundNum(propDaily.temperature_2m_min[0]))
                        properties.rainPosib = roundNum(propDaily.precipitation_probability_max[0])
                        properties.pressure = roundNum(propHour.pressure_msl[currentIndex] * 0.750064)
                        properties.dayNow = daysOfTheWeekRu[date.getDay()]
                        properties.nowIcon = `assets/weather-icons/${weatherIcons[weatherCodeNow]}.svg`
                        properties.weatherDescription = weatherCodesRu[weatherCodeNow]

                        function fillHours (hourIndex) {
                            for (let i = 1; i < 6; i++) {
                                const item = document.getElementById(`hour${i}`);
                                console.log(item.innerHTML)
                                item.innerHTML = `<div class="hour__text">${new Date(propHour.time[hourIndex + (i-1)]).getHours() + ':00'}</div>
                                <div class="hour__img"><img src="assets/weather-icons/${weatherIcons[propHour.weathercode[hourIndex + (i-1)]]}.svg" alt="hourly weather image"></div>
                                <div class="hour__temp">${addSign(roundNum(propHour.temperature_2m[hourIndex + (i-1)]))}</div>`
                                //item.innerHTML () 
                                //item.insertAdjacentHTML ('beforeend', `<div class="hour__img"><img src="assets/weather-icons/${weatherIcons[propHour.weathercode[hourIndex + (i-1)]]}.svg" alt="hourly weather image"></div>`) 
                                //item.insertAdjacentHTML ('beforeend', `<div class="hour__temp">${addSign(roundNum(propHour.temperature_2m[hourIndex + (i-1)]))}</div>`) 

                                // <div class="day__text">-</div>
                                //         <div class="day__pic"><img src="" alt="" id="dayIcon5">
                                //         </div>
                                //         <div class="day__temp max-min">
                                //             <div class="max-min__max">-</div>
                                //             <div class="max-min__min">-</div>
                                //         </div>
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
                                document.getElementById(`dayIcon${i}`).src = `assets/weather-icons/${weatherIcons[propDaily.weathercode[i]]}.svg`
                            }
                        }

                        fillDailyIcons()

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
                        dayNow.innerHTML = prop.dayNow
                        nowIcon.src = prop.nowIcon

                        weatherDescription.innerHTML = prop.weatherDescription
                    })
            })
    }
}

// main
async function main() {
    getWeather();
    cityNow.addEventListener('click', () => getWeather());
}

main()

// https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.62&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,rain,snowfall,snow_depth,cloudcover,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,windspeed_10m_max&current_weather=true&windspeed_unit=ms&timezone=Europe%2FMoscow