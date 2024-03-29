import DisplayController from "../shared/tools/DisplayController";

const renderSearch = (state) => {
    if (state) {
        DisplayController.showSearch()
    } else if (cityInput.dataset.city) {
        DisplayController.hideSearch();
    }
};

export default renderSearch;