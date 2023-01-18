// const { ObjectId } = require('mongodb')
// const context = require('./context')
// /**
//  * Create post 
//  * 
//  * @param {string} userId The user id
//  * @param {string} text The user text
//  * @param {string} visibility The text visibility 
//  * 
//  */
// function createPost(userId, text, visibility) {
//     if (typeof userId !== "string") throw TypeError("userId is not a string");
//     if (userId.length === 0) throw new Error("userId is empty");
//     if (typeof text !== "string") throw TypeError("text is not a string");
//     if (text.length === 0 || text.trim() === "") throw new Error("text is empty");
//     if (typeof visibility !== "string") throw TypeError("visibility is not a string");
//     if (visibility !== "public" && visibility !== "private") throw new Error('invalid visibility');

//     const { db } = context

//     const users = db.collection('users')
//     const posts = db.collection('posts')

//     return users.findOne({ _id: ObjectId(userId) })
//         .then(user => {
//             if (!user) throw new Error(`user with id ${userId} does not exist`)

//             const post = { user: ObjectId(userId), text, visibility, date: new Date }

//             return posts.insertOne(post)
//         })
//         .then(result => {
//             const { acknowledged } = result

//             if (!acknowledged) throw new Error('could not create post')
//         })
// }
// module.exports = createPost
const { errors: { LengthError, FormatError, NotFoundError } } = require('my-commons')
const { User, Post } = require('../models')

function createPost(userId, text, visibility) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof text !== 'string') throw new TypeError('text is not a string')
    if (!text.length) throw new LengthError('text is empty')
    if (typeof visibility !== 'string') throw new TypeError('visibility is not a string')
    if (!visibility.length) throw new LengthError('visibility is empty')
    if (visibility !== 'public' && visibility !== 'private') throw new FormatError('invalid visibility')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.create({ user: userId, text, visibility, date: new Date })
        })
}

module.exports = createPost

