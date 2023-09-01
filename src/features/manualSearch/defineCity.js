import {DataProvider} from "../../shared/providers";

export const defineCity = async (event) => {
    const getCity = new Promise((resolve) => {
            if (event.type === 'click') {
                const city = cityInput.value.trim()
                resolve(city)
            }

            if (event.type === 'submit') {
                const city = itemCity0.innerText
                resolve(city)
            }
        }
    )

    return getCity
        .then(async city => {
            return (async (city) => {
                if (city) {
                    const data = await DataProvider.getCitiesData(city);
                    return data ?? null
                }
                return null
            })(city)
        })
        .then(list => {
            const id = event.target.dataset.id
            return list[id]
        })
}