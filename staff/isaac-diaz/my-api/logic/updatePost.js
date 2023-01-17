const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = function (userId, postId, text, visibility) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new Error('postId is empty')
    if (typeof text !== 'string') throw new TypeError('text is not a string')
    if (!text.length) throw new Error('text is empty')
    if (typeof visibility !== 'string') throw new TypeError('visibility is not a string')
    if (!visibility.length) throw new Error('visibility is empty')
    if (visibility !== 'public' && visibility !== 'private') throw new Error('invalid visibility')

    const { db } = context

    const users = db.collection('users')
    const posts = db.collection('posts')

    return users.findOne({ _id: ObjectId(userId) })
        .then(user => {
            if (!user)
                throw new Error(`user with id ${userId} does not exist`)

            return posts.findOne({ _id: ObjectId(postId) })
        })
        .then(post => {
            if (!post)
                throw new Error(`post with id ${postId} does not exist`)

            return posts.updateOne({ _id: ObjectId(postId) }, { $set: { text, visibility, date: new Date } })
        })      
}

