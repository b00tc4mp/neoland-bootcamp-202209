const { readFile, writeFile } = require('fs')

function deletePost(userId, postId, callback) {
    if (typeof userId !== "string") throw TypeError("userId is not a string");
    if (userId.length === 0) throw new Error("userId is empty");
    if (typeof postId !== "string") throw TypeError("postId is not a string");
    if (postId.length === 0 || postId.trim() === "") throw new Error("postId is empty");
    if (typeof callback !== "function") throw new TypeError("callback is not a function");


    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const userExists = users.some((user) => user.id === userId)

        if (!userExists) {
            callback(new Error(`user with id ${userId} does not exist`))

            return
        }

        readFile('./data/posts.json', 'utf8', (error, json) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(json)
        // findeIndex, de los posteos te devuelve el indice del primero que cumplen con esa condicion
        // y lo guardo en postFinded
            const postFinded = posts.findIndex(post => post.id === postId)
        // splice, cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.
        // elimino la posicion postFinded, 1 porque hay un solo elemento en esa posicion
            posts.splice(postFinded, 1)

            const newJson = JSON.stringify(posts, null, 4)

            writeFile('./data/posts.json', newJson, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })

    })
}
module.exports = deletePost
