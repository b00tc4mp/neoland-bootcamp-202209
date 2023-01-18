// const { ObjectId } = require('mongodb')
// const context = require('./context')

// /**
//  * Retrieves all public comments (from all users)
//  * 
//  * @param {string} userId The user id
//  * 
//  */
// function retrievePublicComments(userId) {
//     if (typeof userId !== 'string') throw new TypeError('userId is not a string')
//     if (!userId.length) throw new Error('userId is empty')

//     const { db } = context

//     const users = db.collection('users')
//     const comments = db.collection('comments')

//     return users.findOne({ _id: ObjectId(userId) })
//         .then(user => {
//             if (!user) throw new Error(`user with id ${userId} does not exist`)

//             return comments.find({ visibility: 'public' }).sort({ date: -1 }).toArray()
//         })
//         .then(publicComments => {
//             const userFinds = publicComments.map(publicComment => users.findOne({ _id: ObjectId(publicComment.user) }))

//             // return Promise.all(userFinds)
//             //     .then(publicComments => {
//             //         publicComments.forEach((publicComment, index) => {
//             //             const { _id, name } = publicComment[index]

//             //             publicComment.user = { id: _id.toString(), name }

//             //             publicComment.id = publicComment._id.toString()
//             //             delete publicComment._id
//             //         })

//                     return publicComments
//                 //})
//         })
// }

// module.exports = retrievePublicComments


