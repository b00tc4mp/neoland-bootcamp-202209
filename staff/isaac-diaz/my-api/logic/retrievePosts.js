const { ObjectId } = require('mongodb')
const context = require ('./context')

module.exports = function(userId) {
    if(typeof userId !== 'string') throw new TypeError('userId is not a string')
    if(!userId.length) throw new Error('userId is empty')

    const { db } = context

    const users = db.collection('users')
    const posts = db.collection('posts')

    return users.findOne({ _id: ObjectId(userId) })
        .then(user => {
            if(!user) throw new Error(`user with id ${userId} does not exist`)

            return posts.find({ user: ObjectId(userId) })
        })
}