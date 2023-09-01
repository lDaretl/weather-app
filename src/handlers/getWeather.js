import Parser from "../shared/tools/Parser";
import { DataProvider } from "../shared/providers";
import CardsData from "../classes/CardsData";

const getWeather = async (cityName) => {
    const data = await DataProvider.getWeather(cityName)
    const cardsData = new CardsData(data, Parser.parseFullCityName(cityName))
    cardsData.getDataAllCards()
    cardsData.fillAllCards()
}

export default getWeather;