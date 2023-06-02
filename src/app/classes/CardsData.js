import { addSign, roundNum } from "../tools/weather";

export class CardsData {
    #propsNow;
    #propsHourly;
    #propsDaily;
    #isDay;
    #weatherCode;
    #cityNames;
    #date;
    #hourNow;
    #dayNow;
    #indexNow;
    #indexHourly;
    #dateFull;
    #dataFirstCard
    #dataFourthCard
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
    #weatherIconsDay = {
        0: 'clear-day',
        1: 'partly-cloudy-day',
        2: 'cloudy',
        3: 'overcast-day',
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
        95: 'thunderstorms-day',
        '*': 'thunderstorms-day',
        96: 'thunderstorms-day-snow',
        ['99 *']: 'thunderstorms-day-snow'
    }
    #weatherIconsNight = {
        0: 'clear-night',
        1: 'partly-cloudy-night',
        2: 'cloudy',
        3: 'overcast-night',
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
        95: 'thunderstorms-night',
        '*': 'thunderstorms-night',
        96: 'thunderstorms-night-snow',
        ['99 *']: 'thunderstorms-night-snow'
    }
    #daysOfTheWeekEn = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wensday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday',
    }
    #daysOfTheWeekRu = {
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
        7: 'Воскресенье',
    }

    get dataFirstCard() {
        return this.#dataFirstCard
    }

    get dataFourthCard() {
        return this.#dataFourthCard
    }

    get dataAllCards() {
        return this.#dataAllCards
    }

    constructor(data, cityNames) {
        this.#propsNow = data.current_weather
        this.#propsHourly = data.hourly
        this.#propsDaily = data.daily
        this.#isDay = Boolean(this.#propsNow.is_day)
        this.#weatherCode = this.#propsNow.weathercode
        this.#cityNames = cityNames
        this.#date = new Date()
        this.#hourNow = this.#date.getHours()
        this.#dayNow = this.#date.getDay()
        this.#dateFull = `${this.#date.getFullYear()}-${String(this.#date.getMonth() + 1).padStart(2, '0')}-${String(this.#date.getDate()).padStart(2, '0')}T${String(this.#hourNow).padStart(2, '0')}:00`
        this.#indexNow = this.#propsNow.time.indexOf(this.#dateFull)
        this.#indexHourly = this.#propsHourly.time.indexOf(this.#dateFull)
    }

    getDataAllCards() {
        this.getDataFirstCard(),
            this.getDataFourthCard(),
            this.#dataAllCards = {
                firstCard: this.#dataFirstCard,
                fourthCard: this.#dataFourthCard,
            }
    }

    getDataFirstCard() {
        const results = new Object()
        results.icon = `./assets/images/${this.#isDay ? this.#weatherIconsDay[this.#weatherCode] : this.#weatherIconsNight[this.#weatherCode]}.svg`
        results.city = `${this.#cityNames[0]}, ${this.#cityNames[1] ? this.#cityNames[1] : this.#cityNames[2]}`
        results.day = this.#daysOfTheWeekRu[this.#dayNow]
        results.description = this.#weatherCodesRu[this.#weatherCode]
        results.temp = addSign(roundNum(this.#propsNow.temperature))
        results.maxTemp = addSign(roundNum(this.#propsDaily.temperature_2m_max[0]))
        results.minTemp = addSign(roundNum(this.#propsDaily.temperature_2m_min[0]))

        results.weatherHourly = (() => {
            const results = {};
            for (let i = 1; i < 6; i++) {
                const hour = new Object()
                hour.time = `${this.#hourNow + i}:00`;
                hour.icon = `./assets/images/${this.#isDay ? this.#weatherIconsDay[this.#weatherCode] : this.#weatherIconsNight[this.#weatherCode]}.svg`;
                hour.temp = `${addSign(roundNum(this.#propsHourly.temperature_2m[this.#indexHourly + i]))}`;
                results[`hour${i}`] = hour;
            }
            return results;
        })()

        results.wind = roundNum(this.#propsNow.windspeed)
        results.rain = roundNum(this.#propsDaily.precipitation_probability_max[0])
        results.pressure = roundNum(this.#propsHourly.pressure_msl[this.#indexNow] * 0.750064)

        return this.#dataFirstCard = results
    }

    getDataFourthCard() {
        const results = new Object();
        let day = this.#dayNow + 1
        for (let i = 1; i < 6; i++) {
            const resultDaily = new Object();
            resultDaily.day = this.#daysOfTheWeekRu[day >= 7 ? (this.#daysOfTheWeekRu[day], day -= 6) : (this.#daysOfTheWeekRu[day], day++)]
            resultDaily.icon = `./assets/images/${this.#weatherIconsDay[this.#propsDaily.weathercode[i]]}.svg`;
            resultDaily.tempMax = `${addSign(roundNum(this.#propsDaily.temperature_2m_max[i]))}°`
            resultDaily.tempMin = `${addSign(roundNum(this.#propsDaily.temperature_2m_min[i]))}°`
            results[`day${i}`] = resultDaily;
        }
        return this.#dataFourthCard = results
    }

    fillAllCards() {
        this.fillFirstCard()
        this.fillFourthCard()
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
        //filling weather hourly 
        ;(() => {
            const data = this.#dataFirstCard.weatherHourly
            const hours = document.querySelector('#hours').children
            for (let index in Object.keys(hours)) {
                const id = Number(index) + 1
                const hour = `hour${id}`
                const props = hours[index].children
                props[0].innerText = data[hour].time
                props[1].children[0].src = data[hour].icon
                props[2].innerText = data[hour].temp
            }
        })()
        currentWind.innerHTML = data.wind + ' м/с'
        rainPosib.innerHTML = data.rain + '%'
        pressure.innerHTML = data.pressure + ' мм рт. ст.'
    }

    fillFourthCard() {
        const data = this.#dataFourthCard
        const days = document.querySelector('#weatherDaily').children
        for (let index in Object.keys(days)) {
            const id = Number(index) + 1
            const props = days[index].children
            const day = `day${id}`
            props[0].innerText = data[day].day
            props[1].children[0].src = data[day].icon
            props[2].children[0].innerText = data[day].tempMax
            props[2].children[1].innerText = data[day].tempMin
        }
    }
}