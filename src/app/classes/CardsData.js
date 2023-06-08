import { addSign, roundNum } from "../tools/weather";

export class CardsData {
    #propsNow;
    #propsHourly;
    #propsDaily;
    #cityNames;
    #date;
    #hourNow;
    #dayNow;
    #indexNow;
    #indexHourly;
    #indexDaily;
    #dateFull;
    #dataFirstCard
    #dataSecondCard
    #dataThirdCard
    #dataAllCards
    #weatherCodesEn = {
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
    };
    #weatherCodesRu = {
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
    };
    #weatherIcons = {
        0: 'clear',
        1: 'partly-cloudy',
        2: 'cloudy',
        3: 'overcast',
        45: 'mist',
        48: 'mist',
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
    #daysOfTheWeekEn = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wensday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
    }
    #daysOfTheWeekRu = {
        0: 'Воскресенье',
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
    }

    get dataFirstCard() {
        return this.#dataFirstCard
    }

    get dataThirdCard() {
        return this.#dataThirdCard
    }

    get dataAllCards() {
        return this.#dataAllCards
    }

    constructor(data, cityNames) {
        this.#propsNow = data.current_weather
        this.#propsHourly = data.hourly
        this.#propsDaily = data.daily
        this.#cityNames = cityNames
        this.#date = new Date()
        this.#hourNow = this.#date.getHours()
        this.#dayNow = this.#date.getDay()
        this.#dateFull = `${this.#date.getFullYear()}-${String(this.#date.getMonth() + 1).padStart(2, '0')}-${String(this.#date.getDate()).padStart(2, '0')}T${String(this.#hourNow).padStart(2, '0')}:00`
        this.#indexNow = this.#propsNow.time.indexOf(this.#dateFull)
        this.#indexHourly = this.#propsHourly.time.indexOf(this.#dateFull)
        //console.log(this.#propsDaily)
        //this.#indexDaily = this.#propsDaily.time.indexOf(`${this.#date.getFullYear()}-${String(this.#date.getMonth() + 1).padStart(2, '0')}-${String(this.#date.getDate()).padStart(2, '0')}`)
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
        const results = new Object()
        const weatherCode = this.#propsNow.weathercode
        const icon = this.#weatherIcons[weatherCode]
        const isDay = this.#propsNow.is_day
        console.log(this.#propsNow)
        results.icon = `./assets/images/${[0, 1, 3].includes(weatherCode) ? (isDay ? `${icon}-day` : `${icon}-night`) : icon}.svg`
        results.city = `${this.#cityNames[0]}, ${this.#cityNames[1] ? this.#cityNames[1] : this.#cityNames[2]}`
        results.day = this.#daysOfTheWeekRu[this.#dayNow]
        results.description = this.#weatherCodesRu[weatherCode]
        results.temp = addSign(roundNum(this.#propsNow.temperature))
        results.maxTemp = addSign(roundNum(this.#propsDaily.temperature_2m_max[0]))
        results.minTemp = addSign(roundNum(this.#propsDaily.temperature_2m_min[0]))
        results.apparentTemp = addSign(roundNum(this.#propsHourly.apparent_temperature[0]))
        results.wind = roundNum(this.#propsNow.windspeed)
        results.rain = roundNum(this.#propsDaily.precipitation_probability_max[0])
        results.pressure = addSign(roundNum(this.#propsHourly.pressure_msl[this.#indexNow] * 0.750064))

        return this.#dataFirstCard = results
    }

    getDataSecondCard() {
        const results = {};
        let hourNow = this.#hourNow
        for (let i = 1; i < 6; i++) {
            const hour = new Object()
            const indexHourly = this.#indexHourly + i
            const weatherCode = this.#propsHourly.weathercode[indexHourly]
            const icon = this.#weatherIcons[weatherCode]
            const isDay = this.#propsHourly.is_day[indexHourly]
            hourNow < 24 ? null : hourNow = 0;
            hour.time = `${hourNow.toString().padStart(2, '0')}:00`
            hourNow++;
            hour.icon = `./assets/images/${[0, 1, 3].includes(weatherCode) ? (isDay ? `${icon}-day` : `${icon}-night`) : icon}.svg`
            hour.temp = `${addSign(roundNum(this.#propsHourly.temperature_2m[indexHourly]))}°`;
            hour.wind = `${roundNum(this.#propsHourly.windspeed_10m[indexHourly])} м/с`;
            hour.rain = `${this.#propsHourly.precipitation_probability[indexHourly]}%`;
            results[`hour${i}`] = hour;
        }
        return this.#dataSecondCard = results
    }

    getDataThirdCard() {
        const results = new Object();
        let day = this.#dayNow + 1
        for (let i = 1; i < 6; i++) {
            const resultDaily = new Object();
            const weatherCode = this.#propsDaily.weathercode[i]
            const icon = this.#weatherIcons[weatherCode]
            resultDaily.day = this.#daysOfTheWeekRu[day >= 7 ? (this.#daysOfTheWeekRu[day], day -= 6) : (this.#daysOfTheWeekRu[day], day++)]
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