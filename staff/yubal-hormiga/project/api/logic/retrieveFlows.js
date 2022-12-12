const { errors: { FormatError, NotFoundError } } = require('../../my-commons')
const { User, Flow } = require('../models')

/**
 * Retrieves a flow from user
 * 
 * 
 * @param {string} userId The user id
 * @param {string} flowId The flow id

 */
module.exports = function (userId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new FormatError('userId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Flow.find({ user: userId }).select('-user -__v').lean()
        })
        .then(flows => {
            flows.forEach(flow => {
                flow.id = flow._id.toString()

                delete flow._id
            })

            return flows
        })
}