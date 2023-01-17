const {
    errors: {
        LengthError, FormatError, NotFoundError, ConflictError, UnexpectedError
    },
    regex: {
        IS_ALPHABETICAL_REGEX
    }
} = require('com')
const { User, Vehicle } = require('../models')

function createVehicle(userId, brand, model, fuelType, license, licenseDate, kms) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')

    if (typeof brand !== 'string') throw new TypeError('brand is not a string')
    if (!brand.length) throw new LengthError('brand is empty')

    if (typeof model !== 'string') throw new TypeError('model is not a string')
    if (!model.length) throw new LengthError('model is empty')

    if (typeof fuelType !== 'string') throw new TypeError('fuel type is not a string')
    if (!fuelType.length) throw new LengthError('fuel type is empty')
    if (fuelType !== 'gasolina' && fuelType !== 'diesel') throw new FormatError('fuel type is not diesel or gasolina')
    if (!IS_ALPHABETICAL_REGEX.test(fuelType)) throw new FormatError('fuel type is not alphabetical')

    if (typeof license !== 'string') throw new TypeError('license is not a string')
    if (!license.length) throw new TypeError('license is empty')
    if (license.length > 7) throw new FormatError('license not granted')

    if (!(licenseDate instanceof Date)) throw new TypeError('licenseDate is not a date')

    if (typeof kms !== 'number') throw new TypeError('kms is not a number')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} not found`)

            const vehicle = { user: userId, brand, model, fuelType, license, licenseDate, kms }
            //TODO licenseDate need arrive date format...
            return Vehicle.create(vehicle)
                .then(vehicle => vehicle._id.toString())
                .catch(error => {
                    if (error.message.includes('E11000'))
                        throw new ConflictError(`vehicle with license ${license} already exist`)

                    throw new UnexpectedError(error.message)
                })
        })
}

module.exports = createVehicle