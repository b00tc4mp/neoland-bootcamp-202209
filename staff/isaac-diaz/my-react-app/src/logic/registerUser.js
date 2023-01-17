import { IS_EMAIL_REGEX, HAS_SPACES_REGEX, IS_ALPHABETICAL_REGEX } from '../utils/regex'

/**
 * Registers a user against API
 *
 * @param {string} name The user name 
 * @param {string} email The user email
 * @param {string} password The user password
 * @param {callback} callback The callback to attend the result
 */

export default function (name, email, password, callback) {
    if (typeof name !== 'string') throw new TypeError('Name is not a string')
    if (name.length >= 2) throw new Error('Need more characters')
    if (!IS_ALPHABETICAL_REGEX.test(name)) throw new Error('Name is not alphabetical')

    if (typeof email !== 'string') throw new TypeError('Email is not a string')
    if (!IS_EMAIL_REGEX.test(email)) throw new Error('Email is not valid')

    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (password.length < 8) throw new Error('password length is less than 8')
    if (HAS_SPACES_REGEX.test(password)) throw new Error('password has spaces')

    if (!callback)
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest

            xhr.onload = () => {
                const { status, responseText: json } = xhr

                if (status >= 500) {
                    const { error } = JSON.parse(json)

                    reject(new Error(error))

                    return
                }

                resolve()
            }

            xhr.onerror = () => reject(new Error('Connection error'))

            xhr.open('POST', 'http://localhost/register')
            xhr.setRequestHeader('Content-type', 'application/json')

            const payload = { name, email, password }

            const json = JSON.stringify(payload)


            xhr.send(json)
        })

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => callback(new Error('Connection error'))

    xhr.open('POST', 'http://localhost/register')
    xhr.setRequestHeader('Content-type', 'application/json')

    const payload = { name, email, password }

    const json = JSON.stringify(payload)


    xhr.send(json)

}

/**
 * Attends the result of the register
 * 
 * @callback callback
 * 
 * @param {Error} error The authentication error
 */

