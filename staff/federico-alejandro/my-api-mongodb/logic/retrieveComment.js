// const { ObjectId } = require('mongodb')
// const context = require('./context')

// function retrieveComment(userId, targetUserId) {
//     if (typeof userId !== 'string') throw new TypeError('userId is not a string')
//     if (!userId.length) throw new Error('userId is empty')
//     if (typeof targetUserId !== 'string') throw new TypeError('targetUserId is not a string')
//     if (!targetUserId.length) throw new Error('targetUserId is empty')

//     const { db } = context

//     const users = db.collection('users')
//     const comments = db.collection('comments')

//     return users.findOne({ _id: ObjectId(userId) })
//         .then(user => {
//             if (!user) throw new Error(`user with id ${userId} does not exist`)

//             //return users.findOne({ _id: ObjectId(targetUserId) })
//             //return posts.find({ user: ObjectId(userId) }).sort({ date: -1 }).toArray()
//             return comments.find({ user: ObjectId(targetUserId) }).sort({ date: -1 }).toArray()
//         })
//         .then(userComments => {
//             userComments.forEach(userComment => {
//                 delete userComment._id
//             })

//             return userComments
//         })
//         .then(targetUser => {
//             if (!targetUser) throw new Error(`targe user with id ${userId} does not exist`)

//             return comments.find({ user: ObjectId(targetUserId) }).sort({ date: -1 }).toArray()
//         })
// }
// module.exports = retrieveComment