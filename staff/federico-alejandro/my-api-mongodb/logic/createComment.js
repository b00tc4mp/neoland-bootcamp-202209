// const { ObjectId } = require('mongodb')
// const context = require('./context')
// /**
//  * Update users posts 
//  * 
//  * @param {string} userId The user id
//  * @param {string} postId The user id
//  * @param {string} text The user text
//  * 
//  */
// function createComment(userId, postId, commentId, text) {
//     if (typeof userId !== "string") throw TypeError("userId is not a string")
//     if (userId.length === 0) throw new Error("userId is empty")
//     if (typeof text !== "string") throw TypeError("text is not a string")
//     if (text.length === 0 || text.trim() === "") throw new Error("text is empty")

//     const {db} = context

//     const users = db.collection('users')
//     const posts = db.collection('posts')
//     const comments = db.collection ('comments')

//     return users.findOne({ _id: ObjectId(userId)})
//     .then(user => {
//         if(!user) throw new Error(`user with id ${userId}does not exist`)
//         //return comments.find({ user: ObjectId(postId) })
//         const comment = { post: ObjectId(postId), text, date: new Date }

//         return comments.insertOne(comment)
//     })
//     return posts.findOne({ _id: ObjectId(postId)})
//     // .then(post => {
//     //     if(!post)
//     //     throw new Error(`post with id ${postId} does not exist`)


        
//         // const comment = { user: ObjectId(userId), text, date: new Date } 
    
//         //  return comments.insertOne(comment)
//     // })
//     .then(result => {
//         const { acknowledged } = result

//         if(!acknowledged) throw new Error('could not create comment')
//     })
// }
// module.exports = createComment