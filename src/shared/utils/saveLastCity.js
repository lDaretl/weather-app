export const saveLastCity = (cityName) => {
    try {
        if(cityName)
            localStorage.setItem('lastCity', JSON.stringify(cityName))
    } catch (e) {
        console.log(e)
    }
}