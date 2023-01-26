const { errors: { FormatError } } = require('com')
const { User } = require('../models')

function infoUser(userId) {
    // if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    // if (!userId.length) throw new FormatError('userId is empty')

    return User.findById(userId)
        .then(user => {
            let test = {};
            // if (!user)
            //     throw new NotFoundError(`${userId} does not exist`)

            // // sanitize
            // user.id = user._id.toString()
            test.name = user.name
            test.email = user.email
           
           
            // console.log(user)
            return test
        })
}

module.exports = infoUser