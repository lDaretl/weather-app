import { parseListOfCities } from "../tools/parse.js"
import { CardsData } from '../classes/CardsData';
import { parseFullCityName, parseTimezone } from "./parse";
import { fetchWeather } from "./fetch.js"
import { getListOfCities } from "./get.js";

// fill HTML list of cities
export async function fillListOfCities() {
    cityList.innerHTML = ''
    ;(function insertCityList(arrData) {
        if(arrData){
            return arrData.map((value, index) => {
                cityList.insertAdjacentHTML("beforeend", `<div class="list__item" id="itemCity${index}">${value[0]}, ${value[1] ? value[1] + ', ' : ''}${value[2]}</div>`)
            })
        }    
    })(parseListOfCities(await getListOfCities()))
}

//fill weather cards
export async function fillWeatherCards(dataRaw) {
    const data = await fetchWeather(dataRaw)
    console.log(data)
    const cardsData = new CardsData(data, parseFullCityName(dataRaw))
    cardsData.getDataAllCards()
    cardsData.fillAllCards()
}