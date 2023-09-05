import username from "../../../geonamesUsername";

export const getCitiesByName = async (name) => {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=ru&format=json`);
        if (!response.ok)
            return null;
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export const getCityByCoords = async (coords) => {
    try {
        const response = await fetch(`https://secure.geonames.org/findNearbyPostalCodesJSON?lat=${coords[0]}&lng=${coords[1]}&username=${username}`);
        if (!response.ok)
            return null;
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}