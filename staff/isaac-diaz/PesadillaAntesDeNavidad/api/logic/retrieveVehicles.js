const { User, Vehicle } = require('../models')
const { errors: { LengthError, NotFoundError } } = require('com')

module.exports = function (userId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return Vehicle.find({ user: userId }).lean()

        })
        .then(vehicles => {
            vehicles.forEach(vehicle => {
                vehicle.id = vehicle._id.toString()

                delete vehicle._id
                delete vehicle.__v
                delete vehicle.user
            })

            return vehicles
        })   
}