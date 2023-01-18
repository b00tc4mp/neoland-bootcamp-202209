const { readFile, writeFile } = require('fs')

function registerUser(name, email, password, callback) {
    /*
    1. input validation
    2. check user exists (or not) in db
    3. save user in db
    4. callback
    */

    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const exists = users.some(user => user.email === email)

        if (exists) {
            callback(new Error(`user with email ${email} already exists`))

            return
        }

        //const lastUser = users[users.length - 1]
        //const lastId = lastUser.id

        const { id: lastId } = users[users.length - 1]

        const newId = `user-${parseInt(lastId.substring(5)) + 1}`

        const user = { id: newId, name, email, password }

        users.push(user)

        const newJson = JSON.stringify(users, null, 4)

        writeFile('./data/users.json', newJson, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}

module.exports = registerUser