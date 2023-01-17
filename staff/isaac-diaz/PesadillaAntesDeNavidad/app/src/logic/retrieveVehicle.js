import { errors } from 'com'
const { NotFoundError, UnexpectedError, LengthError, AuthError } = errors

export default function retrieveVehicle(token, vehicleId) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')

    if (typeof vehicleId !== 'string') throw new TypeError('vehicleId is not a string')
    if (!vehicleId.length) throw new LengthError('vehicleId is empty')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = function () {
            const { status, responseText: json } = xhr

            if (status === 200) {
                const vehicle = JSON.parse(json)
                resolve(vehicle)

            } else if (status === 400) {
                const { error } = JSON.parse(json)

                if (error.includes('is not a'))
                    reject(new TypeError(error))

                else if (error.includes('empty'))
                    reject(new LengthError(error))

            } else if (status === 401) {
                const { error } = JSON.parse(json)
                reject(new AuthError(error))

            } else if (status === 404) {
                const { error } = JSON.parse(json)
                reject(new NotFoundError(error))

            } if (status < 500) {
                reject(new UnexpectedError('client error'))
            
            } else 
                reject(new UnexpectedError('server error'))

        }

        xhr.open('GET', `http://localhost/vehicles/${vehicleId}`)
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.send()
    })
}