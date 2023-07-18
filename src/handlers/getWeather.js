import Parser from "../tools/Parser";
import GetData from "../tools/GetData";
import CardsData from "../components/CardsData";

const getWeather = async (event) => {

    async function fillWeatherCards(cityName) {
        const data = await GetData.getWeather(cityName)
        const cardsData = new CardsData(data, Parser.parseFullCityName(cityName))
        cardsData.getDataAllCards()
        cardsData.fillAllCards()
    }

    //get weather automaticly
    if (event.target.id === 'pinImg') {
        navigator.geolocation.getCurrentPosition(async position => {
            const coords = Parser.parseCoords(position)
            const nameCity = await GetData.getCityName(coords);
            cityInput.dataset.city = nameCity[0]
            cityInput.value = nameCity[0]
            fillWeatherCards({ latitude: coords[0], longitude: coords[1], name: nameCity[0], admin1: nameCity[1] })

        }, err => console.error('Сan\'t get weather!\n', err))
    } else {
        cityInput.dataset.city = cityInput.value

        const id = (() => {
            if (event.type === 'click') {
                return event.target.id.substr(8, 1)
            }
        })()

        async function getListOfCities() {
            const city = cityInput.value.trim()
            if (city !== '') {
                const data = await GetData.getCityData(city);
                return data ? data : undefined
            } else {
                return undefined
            }
        }

        const data =
            id
                //getting weather by item from list
                ? (await getListOfCities())[id]
                //getting weather by submit
                : (await getListOfCities())[0]

        fillWeatherCards(data)
    }
}

export default getWeather;