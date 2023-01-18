const { readFile } = require('fs')


function retrieveMyUserProfile(userId, callback) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        // elimino datos que no quiero mostrar
        delete user.password
        delete user.id

        callback(null, user)
    })
}

module.exports = retrieveMyUserProfile