'use strict';
import '../styles/scss/index.scss'
require.context('../assets/weather-icons', true, /\.svg$/)
require.context('../assets/', false, /Background.png$/)
import { autoSearch, manualSearch } from "../features";
import getWeather from '../handlers/getWeather';
import DisplayController from '../shared/tools/DisplayController';

export function main() {
    const lastCityData = JSON.parse(localStorage.getItem('lastCity'))

    if(lastCityData) {
        DisplayController.hideSearch();
        cityInput.dataset.city = lastCityData.name
        getWeather(lastCityData)
    }

    autoSearch();
    manualSearch();
}