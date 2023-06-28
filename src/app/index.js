'use strict';
import '../styles/scss/index.scss'
require.context('../assets/weather-icons', true, /\.svg$/)
require.context('../assets/', false, /Background.png$/)
import { geolocationPin } from './events/geolocation';
import { search } from './events/search';
import { getWeatherAuto } from './tools/get';

// main
async function main() {

    // prompt the user for automatic location & if === true {get weather automaticly by coords}
    //getWeatherAuto()

    //events
    geolocationPin()
    search()

}

main()