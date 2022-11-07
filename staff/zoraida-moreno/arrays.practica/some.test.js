// Descripción:
// va a verificar si en el array hay algun
// elemento que cumpla con la condicion que le he pasado.

// parametros de entrada:
// primer parametro sera array y sera de tipo array
// segundo parametro sera callback y sera de tipo funcion

// valor de retorno: 
// devuelve un booleano (true o false)


//CASE returns true for array [12, 20, 34, 15] when comparate element === 20
var numbers = [ 12, 20, 34, 15]

var isEqual = function(currentValue){ //callback
   return currentValue === 20
}

var res = some(numbers, isEqual)

console.assert(res === true)

// CASE returns true for array [10, 20, 30, 40, 50] when comparate element === 30

// var a = [10, 20, 30, 40, 50]

// var res = some(a, function(element) {
//  return element === 30
// }) 

// console.assert(res === true)

// // CASE returns false for array [10, 20, 30, 40, 50] when comparate element === 5

// var a = [10, 20, 30, 40, 50]

// var res = some(a, function(element) {
//  return element === 5
// }) 

// console.assert(res === false)




