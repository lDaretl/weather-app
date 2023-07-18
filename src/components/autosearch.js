import clickPin from "../events/clickPin";
import mouseEnterPin from "../events/mouseEnterPin";
import mouseLeavePin from "../events/mouseLeavePin";
import animatePin from "../handlers/animatePin";
import DisplayController from "../tools/DisplayController";
import search from "./search";
import getWeather from "../handlers/getWeather";

const autosearch = () => {
    const element = pinImg

    const getWeatherAuto = async (event) => {
        await getWeather(event)
        DisplayController.hideSearch();
        search()
    }

    const cursorEnter = (event) => {
        clickPin(true, getWeatherAuto)
        animatePin(event)
        mouseEnterPin(false, cursorEnter, element)
        mouseLeavePin(true, cursorLeave, element)
    }

    const cursorLeave = (event) => {
        clickPin(false, getWeatherAuto)
        animatePin(event)
        mouseEnterPin(true, cursorEnter, element)
        mouseLeavePin(false, cursorLeave, element)
    }

    mouseEnterPin(true, cursorEnter, element)
}

export default autosearch;