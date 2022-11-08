function findIndex(array, callback){
    for (var i = 0; i < array.length; i++){
        var element = array[i]
        if (!!callback(element)){
            return i
        }
    }
    return -1
}