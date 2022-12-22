import { IS_EMAIL_REGEX, HAS_SPACES_REGEX } from '../utils/regex'

/**
 * Authenticates a user against API
 * 
 * @param {string} email The user email
 * @param {string} password The user password
 */
function validateUser(email, password) {
    if (typeof email !== 'string') throw new Error('email is not a string')
    if (!IS_EMAIL_REGEX.test(email)) throw new Error('email is not valid')

    if (typeof password !== 'string') throw new Error('password is not a string')
    if (password.length < 8) throw new Error('password length is less than 8')
    if (HAS_SPACES_REGEX.test(password)) throw new Error('password has spaces')

    return new Promise((resolve, reject) => {
    
        const xhr = new XMLHttpRequest

        xhr.onload = () => {
            const { status, responseText: json } = xhr

            if (status >= 500) {
                const { error } = JSON.parse(json)

                reject(new Error(error))

                return
            }

            const { userId } = JSON.parse(json)

            resolve(userId)
        }

        xhr.onerror = () => reject(new Error('connection error'))

        
        xhr.open('POST', 'http://localhost/users/validate')
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { email, password }

        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}

/**
 * Attends the result of the authentication
 * 
 * @param {Error} error The authentication error
 * @param {string} userId The id of the user that authenticated
 */

export default validateUser