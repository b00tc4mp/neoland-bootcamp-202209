import { errors, regex } from 'com'
const { LengthError, FormatError, ConflictError, UnexpectedError } = errors
const { IS_ALPHABETICAL_REGEX } = regex


export default function createVehicle(token, brand, model, fuelType, license, licenseDate, kms) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')

    if (typeof brand !== 'string') throw new TypeError('brand is not a string')
    if (!brand.length) throw new LengthError('brand is empty')

    if (typeof model !== 'string') throw new TypeError('model is not a string')
    if (!model.length) throw new LengthError('model is empty')

    if (typeof fuelType !== 'string') throw new TypeError('fuel type is not a string')
    if (!fuelType.length) throw new LengthError('fuel type is empty')
    if (fuelType !== 'gasolina' && fuelType !== 'diesel') throw new FormatError('fuel type is not diesel or gasolina')
    if (!IS_ALPHABETICAL_REGEX.test(fuelType)) throw new FormatError('fuel type is not alphabetical')

    if (typeof license !== 'string') throw new TypeError('license is not a string')
    if (!license.length) throw new LengthError('license is emmpty')
    if (license.length > 7) throw new FormatError('license not granted')

    if (!(licenseDate instanceof Date)) throw new TypeError('licenseDate is not a date')

    if (!kms && kms !== 0) throw new TypeError('kms is not a number')


    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const { status, responseText: json } = xhr

            if (status === 201) {
                const vehicleId = JSON.parse(json)

                resolve(vehicleId)
            }
            else if (status === 400) {
                const { error } = JSON.parse(json)
                if (error.includes('is not a'))
                    reject(new TypeError(error))
                else if (error.includes('is not alphabetical') || error.includes('not granted'))
                    reject(new FormatError(error))
                else if (error.includes('empty'))
                    reject(new LengthError(error))
                else
                    reject(new Error(error))
            }
            else if (status === 409) {
                const { error } = JSON.parse(json)
                reject(new ConflictError(error))
            } else if (status < 500) {
                reject(new UnexpectedError('client error'))
            } else
                reject(new UnexpectedError('server error'))

        }

        xhr.onerror = () => reject(new Error('connection error'))

        xhr.open('POST', 'http://localhost/vehicles')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { brand, model, fuelType, license, licenseDate, kms }

        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}
