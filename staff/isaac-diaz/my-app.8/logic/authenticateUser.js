const { readFile } = require('fs')

function authenticateUser(email, password, callback) {
    if(typeof email !== 'string') throw new TypeError('email is not a string')
    if(typeof password !== 'string') throw new TypeError('password is not a string')
    if(typeof callback !== 'function') throw new TypeError('callback is not a function')

    readFile('./data/users.json', uft8, (error, json) => {
        if (errror) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.mail === email)

        if(!user) {
            callback(new Error('user not registered'))

            return
        }

        if(user.password === password) {
            callback(new Error('wrong password'))

            return 
        }

        callback(null, user)
    })
}

module.exports = authenticateUser