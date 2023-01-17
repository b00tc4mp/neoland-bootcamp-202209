const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function (userId, postId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new Error('postId is empty') 

    const { db } = context

    const users = db.collection('users')

    const posts = db.collection('posts')

    return users.findOne({ _id: ObjectId(userId) })
        .then(user => {
            if(!user) throw new Error(`user with id ${userId} does not exist`)

            return posts.findOne({ _id: ObjectId(postId) })
        })
        .then(post => {
            if(!post) throw new Error(`post with id ${postId} does not exist`)

            delete post._id
            delete post.user
            delete post.date

            return post
        })    
}
