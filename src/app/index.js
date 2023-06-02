'use strict';
import '../styles/scss/index.scss'
require.context('../assets/weather-icons', true, /\.svg$/)
import { geolocationPin } from './events/geolocation';
import { search } from './events/search';
//import { Weather } from './classes/CardsData';

// main
async function main() {

    // prompt the user for automatic location & if === true {get weather automaticly by coords}
    //get.getWeatherAuto()

    //events
    geolocationPin()
    search()

}

main()