// const { ObjectId } = require('mongodb')
// const context = require('./context')

// /**
//  * Retrieves all public posts (from all users)
//  * 
//  * @param {string} userId The user id
//  */
// function retrievePublicPosts(userId) {
//     if (typeof userId !== 'string') throw new TypeError('userId is not a string')
//     if (!userId.length) throw new Error('userId is empty')

//     const { db } = context

//     const users = db.collection('users')
//     const posts = db.collection('posts')

//     return users.findOne({ _id: ObjectId(userId) })
//         .then(user => {
//             if (!user)
//                 throw new Error(`user with id ${userId} does not exist`)


//             return posts.find({ visibility: 'public' }).sort({ date: -1 }).toArray()
//         })
//         .then(publicPosts => {
//             const userFinds = publicPosts.map(publicPost => users.findOne({ _id: ObjectId(publicPost.user) }))

//             return Promise.all(userFinds)
//                 .then(publicPostUsers => {
//                     publicPosts.forEach((publicPost, index) => {
//                         const { _id, name } = publicPostUsers[index]
                       

//                         publicPost.user = { id: _id.toString(), name }

//                         publicPost.id = publicPost._id.toString()
//                         delete publicPost._id
//                     })

//                     return publicPosts
//                 })
//         })
// }

// module.exports = retrievePublicPosts
const { errors: { LengthError } } = require('my-commons')
const { User, Post } = require('../models')

/**
 * Retrieves all public posts (from all users)
 * 
 * @param {string} userId The user id
 */
function retrievePublicPosts(userId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')

    return User.findById(userId)
    .then(user => {
        if(!user)
        throw new Error(`user with id ${userId} does not exist`)

        return Post.find({visibility: 'public'}).sort({ date: -1}).populate('user', '-email -password').select('-__v').lean()
    })
    .then(posts => {
        posts.forEach(post => {
            post.id = post._id.toString()
            delete post._id

            if(!post.user.id) {
                post.user.id = post.user._id.toString()
                delete post.user._id
            }
        })
            return posts
    })
}
module.exports = retrievePublicPosts
