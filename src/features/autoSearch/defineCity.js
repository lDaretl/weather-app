import { DataProvider } from "../../shared/providers";
import Parser from "../../shared/tools/Parser";

export const defineCity = async () => {
    const getCity = new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(async position => {
                const coords = Parser.parseCoords(position)
                const nameCity = await DataProvider.getCityName(coords);
                const city = nameCity[0]
                cityInput.dataset.city = city
                cityInput.value = city
                resolve(city)
            })
        }
    )

    return getCity
        .then(async city => {
            const list = await (async (city) => {
                if (city) {
                    const data = await DataProvider.getCitiesData(city);
                    return data ? data : null
                }
                return null
            })(city)
            return list[0]
        })
}