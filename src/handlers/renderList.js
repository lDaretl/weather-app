import DisplayController from "../tools/DisplayController"
import GetData from "../tools/GetData";
import Parser from "../tools/Parser";

const renderList = async (state) => {
    if (state) {
        const citiesData = await ((async function getCitiesData() {
            const city = cityInput.value.trim()
            if (city !== '') {
                const data = await GetData.getCityData(city);
                return data ? data : undefined
            } else {
                return undefined
            }
        })())

        // fill HTML list of cities
        ;(function fillList(data) {
            function clearList() {
                cityList.innerHTML = ''
            }

            if (data) {
                const citiesArray = Parser.parseListOfCities(data)
                const htmlList = citiesArray.map((city, index) => {
                    return `<div class="list__item" id="itemCity${index}">${city[0]}, ${city[1] ? city[1] + ', ' : ''}${city[2]}</div>`
                }).join('')

                if (!(htmlList === cityList.innerHTML)) {
                    clearList()
                    cityList.insertAdjacentHTML("beforeend", htmlList)
                }
            } else {
                clearList()
                if (cityInput.value) {
                    clearList()
                    cityList.insertAdjacentHTML("beforeend", `<div class="list__not-found" id="itemCityX">Город не найден :(</div>`)
                }
            }
        })(citiesData)

        DisplayController.show(cityList)
    } else {
        DisplayController.hide(cityList)
    }
};

export default renderList;