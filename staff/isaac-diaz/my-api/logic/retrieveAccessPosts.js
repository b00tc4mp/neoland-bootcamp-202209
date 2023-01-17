const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function (userId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')

    const { db } = context

    const users = db.collection('users')
    const posts = db.collection('posts')

    return users.findOne({ _id: ObjectId(userId) })
        .then(user => {
            if (!user)
                throw new Error(`user with id ${userId} does not exist`)

            return posts.find({ visibility: 'public' }).sort({ date: -1 }).toArray()
        })
        .then(publicPost => {
            const userFinds = publicPost.map(publicPost => users.findOne({ _id: ObjectId(publicPost.user) }))

            return Promise.all(userFinds)
                .then(publicPostUsers => {
                    publicPost.forEach((publicPost, index) => {
                        const { _id, name } = publicPostUsers[index]

                        publicPost.user = { id: _id.toString(), name }

                        publicPost.id = publicPost._id.toString()
                        delete publicPost._id
                    })

                    return publicPost
                })
        })
}


            // TODO const postsToReturn = posts.filter(post => {
            //     if (post.user === userId || post.visibility === 'public') {
            //         delete post.visibility


