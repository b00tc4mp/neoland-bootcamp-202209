// const { ObjectId } = require('mongodb')
// const context = require('./context')
// /**
//  * Delete post from a specific user
//  * 
//  * @param {string} userId The user id
//  * @param {string} postId The post id
//  * 
//  */
// function deletePost(userId, postId) {
//     if (typeof userId !== 'string') throw TypeError('userId is not a string');
//     if (userId.length === 0) throw new Error('userId is empty');
//     if (typeof postId !== 'string') throw TypeError('postId is not a string');
//     if (postId.length === 0 || postId.trim() === '') throw new Error('postId is empty');

//     const { db } = context

//     const users = db.collection('users')
//     const posts = db.collection('posts')

//     return users.findOne({ _id: ObjectId(userId) })
//         .then(user => {
//             if (!user) throw new Error(`user with id ${userId} does not exist`)

//             return posts.findOne({ _id: ObjectId(postId) })
//         })
//         .then(post => {
//             if (!post) throw new Error(`post with id ${postId} does not exist`)

//             if (post.user.toString() !== userId) throw new Error(`post with id ${postId} does not belong to user ${userId}`)
//             return posts.deleteOne({ _id: ObjectId(postId) })
//         })
//         .then(result => {
//             const { acknowledged } = result

//             if (!acknowledged) throw new Error(`could not delete post with id ${postId}`)
//         })
// }
// module.exports = deletePost
const { errors: { LengthError, NotFoundError } } = require('my-commons')
const { User, Post } = require('../models')
/**
 * Delete post from a specific user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 */
function deletePost(userId, postId) {
    if (typeof userId !== 'string') throw TypeError('userId is not a string');
    if (userId.length === 0) throw new LengthError('userId is empty');
    if (typeof postId !== 'string') throw TypeError('postId is not a string');
    if (postId.length === 0 || postId.trim() === '') throw new LengthError('postId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.findById(postId)
        })
        .then(post => {
            if(!postId) throw new NotFoundError(`post with id ${postId} not found`)

            if (post.user.toString() !== userId) throw new Error(`post with id ${postId} does not belong to user ${userId}`)

            return Post.deleteOne({ _id: postId })
        })
}
module.exports = deletePost