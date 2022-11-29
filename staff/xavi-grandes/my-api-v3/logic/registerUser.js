const { readFile, writeFile } = require('fs')

function registerUser (name, email, password, callback) {
    if(typeof name !== 'string') throw new TypeError('name is not a string')
    if(!name.length) throw new Error ('name is empty')
    if(typeof email !== 'string') throw new typeError ('email is not a string')
    if(!email.length) throw new Error('email is empty')
    if(typeof password !== 'string') throw new typeError('password is not a string')
    if (!password.length) throw new Error('password is empty')
    if (typeof callback !== 'function') throw new typeError('callback is not a function')

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error){
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const exists = users.some(user => user.email === email)

        if(exists) {
            callback(new Error(`user with email ${email} alredy exists`))
            
            return
        }

        const { id: lastId } = users[users.length -1]
        // const lastUser = users[users.lenght-1]
        // const lastId = lastUser.id

        const newId = `user-${parseInt(lastId.substring(5)) + 1}`
        // lastId "user-6"
        // lastId.substring(5) "6"
        // parseInt("5") 5
        // 5 + 1 = 6
        // `user-${6}`
        // "user-6" 

        const user = { id: newId, name, email, password }

        users.push(user)

        const newJson = JSON.stringify(users, null, 4)

        writeFile ('./data/users.json', newJson, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}

module.exports = registerUser