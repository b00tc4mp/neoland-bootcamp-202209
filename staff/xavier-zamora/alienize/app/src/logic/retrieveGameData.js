import { errors } from 'com'

const { FormatError, NotFoundError, UnexpectedError, AuthError } = errors

/**
 * @param {token} token The user token
 */


export default function retrieveGameData(token) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new FormatError('token is empty')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        
        xhr.onload = function () {

            const { status, responseText: json } = xhr

            if (status === 200) {
                const gameId = JSON.parse(json)
                resolve(gameId)
            } else if (status === 400) {
                const { error } = JSON.parse(json)

                if (error.includes('is not a'))
                    reject(new TypeError(error))
                else if (error.includes('empty'))
                    reject(new FormatError(error))
            } else if (status === 401) {
                const { error } = JSON.parse(json)

                reject(new AuthError(error))
            } else if (status === 404) {
                const { error } = JSON.parse(json)

                reject(new NotFoundError(error))
            } else if (status < 500)
                reject(new UnexpectedError('client error'))
        }

        xhr.open('POST', 'http://localhost:2000/GameData')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        const payload = token.toString()
        const json = JSON.stringify(payload)
        xhr.send(json)
    })
}