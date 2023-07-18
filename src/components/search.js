import clickDocument from "../events/clickDocument";
import clickList from "../events/clickList";
import inputSearch from "../events/inputSearch";
import submitSearch from "../events/submitSearch";
import getWeather from "../handlers/getWeather";
import renderList from "../handlers/renderList";
import renderSearch from "../handlers/renderSearch";
import currentCityEl from "../utils/currentCityEl";

const search = () => {
    const getCities = () => {
        renderList(true)
    }

    const getWeatherBySubmit = async (event) => {
        event.preventDefault()
        const eventTarget = { target: event.target[0] }
        await getWeather(eventTarget)
        searchOff(eventTarget)
    }

    const getWeatherByList = async (event) => {
        await getWeather(event)
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

    currentCityEl().removeEventListener('click', searchOn)
    currentCityEl().addEventListener('click', searchOn)
}

export default search;