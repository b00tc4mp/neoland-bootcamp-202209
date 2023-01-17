const { errors: { LengthError, NotFoundError } } = require('com')
const { User, Vehicle } = require('../models')

module.exports = function (userId, vehicleId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')   
    if (typeof vehicleId !== 'string') throw new TypeError('vehicleId is not a string')
    if (!vehicleId.length) throw new LengthError('vehicleId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} not found`)

                return Vehicle.findById(vehicleId).lean()
        })
        .then(vehicle => {
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)

            if(vehicle.user.toString() !== userId)
                throw new Error(`vehicle with id ${vehicleId} does not belong to user ${userId}`)

            return Vehicle.deleteOne({ _id: vehicleId })
        })        
}