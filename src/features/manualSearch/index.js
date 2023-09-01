import {clickDocument, clickList, inputSearch, submitSearch} from '../../shared/events'
import getWeather from "../../handlers/getWeather";
import renderList from "../../handlers/renderList";
import renderSearch from "../../handlers/renderSearch";
import currentCityEl from "../../shared/utils/currentCityEl";
import {defineCity} from "./defineCity";
import {saveLastCity} from '../../shared/utils';

export const manualSearch = () => {
    const getCities = () => {
        renderList(true)
    }

    const getWeatherBySubmit = async (event) => {
        event.preventDefault()
        const city = await defineCity(event)
        cityInput.dataset.city = city.name
        saveLastCity(city)
        await getWeather(city)
        searchOff(event)
    }

    const getWeatherByList = async (event) => {
        const city = await defineCity(event)
        console.log(city, 'city')
        cityInput.dataset.city = city.name
        saveLastCity(city)
        await getWeather(city)
    }

    const searchOn = () => {
        currentCityEl().removeEventListener('click', searchOn)
        clickDocument(true, searchOff)
        renderSearch(true)
        renderList(true)
        clickList(true, getWeatherByList);
        inputSearch(true, getCities);
        submitSearch(true, getWeatherBySubmit);
    }

    const searchOff = (event) => {
        if (!(event.target.id.includes('city') && event.type === 'click')) {
            clickDocument(false, searchOff)
            renderSearch(false)
            renderList(false)
            clickList(false, getWeatherByList);
            inputSearch(false, getCities);
            submitSearch(false, getWeatherBySubmit);
            currentCityEl().addEventListener('click', searchOn)
        }
    }

    cityInput.addEventListener('click', searchOn)
    cityName.addEventListener('click', searchOn)
}