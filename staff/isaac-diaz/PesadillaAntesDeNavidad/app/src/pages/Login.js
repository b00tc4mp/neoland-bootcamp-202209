import log from '../utils/coolog'
import authenticateUser from '../logic/authenticateUser'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../components/Context'
import { errors } from 'com'
const { FormatError, AuthError, LengthError, NotFoundError } = errors


function Login() {
    log.info('Login -> render')

    const { login, showAlert } = useContext(Context)

    const handleLogin = event => {
        log.info('handleLogin -> render')

        event.preventDefault()

        const { email: { value: email }, password: { value: password } } = event.target

        try {
            authenticateUser(email, password)
                .then(token => login(token))
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof AuthError || error instanceof NotFoundError)
                        showAlert(error.message, 'error')
                    else
                        showAlert(error.message, 'fatal')
                })
        } catch (error) {
            if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                showAlert(error.message, 'warn')
            else
                showAlert(error.message, 'fatal')

            event.target.password.value = '' // TODO improve this, do not manipulate the dom directly, do it by means of React
        }
    }

    return <main className='h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:bg-black text-black dark:text-white'>
        <form className='w-5/5 shadow-xl shadow-gray-400 border-2 bg- flex flex-col gap-1 justify-center items-center p-8 rounded-xl' onSubmit={handleLogin}>
            <label htmlFor='email' className='container__item-left'>E-mail</label>
            <input name='email' type='email' id='email' placeholder='input your e-mail' className='border-b border-black text-black' />
            <label htmlFor='password' className='container__item-left'>Password</label>
            <input name='password' type='password' id='password' placeholder='input your password' className='border-b border-black text-black' />
            <button className='p-2 border rounded-xl hover:animate-pulse'>Login</button>
        </form>

        <Link to='/register' className='underline'>Register</Link>
    </main>
}

export default Login
