import { clickPin } from "../../shared/events";
import { pinAnimation } from "./pinAnimation";
import DisplayController from "../../shared/tools/DisplayController";
import getWeather from "../../handlers/getWeather";
import {defineCity} from "./defineCity";
import { saveLastCity } from "../../shared/utils";

export const autoSearch = () => {
    const getWeatherAuto = async () => {
        const city = await defineCity()
        saveLastCity(city)
        await getWeather(city)
        DisplayController.hideSearch();
    }

    clickPin(getWeatherAuto)
    pinAnimation()
}