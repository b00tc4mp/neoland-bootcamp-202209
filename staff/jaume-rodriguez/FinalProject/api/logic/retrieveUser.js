const { User } = require('../models')
const {
    errors: { NotFoundError },
    validators: { validateUserId }
} = require('com')

function retrieveUser(userId) {
    validateUserId(userId)

    return User.findById(userId)
        .select('-password')
        .populate('questsPlayed')
        .populate('adventuresPlayed')
        .lean()
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)
            user.level = Math.floor(Math.log2(user.combatPoints / 25)) + 1

            // sanitize
            user.id = user._id.toString()

            delete user._id

            return user
        })
}

module.exports = retrieveUser