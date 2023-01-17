const { errors: { LengthError, AuthError, NotFoundError } } = require('com')
const { User, Vehicle } = require('../models')

module.exports = function (userId, vehicleId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')

    if (typeof vehicleId !== 'string') throw new TypeError('vehiceId is not a string')
    if (!vehicleId.length) throw new LengthError('vehicleId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return Vehicle.findById(vehicleId).lean()
        })
        .then(vehicle => {
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} does not exist`)

            if (vehicle.user.toString() !== userId) throw new AuthError(`vehicle with id ${vehicleId} does not belong to user with id ${userId}`)
            vehicle.id = vehicle._id.toString()

            delete vehicle._id
            delete vehicle.__v
            delete vehicle.user

            return vehicle
        })
}