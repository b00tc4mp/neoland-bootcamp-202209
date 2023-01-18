// const { ObjectId } = require('mongodb')
// const context = require('./context')

// /**
//  * Retrieves a post from user
//  * 
//  * @param {string} userId The user id
//  * @param {string} postId The post id
//  * 
//  */
// module.exports = function (userId, postId) {
//     if (typeof userId !== 'string') throw new TypeError('userId is not a string')
//     if (!userId.length) throw new Error('userId is empty')
//     if (typeof postId !== 'string') throw new TypeError('postId is not a string')
//     if (!postId.length) throw new Error('postId is empty')

//     const { db } = context

//     const users = db.collection('users')
//     const posts = db.collection('posts')

//     return users.findOne({ _id: new ObjectId(userId) })
//         .then(user => {
//             if (!user) throw new Error(`user with id ${userId} does not exist`)

//             return posts.findOne({ _id: ObjectId(postId) })
//         })
//         .then(post => {
//             if (!post) throw new Error(`post with id ${postId} does not exist`)

//             delete post._id
//             delete post.date
//             delete post.user

//             return post
//         })
// }
const { errors: { LengthError, NotFoundError } } = require('my-commons')
const { User, Post } = require('../models')
/**
 * Retrieves a post from user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 */

module.exports = function (userId, postId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new LengthError('postId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.findById(postId).lean()
        })
        .then(post => {
            if (!post) throw new NotFoundError(`post with id ${postId} does not exist`)

            delete post._id
            delete post.date
            delete post.user

            return post
        })
}