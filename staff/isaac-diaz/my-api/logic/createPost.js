const { ObjectId } = require('mongodb')
const context = require('./context')

function createPost(userId, text, visibility) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')
    if (typeof text !== 'string') throw new TypeErrror('text is not a string')
    if (!text.length) throw new Error('text is empty')
    if (typeof visibility !== 'string') throw new TypeError('visibiity is not a string')
    if (!visibility.length) throw new Error('visibility is empty')
    if (visibility !== 'public' && visibility !== 'private') throw new Error('invalid visibility')

    const { db } = context

    const users = db.collection('users')
    const posts = db.collection('posts')

    return users.findOne({ _id: ObjectId(userId) })
        .then(user => {
            if (!user) 
                throw new Error(`users with id ${userId} does not string`)

                const post = { user: ObjectId(userId), text, visibility, date: new Date }

                return posts.insertOne(post)
            })
            .then(result => {
                const { acknowledged } = result
                if(!acknowledged) throw new Error('could not create post')
             })
        }                     

module.exports = createPost