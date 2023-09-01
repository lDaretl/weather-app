import DisplayController from "../shared/tools/DisplayController"
import { DataProvider } from "../shared/providers";
import Parser from "../shared/tools/Parser";

const renderList = async (state) => {
    if (state) {
        const citiesData = await (async function getCitiesData() {
            const city = cityInput.value.trim()
            if (city !== '') {
                const data = await DataProvider.getCitiesData(city);
                return data ? data : null
            } else {
                return null
            }
        })()

        // fill HTML list of cities
        ;(function fillList(data) {
            function clearList() {
                cityList.innerHTML = ''
            }

            if (data) {
                const citiesArray = Parser.parseListOfCities(data)
                const htmlList = citiesArray.map((city, index) => {
                    console.log(city)
                    return `<p data-id="${index}" class="cities-list__item" id="itemCity${index}">${city[0]}${ city[1] ? ', ' + city[1] : ''}</p>`
                }).join('')

                if (!(htmlList === cityList.innerHTML)) {
                    clearList()
                    cityList.insertAdjacentHTML("beforeend", htmlList)
                }
            } else {
                clearList()
                if (cityInput.value) {
                    clearList()
                    cityList.insertAdjacentHTML("beforeend", `<p class="list__not-found" id="itemCityX">Город не найден</p>`)
                }
            }
        })(citiesData)

        DisplayController.show(cityList)
    } else {
        DisplayController.hide(cityList)
    }
};

export default renderList;