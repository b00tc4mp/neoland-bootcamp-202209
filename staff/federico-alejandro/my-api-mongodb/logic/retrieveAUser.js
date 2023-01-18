// const { ObjectId } = require('mongodb')
// const context = require('./context')

// /**
//  * Retrieves a user
//  * 
//  * @param {string} userId The user id (requester)
//  * @param {string} targetUserId The target user id to retrieve
//  * 
//  */
// module.exports = function (userId, targetUserId) {
//     if (typeof userId !== 'string') throw new TypeError('userId is not a string')
//     if (!userId.length) throw new Error('userId is empty')
//     if (typeof targetUserId !== 'string') throw new TypeError('targetUserId is not a string')
//     if (!targetUserId.length) throw new Error('targetUserId is empty')

//     const { db } = context

//     const users = db.collection('users')

//     return users.findOne({ _id: ObjectId(userId) })
//         .then(user => {
//             if (!user) throw new Error(`user with id ${userId} does not exist`)

//             return users.findOne({ _id: ObjectId(targetUserId) })
//         })
//         .then(targetUser => {
//             if (!targetUser) throw new Error(`target user with id ${userId} does not exist`)

//             delete targetUser._id
//             delete targetUser.password

//             return targetUser
//         })
// }
const { errors: { LengthError, NotFoundError } } = require('my-commons')
const { User } = require('../models')
/**
 * Retrieves a user
 * 
 * @param {string} userId The user id (requester)
 * @param {string} targetUserId The target user id to retrieve
 * 
 */
module.exports = function (userId, targetUserId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof targetUserId !== 'string') throw new TypeError('targetUserId is not a string')
    if (!targetUserId.length) throw new LengthError('targetUserId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return User.findById(targetUserId).select('-password')
        })
        .then(targetUser => {
            if (!targetUser) throw new NotFoundError(`target user with id ${userId} does not exist`)

            if (!targetUser.id) {
                targetUser.id = targetUser._id.toString()
                delete targetUser._id

            }
            return targetUser
        })
}