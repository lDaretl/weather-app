'use strict';
import { getWeather } from './getWeather';
import * as get from './tools/get'
import * as display from './tools/display'
import * as fetchData from './tools/fetchData'
import '../styles/css/index.css'
require.context('../assets/weather-icons', true, /\.svg$/)
const cityInput = document.getElementById('cityInput')

// main
async function main() {
    //check geolocation & get weather automaticly

    // navigator.geolocation.getCurrentPosition(async position => {
    //     const coords = get.getCoordsFromCurrentPosition(position)
    //     const cityName = await fetchData.getCityNameByCoords(coords);
    //     getWeather(coords, [cityName])
    // }, err => console.error('Error, can\'t get coordinates: ', err))

    // show/hide search & list of cities
    document.addEventListener('click', event => {
        if (event.target === cityName || event.target === cityInput || event.target === pinImg) {
            display.displaySearchShow()
            display.displayShow(cityList)
        }
        else {
            display.displaySearchHide()
            display.displayHide(cityList)
        }
    })

    let citiesDataArr = [];

    // track search input, get & display list of cities
    cityInput.addEventListener('input', async event => {
        cityList.innerHTML = ''
        display.displayShow(cityList)
        const data = await fetchData.getCityData(event.target.value.trim());
        console.log(data, 'booba')
        if(data) {
            citiesDataArr = data
            console.log(citiesDataArr, 'arr')
            const allCities = get.getAllCities(data)
            display.displayCities(allCities)
        }
    })

    // get the weather for the selected city from the list
    cityList.addEventListener('click', async event => {
        const selectedCity = Number((event.target.id).slice(8, 9))
        const data = citiesDataArr[selectedCity]
        getWeather(get.getCoordsFromData(data), get.getCityFromData(data));
    })

    // get weather by press Enter (the first city from array is selected)
    cityInput.addEventListener('keypress', async event => {
        if (event.key === 'Enter') {
            try {
                event.preventDefault()
                display.displayHide(cityList)
                display.displaySearchHide()
                const data = await fetchData.getCityData(event.target.value);
                getWeather(get.getCoordsFromData(data.results[0]), get.getCityFromData(data.results[0]));
            } catch (err) {
                console.error('Error, can\'t get weather!\n ', err)
            }
        }
    })
}

main()