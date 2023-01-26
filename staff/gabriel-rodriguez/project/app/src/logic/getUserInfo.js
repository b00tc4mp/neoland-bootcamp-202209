
import { regex, errors } from 'com'
const { FormatError, AuthError, LengthError, NotFoundError, UnexpectedError } = errors

/**
 * Get info about user
 * 
 * @param {int} id The user id
 */
export default function getUserInfo(id) {
    
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const { status, responseText: json } = xhr

            if (status === 200) {
                const { token } = JSON.parse(json)

                resolve(token)
            } else if (status === 400) {
                const { error } = JSON.parse(json)

                
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


        xhr.open('GET', 'http://localhost:3001/users/info')
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { id }

        const json = JSON.stringify(payload)
        console.log(json)
        xhr.send(json)
    })
}