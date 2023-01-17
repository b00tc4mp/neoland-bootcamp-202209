const { readFile } = require('fs')

function retrieveUser(userId, callback) {
    if(typeof userId !== 'string') throw new Error('userId is not a string')
    if(typeof callback !== 'function') throw new Error('callback is not a function')

    readFile('./data/users.json', 'uft8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if(!user) {
            callback(new Error('user not registered'))

            return
        }

        callback(null, user)
    })
}

module.exports = retrieveUser