// const { ObjectId } = require('mongodb')
// const context = require('./context')

// /**
//  * Retrieves all posts from user (private and public)
//  * 
//  * @param {string} userId The user id
//  * 
//  */
// function retrievePostsUser(userId) {
//     if (typeof userId !== 'string') throw new TypeError('userId is not a string')
//     if (!userId.length) throw new Error('userId is empty')

//     const { db } = context

//     const users = db.collection('users')
//     const posts = db.collection('posts')

//     return users.findOne({ _id: ObjectId(userId) })
//         .then(user => {
//             if (!user) throw new Error(`user with id ${userId} does not exist`)

//             return posts.find({ user: ObjectId(userId) }).sort({ date: -1 }).toArray()
//         })
//         .then(userPosts => {
//             userPosts.forEach(userPost => {
//                 userPost.id = userPost._id.toString()
//                 delete userPost._id
//                 delete userPost.user
//             })
//             return userPosts
//         })
// }

// module.exports = retrievePostsUser
const { errors: { LengthError, NotFoundError } } = require('my-commons')
const { User, Post } = require('../models')
/**
 * Retrieves all posts from user (private and public)
 * 
 * @param {string} userId The user id
 * 
 */
 function retrievePostsUser(userId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')

    return User.findById(userId).select('-password').lean()
    .then(user => {
        if (!user)
            throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.find({user: userId}).sort({ date: -1 }).lean()

    })
}
module.exports = retrievePostsUser