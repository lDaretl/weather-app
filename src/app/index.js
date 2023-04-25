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

function getWeatherData([lat, lon]) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain,snowfall,cloudcover,windspeed_10m&timezone=Europe%2FMoscow`)
        .then(res => res.json())
        .then(data => { return data })
}

// main
async function main() {
    fetch(`https://geocode-maps.yandex.ru/1.x?geocode=${getCity()}&apikey=bc0a7b38-a726-4b82-bdde-2d26048742c8&kind=locality&format=json&lang=ru_RU`)
        .then(res => res.json())
        .then(data => getCoord(data))
        .then(coord => {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coord[0]}&longitude=${coord[1]}&hourly=temperature_2m,rain,snowfall,cloudcover,windspeed_10m&timezone=Europe%2FMoscow`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const date = new Date()
                    const timeNow = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}T${date.getHours()}:00`
                    const currentIndex = data.hourly.time.indexOf(timeNow)
                    const currentWind = Math.round(Number(data.hourly.windspeed_10m[currentIndex]))
                    const currentTemp = Math.round(Number(data.hourly.temperature_2m[currentIndex]))
                    console.log(currentWind)
                    console.log(currentTemp)
                })
        })
}

main()