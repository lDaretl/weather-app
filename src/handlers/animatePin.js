import pinStatic from '../assets/icons/pin-static.gif'
import pin from '../assets/icons/pin.gif'

export default function animatePin (event) {
    if (event.type === "pointerenter") {
        event.target.src = pin;
    } else {
        event.target.src = pinStatic;
    }
}