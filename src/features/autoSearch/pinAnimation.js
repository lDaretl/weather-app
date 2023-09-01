import { mouseEnterPin, mouseLeavePin } from '../../shared/events';
import animatePin from "../../handlers/animatePin";

export const pinAnimation = () => {
    const cursorEnter = (event) => {
        animatePin(event)
        mouseEnterPin(false, cursorEnter)
        mouseLeavePin(true, cursorLeave)
    }

    const cursorLeave = (event) => {
        animatePin(event)
        mouseEnterPin(true, cursorEnter)
        mouseLeavePin(false, cursorLeave)
    }

    mouseEnterPin(true, cursorEnter)
}