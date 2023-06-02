import pinStatic from '../../assets/icons/pin-static.gif'
import pin from '../../assets/icons/pin.gif'
const pinImg = document.getElementById('pinImg')
import { getWeatherAuto } from '../tools/get'
import { displayHideFullSearch } from '../tools/display'

// animate & getting weather automaticly by pressing geolocation pin
export function geolocationPin() {
    ['pointerenter', 'pointerout', 'click'].map((action, id) => pinImg.addEventListener(action, event => {
        switch (id) {
            case 0:
                event.target.src = pin;
                break;
            case 1:
                event.target.src = pinStatic;
                break;
            case 2:
                getWeatherAuto();
                displayHideFullSearch();
                break;
        }
    }))
}