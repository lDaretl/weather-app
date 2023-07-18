export default class DisplayController {

    // hide element 
    static hide(idEl) {
        idEl.classList.add('hide')
    }

    // show element
    static show(idEl) {
        idEl.classList.remove('hide')
    }

    // show search
    static showSearch() {
        this.hide(cityName);
        this.show(cityInput);
        cityInput.focus()
    }

    // show search & list of cities
    // static showFullSearch() {
    //     this.displayShowSearch()
    //     this.displayShow(cityList)
    // }

    // hide search
    static hideSearch() {
        cityInput.focus()
        this.hide(cityInput);
        this.show(cityName);
    }

    // hide search & list of cities
    // static displayHideFullSearch() {
    //     this.hideSearch()
    //     this.hide(cityList)
    // }

}