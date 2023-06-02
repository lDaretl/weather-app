import { getListOfCities} from "../tools/get";
import { displayHideFullSearch, displayHide, displayHideSearch, displayShow, displayShowFullSearch } from "../tools/display";
import { parseCoordsFromData, parseFullCityName } from "../tools/parse";
import { getWeather } from "../getWeather";
import { fillListOfCities } from "../tools/fill";

export function search() {
    displaySearch()
    displayCitiesList()
    getWeatherByList()
    getWeatherBySearch()
}

// show/hide search & list of cities
function displaySearch() {
    document.addEventListener('click', async event => {
        if (event.target.id.includes('city')) {
            fillListOfCities();
            displayShowFullSearch()
        }
        else {
            cityName.innerText ? displayHideFullSearch() : displayHide(cityList);
        }
    })
}

// track search input, get & display list of cities
function displayCitiesList() {
    ['input', ].map(action => cityInput.addEventListener(action, async () => {
        fillListOfCities()
        displayShow(cityList)
    }))
}

// get the weather for the selected city from the list
function getWeatherByList() {
    cityList.addEventListener('click', async (event) => {
        const list = await getListOfCities()
        const data = list[event.target.id.substr(8, 1)]
        displayHideFullSearch();
        getWeather(parseCoordsFromData(data), parseFullCityName(data));
    })
}

// get weather by press Enter (the first city from array is selected)
function getWeatherBySearch() {
    cityInput.addEventListener('keypress', async event => {
        if (event.key === 'Enter') {
            try {
                event.preventDefault()
                displayHide(cityList)
                displayHideSearch()
                const data = getListOfCities();
                getWeather(parseCoordsFromData(data), parseFullCityName(data));
            } catch (err) {
                console.error('Error, can\'t get weather!\n ', err)
            }
        }
    })
}


