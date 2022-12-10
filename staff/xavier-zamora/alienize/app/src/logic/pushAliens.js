import { errors } from 'com'
const { FormatError, AuthError, NotFoundError, UnexpectedError } = errors

/**
 * enableSearchGame
 * 
 * @param {token} token The user token
 * @param {gameId} gameId The game id
 */

export default function pushAliens(token, gameId) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new FormatError('token is empty')
    if(typeof gameId !== 'string') throw new TypeError('gameId is not string')

    return new Promise((resolve, reject) => {
        
        const xhr = new XMLHttpRequest()
        
        xhr.onload = function () {
            const { status, responseText: json } = xhr

            if (status === 200) {
                const game = JSON.parse(json)
                resolve(game)
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
            else
                reject(new UnexpectedError('server error'))
        }
        xhr.onerror = () => reject(new Error('connection error'))

        xhr.open('POST', 'http://localhost:2000/pushAliens/${gameId}')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        const payload = {gameId}

        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}