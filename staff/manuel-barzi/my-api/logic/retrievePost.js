const { errors: { FormatError, NotFoundError } } = require('my-commons')
const { User, Post } = require('../models')

/**
 * Retrieves a post from user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id

 */
module.exports = function (userId, postId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new FormatError('userId is empty')
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new FormatError('postId is empty')

    return User.findById(userId) // .findOne({ _id: ... })
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.findById(postId).lean()
        })
        .then(post => {
            if (!post)
                throw new NotFoundError(`post with id ${postId} does not exist`)

            delete post._id
            delete post.user
            delete post.date

            return post
        })
}