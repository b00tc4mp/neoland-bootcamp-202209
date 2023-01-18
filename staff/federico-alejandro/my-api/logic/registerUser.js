const { readFile, writeFile } = require('fs')

function registerUser(name, email, password, callback) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (!name.length) throw new Error('name is empty')
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (!email.length) throw new Error('email is empty')
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (!password.length) throw new Error('password is empty')
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