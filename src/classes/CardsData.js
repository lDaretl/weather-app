import { addSign, roundNum } from "../shared/utils";
import days from '../assets/dictionaries/ru/days.json'
import months from '../assets/dictionaries/ru/months.json'
import weatherCodes from '../assets/dictionaries/ru/weather.json'
import weatherIcons from '../assets/weather-icons/weather-icons.json'

export default class CardsData {
    #propsNow;
    #propsHourly;
    #propsDaily;
    #cityNames;
    #date;
    #hourNow;
    #minutesNow;
    #dayNow;
    #dateNow;
    #monthNow;
    #index;
    #dateFull;
    #dataFirstCard
    #dataSecondCard
    #dataThirdCard
    #dataAllCards
    #weatherIcons = weatherIcons
    #daysOfTheWeek = days;
    #months = months;
    #weatherCodes = weatherCodes;

    constructor(data, cityNames) {
        this.#propsNow = data.current_weather
        this.#propsHourly = data.hourly
        this.#propsDaily = data.daily
        this.#cityNames = cityNames
        const localDate = new Date()
        this.#date = new Date(localDate.getTime() + (data["utc_offset_seconds"] + localDate.getTimezoneOffset() * 60) * 1000)
        this.#dayNow = this.#date.getDay()
        this.#hourNow = this.#date.getHours()
        this.#minutesNow = this.#date.getMinutes()
        this.#dateNow = this.#date.getDate()
        this.#monthNow = this.#date.getMonth()
        this.#dateFull = this.#propsNow.time
        this.#index = this.#propsHourly.time.indexOf(this.#dateFull)
    }

    getDataAllCards() {
        this.getDataFirstCard()
        this.getDataSecondCard()
        this.getDataThirdCard()
        this.#dataAllCards = {
            firstCard: this.#dataFirstCard,
            secondCard: this.#dataFirstCard,
            thirdCard: this.#dataThirdCard,
        }
    }

    getDataFirstCard() {
        const results = {}
        const weatherCode = this.#propsNow.weathercode
        const icon = this.#weatherIcons[weatherCode]
        const isDay = this.#propsNow.is_day
        results.icon = `./assets/images/${[0, 1, 3].includes(weatherCode) ? (isDay ? `${icon}-day` : `${icon}-night`) : icon}.svg`
        results.city = `${this.#cityNames[0]}${this.#cityNames[1] ? `, ${this.#cityNames[1]}` : ''}`
        results.time = `${this.#hourNow}:${this.#minutesNow.toString().padStart(2, "0")}`
        results.date = `${this.#months[this.#monthNow]}, ${this.#dateNow}`
        results.day = this.#daysOfTheWeek[this.#dayNow]
        results.description = this.#weatherCodes[weatherCode]
        results.temp = addSign(roundNum(this.#propsNow.temperature))
        results.maxTemp = addSign(roundNum(this.#propsDaily.temperature_2m_max[0]))
        results.minTemp = addSign(roundNum(this.#propsDaily.temperature_2m_min[0]))
        results.apparentTemp = addSign(roundNum(this.#propsHourly.apparent_temperature[0]))
        results.wind = roundNum(this.#propsNow.windspeed)
        results.rain = roundNum(this.#propsDaily.precipitation_probability_max[0])
        results.pressure = roundNum(this.#propsHourly.pressure_msl[this.#index] * 0.750064)
        return this.#dataFirstCard = results
    }

    getDataSecondCard() {
        const results = {};
        let hourNow = this.#hourNow
        for (let i = 1; i < 6; i++) {
            const hour = {}
            const indexHourly = this.#index + i
            const weatherCode = this.#propsHourly.weathercode[indexHourly]
            const icon = this.#weatherIcons[weatherCode]
            const isDay = this.#propsHourly.is_day[indexHourly]
            hourNow++;
            hourNow < 24 ? null : hourNow = 0;
            hour.time = `${hourNow.toString().padStart(2, '0')}:00`
            hour.icon = `./assets/images/${[0, 1, 3].includes(weatherCode) ? (isDay ? `${icon}-day` : `${icon}-night`) : icon}.svg`
            hour.temp = `${addSign(roundNum(this.#propsHourly.temperature_2m[indexHourly]))}°`;
            hour.wind = `${roundNum(this.#propsHourly.windspeed_10m[indexHourly])} м/с`;
            hour.rain = `${this.#propsHourly.precipitation_probability[indexHourly]}%`;
            results[`hour${i}`] = hour;
        }
        return this.#dataSecondCard = results
    }

    getDataThirdCard() {
        const results = {};
        let day = this.#dayNow + 1
        for (let i = 1; i < 6; i++) {
            const resultDaily = {};
            const weatherCode = this.#propsDaily.weathercode[i]
            const icon = this.#weatherIcons[weatherCode]
            if(day > 6) day = 0
            resultDaily.day = this.#daysOfTheWeek[day]
            day++
            resultDaily.icon = `./assets/images/${[0, 1, 3].includes(weatherCode) ? `${icon}-day` : icon}.svg`;
            resultDaily.tempMax = `${addSign(roundNum(this.#propsDaily.temperature_2m_max[i]))}°`
            resultDaily.tempMin = `${addSign(roundNum(this.#propsDaily.temperature_2m_min[i]))}°`
            resultDaily.wind = `${roundNum(this.#propsDaily.windspeed_10m_max[i])} м/с`
            resultDaily.rain = `${this.#propsDaily.precipitation_probability_max[i]}%`
            results[`day${i}`] = resultDaily;
        }
        return this.#dataThirdCard = results
    }

    fillAllCards() {
        this.fillFirstCard()
        this.fillSecondCard()
        this.fillThirdCard()
    }

    fillFirstCard() {
        const data = this.#dataFirstCard
        dayTime.innerText = data.time
        dayDate.innerText = data.date
        dayName.innerText = data.day
        nowIcon.src = data.icon
        cityName.innerText = data.city
        dayName.innerHTML = data.day
        weatherDescription.innerHTML = data.description
        currentTemp.innerHTML = data.temp
        maxTempDay.innerHTML = data.maxTemp + '°'
        minTempDay.innerHTML = data.minTemp + '°'
        currentWind.innerHTML = data.wind + ' м/с'
        rainPosib.innerHTML = data.rain + '%'
        pressure.innerHTML = data.pressure + ' мм рт. ст.'
        apparentTemp.innerHTML = data.apparentTemp + '°'
    }

    fillSecondCard() {
        const data = this.#dataSecondCard
        const hours = document.querySelector('#hours').children
        for (let index in Object.keys(hours)) {
            const id = Number(index) + 1
            const hour = `hour${id}`
            const props = hours[index].children
            props[0].innerText = data[hour].time
            props[1].children[0].src = data[hour].icon
            props[2].children[0].setAttribute('src', this.#defineTempIcon(Number(data[hour].temp.slice(1, (data[hour].temp).length - 1))))
            props[2].children[1].innerText = data[hour].temp
            props[3].children[1].innerText = data[hour].wind
            props[4].children[1].innerText = data[hour].rain
        }
    }

    fillThirdCard() {
        const data = this.#dataThirdCard
        const days = document.querySelector('#weatherDaily').children
        for (let index in Object.keys(days)) {
            const id = Number(index) + 1
            const props = days[index].children
            const day = `day${id}`
            props[0].innerText = data[day].day
            props[1].children[0].src = data[day].icon
            props[2].children[0].setAttribute('src', this.#defineTempIcon(Number(data[day].tempMax.slice(1, (data[day].tempMax).length - 1))))
            props[2].children[1].innerText = data[day].tempMax
            props[3].children[0].setAttribute('src', this.#defineTempIcon(Number(data[day].tempMin.slice(1, (data[day].tempMin).length - 1))))
            props[3].children[1].innerText = data[day].tempMin
            props[4].children[1].innerText = data[day].wind
            props[5].children[1].innerText = data[day].rain
        }
    }

    #defineTempIcon(num) {
        return num >= 1 ? 'assets/images/thermometer-warm.svg' : 'assets/images/thermometer-cold.svg';
    }
}