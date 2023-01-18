const context = require('./context')
const { ObjectId } = require('mongodb') // triago de mongodb el ObjectId

/**
 * Retrieve user 
 * 
 * @param {string} userId The user id
 * 
 */
function retrieveUser(userId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')

    const { db } = context

    const users = db.collection('users')

    return users.findOne({ _id: ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            delete user.password
            delete user._id

            return user
        })
}

module.exports = retrieveUser
// const { errors: { NotFoundError } } = require('com')
// const { User } = require('../models')

// function retrieveUser(userId) {
//     if (typeof userId !== 'string') throw new TypeError('userId is not a string')
//     if (!userId.length) throw new LengthError('userId is empty')

//     return User.findById(userId).select('-password').lean()
//         .then(user => {
//             if (!user)
//                 throw new NotFoundError(`user with id ${userId} does not exist`)

//             // sanitize
//             user.id = user._id.toString()

//             delete user._id

//             return user
//         })
// }

// module.exports = retrieveUser