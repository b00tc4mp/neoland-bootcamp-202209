const { model } = require('mongoose')
const { user, vehicle } = require('./schemas')

const User = model('User', user)
const Vehicle = model('Vehicle', vehicle)

module.exports = {
    User,
    Vehicle
}