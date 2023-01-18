import { regex, errors } from 'my-commons'

const { IS_EMAIL_REGEX, HAS_SPACES_REGEX } = regex
const { FormatError, AuthError, LengthError, NotFoundError, UnexpectedError } = errors
/**
 * authenticates a user against API
 * 
 * @param {string} email the user email.
 * @param {string} password the user password.
 * @param {callback} callback  the callback to attend the result
 * 
 */
function authenticateUser(email, password, callback) {
    if (typeof email !== 'string') throw new Error('email is not a string')
    if (!IS_EMAIL_REGEX.test(email)) throw new Error('email is not valid')

    if (typeof password !== 'string') throw new Error('password is not a string')
    if (password.length < 8) throw new Error('password length is less than 8')
    if (HAS_SPACES_REGEX.test(password)) throw new Error('password has spaces')

    if (!callback)
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.onload = () => {
                const { status, responseText: json } = xhr

                if (status === 200) {
                    const { token } = JSON.parse(json)

                    resolve(token)
                } else if (status === 400) {
                    const { error } = JSON.parse(json)

                    if (error.includes('is not a'))
                        reject(new TypeError(error))
                    else if (error.includes('valid') || error.includes('spaces'))
                        reject(new FormatError(error))
                    else if (error.includes('length'))
                        reject(new LengthError(error))
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

            xhr.open('POST', 'http://localhost/users/auth')
            xhr.setRequestHeader('Content-Type', 'application/json')

            const payload = { email, password }

            const json = JSON.stringify(payload)

            xhr.send(json)
        })


    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status === 200) {
            const { token } = JSON.parse(json)

            callback(null, token)
        } else if (status === 400) {
            const { error } = JSON.parse(json)
            if (error.includes('is not a'))
                callback(new TypeError(error))
            else if (error.includes('valid' || error.includes('spaces')))
                callback(new FormatError(error))
            else if (error.includes('length'))
                callback(new LengthError(error))
        } else if (status === 401) {
            const { error } = JSON.parse(json)
            callback(new AuthError(error))
        } else if (status === 404) {
            const { error } = JSON.parse(json)
            callback(new NotFoundError(error))
        } else if (status < 500)
            callback(new UnexpectedError('client error'))
        else
            callback(new UnexpectedError('server error'))
    }

    xhr.onerror = () => callback(new Error('connection error'))

    xhr.open('POST', 'http://localhost/users/auth')
    xhr.setRequestHeader('Content-Type', 'application/json')

    const payload = { email, password }

    const json = JSON.stringify(payload)

    xhr.send(json)
}
/**
 * Attends the result of the authentication
 * 
 * @callback callback
 * 
 * @param {Error} error The authentication error
 * @param {string} token The id of the user that authenticated
 */

export default authenticateUser