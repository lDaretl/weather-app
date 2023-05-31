export function addSign(num) {
    return num > 0 ? '+' + num : num
}

export function roundNum(prop) {
    return Math.round(Number(prop))
}