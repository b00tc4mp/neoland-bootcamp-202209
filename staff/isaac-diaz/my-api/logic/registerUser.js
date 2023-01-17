const context = require('./context')

function registerUser(name, email, password) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    
    const { db } = context

    const users = db.collection('users')

    return users.findOne({ email })
        .then(user => {
            if(user) throw new Error(`user with email ${email} already exist`)

            return users.insertOne({ name, email, password })
        })
        .then(result => {
            const { acknowledged } = result
            if(!acknowledged) throw new Error('could not create user')
        })
    }

    module.exports = registerUser

        