import { errors } from 'com'
import { NotFoundError, UnexpectedError } from 'com/errors'
const { LengthError } = errors

export default function retrieveVehicles(token) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = function () {
            const { status, responseText: json } = xhr

            if (status === 200) {
                const vehicles = JSON.parse(json)

                resolve(vehicles)

            } else if (status === 400) {
                const { error } = JSON.parse(json)

                if (error.includes('is not a'))
                    reject(new TypeError(error))

                else if (error.includes('length'))
                    reject(new LengthError(error))

            } else if (status === 404) {
                const { error } = JSON.parse(json)

                reject(new NotFoundError(error))
            } else if (status < 500) {
                reject(new UnexpectedError('client error'))

            } else
                reject(new UnexpectedError('server error'))

        }

        xhr.open('GET', 'http://localhost/vehicles')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.send()
    })
}
