export function insertCityList(arrData) {
    if(arrData){
        return arrData.map((value, index) => {
            cityList.insertAdjacentHTML("beforeend", `<div class="list__item" id="itemCity${index}">${value[0]}, ${value[1] ? value[1] + ', ' : ''}${value[2]}</div>`)
        })
    }    
}

//TODO
// Убарть? Юзается пару раз