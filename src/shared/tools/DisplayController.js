export default class DisplayController {
    static hide(idEl) {
        idEl.classList.add('hide')
    }

    static show(idEl) {
        idEl.classList.remove('hide')
    }

    static showSearch() {
        this.hide(cityName);
        this.show(cityInput);
        cityInput.focus()
    }

    static hideSearch() {
        cityInput.focus()
        this.hide(cityInput);
        this.show(cityName);
    }
}