const { errors: { LengthError, FormatError, NotFoundError, UnexpectedError } } = require('com')
const { User, Notice } = require('../models')
/**
 * Retrieves all public posts (from all users)
 * 
 * @param {string} userId The user id
 */
function retrieveNotices(userId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new Error(`user with id ${userId} does not exist`)
   
            
            return Notice.find().sort({ date: -1 }).populate('user', '-email -password -__v').lean()
        })
        .then(notices => {
            notices.forEach(notice => {

                notice.id = notice._id.toString()
                delete notice._id
                delete notice.__v


                if (!notice.user.id) {
                    notice.user.id = notice.user._id.toString()
                    delete notice.user._id
                }
            
            })

            return notices
        })
}

module.exports = retrieveNotices