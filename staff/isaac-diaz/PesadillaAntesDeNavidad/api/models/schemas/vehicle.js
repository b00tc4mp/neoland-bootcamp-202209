const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

module.exports = new Schema({
    user: {
        type: ObjectId,
        ref: 'Users', 
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true       
    },
    fuelType: {
        type: String,
        enum: ['gasolina', 'diesel'],
        required: true
    },
    license: {
        type: String,
        required: true,
        unique: true
    },
    licenseDate: {
        type: Date,
        required: true
    },
    kms: {
        type: Number,
        required: true
    },
    lastOilCheckDate: {
        type: Date
    },
    lastOilCheckKms: {
        type: Number
    },
    lastItvDate: {
        type: Date
    },
    tyrePressureFront: {
        type: String
    },
    tyrePressureRear: {
        type: String
    }
})