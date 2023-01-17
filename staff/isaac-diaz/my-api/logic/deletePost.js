const context = require("./context")
const { ObjectId } = require('mongodb')

module.exports = function (userId, postId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new Error('postId is empty')

    const { db } = context

    const users = db.collection('users')
    const posts = db.collection('posts')

    return users
        .findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`users with id ${userId} not found`)

            return posts.findOne({ _id: new ObjectId(postId) })
        })
        .then(post => {
            if (!post) throw new Error(`post with id ${postId} not found`)

            if (post.user.toString() !== userId)
                throw new Error(`post with id ${postId} does not belong to user ${userId}`)

            return post.deleteOne({ _id: new ObjectId(postId) })
        })       
}



