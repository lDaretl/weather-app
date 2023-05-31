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
    #daysOfTheWeekRu = {
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
        7: 'Воскресенье',
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

    get hourNow() {
        return this.#hourNow
    }

    get isDay() {
        return this.#isDay
    }

    get weatherIconsDay() {
        return this.#weatherIconsDay
    }

    get weatherIconsNight() {
        return this.#weatherIconsNight
    }

    get weatherCode() {
        return this.#weatherCode
    }

    get weatherCode() {
        return this.#weatherCode
    }

    get propsDaily() {
        return this.#propsDaily
    }

    get hourNow() {
        return this.#hourNow
    }

    get daysOfTheWeekRu() {
        return this.#daysOfTheWeekRu
    }

    get dayNow() {
        return this.#dayNow
    }

    getWeather() {

        const results = new Object()
        console.log(this.#dayNow)
        results.icon = `./assets/images/${this.#isDay ? this.#weatherIconsDay[this.#weatherCode] : this.#weatherIconsNight[this.#weatherCode]}.svg`
        results.city = `${this.#cityNames[0]}, ${this.#cityNames[1] ? this.#cityNames[1] : this.#cityNames[2]}`
        results.day = this.#daysOfTheWeekRu[this.#dayNow]
        results.description = this.#weatherCodesRu[this.#weatherCode]
        results.temp = addSign(roundNum(this.#propsNow.temperature))
        results.maxTemp = addSign(roundNum(this.#propsDaily.temperature_2m_max[0]))
        results.minTemp = addSign(roundNum(this.#propsDaily.temperature_2m_min[0]))

        results.weatherHourly = (() => {
            const results = [];
            for (let i = 1; i < 6; i++) {
                const resultHour = [];
                resultHour.push(`${this.#hourNow + i}:00`);
                resultHour.push(`./assets/images/${this.#isDay ? this.#weatherIconsDay[this.#weatherCode] : this.#weatherIconsNight[this.#weatherCode]}.svg`);
                resultHour.push(`${addSign(roundNum(this.#propsHourly.temperature_2m[this.#indexHourly + i]))}`);
                results.push(resultHour);
            }
            return results;
        })()

        results.wind = roundNum(this.#propsNow.windspeed)
        results.rain = roundNum(this.#propsDaily.precipitation_probability_max[0])
        results.pressure = roundNum(this.#propsHourly.pressure_msl[this.#indexNow] * 0.750064)

        return results
    }

}

export class FirstCardData extends CardsData {
    getWeather() {
        return super.getWeather()
    }
}

export class FourthCardData extends CardsData {
    getWeather() {
            const results = [];
            let day = this.dayNow
            for (let i = 1; i < 6; i++) {
                const resultDaily = [];
                resultDaily.push( day >= 7 ? (this.daysOfTheWeekRu[day], day -= 6) : (this.daysOfTheWeekRu[day], day++))
                resultDaily.push(`./assets/images/${this.isDay ? this.weatherIconsDay[this.weatherCode] : this.weatherIconsNight[this.weatherCode]}.svg`);
                resultDaily.push(`${addSign(roundNum(this.propsDaily.temperature_2m_max[i]))}`);
                resultDaily.push(`${addSign(roundNum(this.propsDaily.temperature_2m_min[i]))}`);
                results.push(resultDaily);
            }
            return results;
    }
}


// TODO
// 1) in 4 card return index, not words
// 2) wrong images