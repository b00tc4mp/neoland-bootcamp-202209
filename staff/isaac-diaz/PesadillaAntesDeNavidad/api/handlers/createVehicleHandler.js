const createVehicle = require('../logic/createVehicle')
const { 
    errors: {
        LengthError, FormatError, NotFoundError, ConflictError
    }
} = require('com')

module.exports = (req, res) => {
    try {
        const { body: { brand, model, fuelType, license, licenseDate, kms }, userId } = req

        createVehicle(userId, brand, model, fuelType, license, new Date(licenseDate), kms)
            .then(vehicleId => res.status(201).json(vehicleId))
            .catch(error => {
                if (error instanceof NotFoundError)
                    res.status(404).json({ error: error.message })
                else if (error instanceof ConflictError)
                    res.status(409).json({ error: error.message })
                else
                    res.status(500).json({ error: error.message })
            })
    } catch (error) {
        if (error instanceof TypeError || error instanceof LengthError || error instanceof FormatError)
            res.status(400).json({ error: error.message })
        else
            res.status(500).json({ error: error.message })
    }
}