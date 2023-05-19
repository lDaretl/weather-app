'use strict';
import { getWeather } from './getWeather';
import * as getData from './getData'
import * as tools from './tools'
import '../styles/css/index.css'
require.context('../assets/weather-icons', true, /\.svg$/)

// main
async function main() {
    // check geolocation & get weather automaticly
    navigator.geolocation.getCurrentPosition(async position => {
        const coords = getData.getCoordsFromCurrentPosition(position)
        const cityName = await getData.getCitynameByCoords(coords);
        getWeather(coords, [cityName])
    }, err => console.error('Error, can\'t get coordinates: ', err))

    document.addEventListener('click', event => {
        if (event.target === cityName || event.target === cityInput || event.target === pinImg) {
            tools.searchShow()
        }
        else {
            tools.searchHide()
        }
    })

    cityInput.addEventListener('keypress', async event => {
        if (event.key === 'Enter') {
            try {
                tools.searchHide()
                const data = await getData.getCityData(cityInput.value);
                getWeather(getData.getCoordsFromData(data), getData.getCityFromData(data));
            } catch (err) {
                console.error('Error, can\'t get weather!\n ', err)
            }
            
        }
    })
}

main()