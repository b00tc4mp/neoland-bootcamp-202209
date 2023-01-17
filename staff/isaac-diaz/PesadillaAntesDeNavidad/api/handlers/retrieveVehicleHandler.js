const { errors: { NotFoundError, AuthError, LengthError } } = require('com')
const retrieveVehicle = require('../logic/retrieveVehicle')

module.exports = (req, res) => {
    try {
        const { params: { vehicleId }, userId } = req

        retrieveVehicle(userId, vehicleId)
            .then(vehicle => res.json(vehicle))
            .catch(error => {
                if (error instanceof NotFoundError || error instanceof AuthError)
                    res.status(404).json({ error: error.message })
                else
                    res.status(500).json({ error: error.message })
            })
    } catch (error) {
        if (error instanceof TypeError || error instanceof LengthError)
            res.status(400).json({ error: error.message })
        else
            res.status(500).json({ error: error.message })
    }
}