import { getListOfCities } from "./get"
import { insertCityList } from "./insert"
import { parseListOfCities } from "./parse"

// fill HTML list of cities
export async function fillListOfCities() {
    cityList.innerHTML = '';
    insertCityList(parseListOfCities(await getListOfCities()))
}

//TODO
// Убарть? Юзается один раз