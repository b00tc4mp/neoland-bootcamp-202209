// CASE 1 returns 10 for the array [1, 2, 3, 4]
// as the result of the conditionated callback function

var reArray1 = [1, 2, 3, 4];

var reCondition1 = (acomulado, element) => { return acomulado + element }

var result = reduce(reArray1, reCondition1, 0)

// CASE 1.2 returns hola for the array ['l', 'a', 'o', 'h']
// as the result of the conditionated callback function

var reArray2 = ['o', 'l', 'a', 'h'];

var reCondition2 = (acomulado, element) => {
    if (element === 'h') {
        return 'h' + acomulado
    } else {
        return acomulado + element
    }
}

var result = reduce(reArray2, reCondition2, '')

// CASE 1.3 returns [0, 1, 2, 3, 4, 5] for the array [[0, 1], [2, 3], [4, 5]]
// as the result of the conditionated callback function

var reArray3 = [[0, 1], [2, 3], [4, 5]];

var reCondition3 = (acomulado, element) => {
    return acomulado.concat(element)
}

var result = reduce(reArray3, reCondition3)