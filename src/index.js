'use strict';
import './styles/scss/index.scss'
require.context('./assets/weather-icons', true, /\.svg$/)
require.context('./assets/', false, /Background.png$/)
import search from './components/search'
import autosearch from './components/autosearch';

// main
function main() {
    search();
    autosearch();
}

main()