// CASE: The elements of the arrays are bellow a thershold of 30
// const isBelowThreshold = (currentValue) => currentValue < 30;

const arrayEvery = [1, 30, 39, 29, 10, 13];
const callback = function meetsTheCondition(element){
    return element > 30
}

const resultEvery = every(arrayEvery, callback)

console.assert(resultEvery[0] === 39)