'use strict';

import { weatherCodesRu, weatherCodesEn } from './dict/weatherCodes';
import { daysOfTheWeekRu, daysOfTheWeekEn } from './dict/daysOfTheWeek';
import { weatherIconsDay, weatherIconsNight } from './dict/weatherIcons';
import * as tools from './tools'
import '../styles/css/index.css'
require.context('./../assets/weather-icons', true, /\.svg$/)

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



// getting data about city
async function getData(city) {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=ru&format=json`)
    return response.json();
}

// getting short & full city names
function getCity(data) {
    return [data.results[0].name, tools.parseFullCityName(data)]
}

// getting coordinates
function getCoords(data) {
    return [data.results[0].latitude, data.results[0].longitude]
}

// getting weather
async function getWeather(coords, cityNames) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,weathercode,pressure_msl,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_hours,precipitation_probability_max,windspeed_10m_max&current_weather=true&windspeed_unit=ms&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`)
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
            const cityName = cityNames[0]
            const cityNameFull = cityNames[1]
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

            properties.city = cityNameFull
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
                for (let i = 1; i < 6; i++) {
                    const item = document.getElementById(`hour${i}`);
                    console.log(item.innerHTML)
                    item.innerHTML = `<div class="hour__text">${new Date(propHour.time[hourIndex + (i - 1)]).getHours() + ':00'}</div>
                                <div class="hour__img"><img src="./assets/images/${isDay(propHour.is_day)[propHour.weathercode[hourIndex + (i - 1)]]}.svg" alt="hourly weather image"></div>
                                <div class="hour__temp">${addSign(roundNum(propHour.temperature_2m[hourIndex + (i - 1)]))}</div>`
                }
            }

            fillHours(currentIndexHour)

            //https://www.geonames.org/servlet/geonames?&srv=2&lat=58.625&lng=49.6875&north=58.63493019540103&east=49.72837686538698&south=58.615066981499126&west=49.64662313461305&maxRows=100&type=json&q=&P=1&A=1&V=1&T=1&L=1&R=1&S=1&H=1&U=1

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
}

// main
async function main() {
    // navigator.geolocation.getCurrentPosition(position => {
    //     console.log(position)
    //     const data = await getData(cityInput.value);
    //     getWeather(getCoords(data), getCity(data));
        //getWeather([position.coords.latitude, position.coords.longitude])
    // })
    //getWeather('Москва');
    document.addEventListener('click', event => {
        if (event.target === cityNow || event.target === cityInput || event.target === pinImg) {
            tools.searchShow()
        }
        else {
            tools.searchHide()
        }
    })
    cityInput.addEventListener('keypress', async event => {
        if (event.key === 'Enter') {
            tools.searchHide()
            const data = await getData(cityInput.value);
            getWeather(getCoords(data), getCity(data));
        }
    })
}

main()