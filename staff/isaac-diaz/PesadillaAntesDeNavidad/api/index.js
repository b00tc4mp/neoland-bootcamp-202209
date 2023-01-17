require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

const authenticateUserHandler = require('./handlers/authenticateUserHandler')
const registerUserHandler = require('./handlers/registerUserHandler')
const retrieveUserHandler = require('./handlers/retrieveUserHandler')
const createVehicleHandler = require('./handlers/createVehicleHandler')
const retrieveVehicleHandler = require('./handlers/retrieveVehicleHandler')
const retrieveVehiclesHandler = require('./handlers/retrieveVehiclesHandler')
const updateVehicleHandler = require('./handlers/updateVehicleHandler')
const deleteVehicleHandler = require('./handlers/deleteVehicleHandler')


const jsonBodyParser = require('./utils/jsonBodyParser')
const cors = require('./utils/cors')
const jwtVerifier = require('./utils/jwtVerifier')

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`db connected to ${MONGODB_URL}`)

        const api = express()

        api.use(cors)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)
        api.post('/users', jsonBodyParser, registerUserHandler)
        api.get('/users', jwtVerifier, retrieveUserHandler)
        api.post('/vehicles', jwtVerifier, jsonBodyParser, createVehicleHandler)
        api.get('/vehicles/:vehicleId', jwtVerifier, retrieveVehicleHandler)  
        api.get('/vehicles', jwtVerifier, retrieveVehiclesHandler)
        api.patch('/vehicles/:vehicleId', jwtVerifier, jsonBodyParser, updateVehicleHandler)
        api.delete('/vehicles/:vehicleId', jwtVerifier, deleteVehicleHandler)

        const { PORT } = process.env

        api.listen(PORT, () => console.log(`server listening on port ${PORT}`))
    })
    .catch(error => console.error(error))