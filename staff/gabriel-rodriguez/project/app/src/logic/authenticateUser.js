import { regex, errors } from 'com'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';

const { IS_EMAIL_REGEX, HAS_SPACES_REGEX } = regex
const { FormatError, AuthError, LengthError, NotFoundError, UnexpectedError } = errors

const passwordErr = () => {

    Store.addNotification({
        title: "Error!",
        message: "La contraseña es incorrecta",
        type: "danger",
        insert: "top",
        container: "top-right",
        animation : ["bounce_in"],
        // animationIn: ["bounce_in"],
        // animationOut: ["bounce_out"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
}


const notRegister = (correo) => {

    Store.addNotification({
        title: "Error!",
        message: correo+ " no existe en base de datos , registrese",
        type: "danger",
        insert: "top",
        container: "top-right",
        animation : ["bounce_in"],
        // animationIn: ["bounce_in"],
        // animationOut: ["bounce_out"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
}

const passwordLength = () => {

    Store.addNotification({
        title: "Error!",
        message: "La contraseña debe ser minimo 8 carácteres",
        type: "warning",
        insert: "top",
        container: "top-right",
        animation : ["bounce_in"],
        // animationIn: ["bounce_in"],
        // animationOut: ["bounce_out"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
}

/**
 * Authenticates a user
 * 
 * @param {string} email The user email
 * @param {string} password The user password
 */
export default function authenticateUser(email, password) {
    
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (!IS_EMAIL_REGEX.test(email)) throw new FormatError('email is not valid')

    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (password.length < 8) throw new LengthError('password length is less than 8')
    if (HAS_SPACES_REGEX.test(password)) throw new FormatError('password has spaces')

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
                    passwordLength()
                    reject(new LengthError(error))
            } else if (status === 401) {
                const { error } = JSON.parse(json)
                passwordErr();
                reject(new AuthError(error))
            } else if (status === 404) {
                const { error } = JSON.parse(json)
                notRegister(email);
                reject(new NotFoundError(error))
            } else if (status < 500)
                reject(new UnexpectedError('client error'))
            else
                reject(new UnexpectedError('server error'))

        }

        xhr.onerror = () => reject(new Error('connection error'))


        xhr.open('POST', 'http://localhost:3001/users/auth')
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { email, password }

        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}