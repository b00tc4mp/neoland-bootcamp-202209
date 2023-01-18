/* eslint-disable jsx-a11y/anchor-is-valid */
import log from '../utils/coolog'
import authenticateUser from '../logic/authenticateUser'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../components/Context'
import { FcReddit } from "react-icons/fc";

function Login() {
    log.info('Login -> render')

    const { login } = useContext(Context)

    const handleLogin = event => {
        log.info('Login -> handleLogin')

        event.preventDefault()

        const { email: { value: email }, password: { value: password } } = event.target

        try {
            // authenticateUser(email, password, (error, userId) => {
            //     if (error) {
            //         alert(error.message)
            //         return
            //     }
            //     login(userId)
            // })
            authenticateUser(email, password)
                .then(userId => login(userId))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)

            event.target.password.value = ''
        }
    }

    return <main className='h-full flex flex-col items-center justify-center gap-2 bg-white dark:bg-black text-black dark:text-white'>
        <h2><FcReddit size='3rem' /></h2>
        <form className='flex flex-col w-60 p-7 rounded-lg h-70 shadow-2xl shadow-gray-900 gap-2 bg-slate-400' onSubmit={handleLogin}>
            <label htmlFor='login-email' className=' font-bold container__item--left'>E-mail</label>
            <input name='email' type='email' id='login-email' placeholder=' input your e-mail' className='border-b rounded-md border-black' />
            <label htmlFor='login-password' className=' font-bold container__item--left'>Password</label>
            <input name='password' type='password' id='login-password' placeholder=' input your password' className='border-b rounded-md border-black' />
            <button className='mx-14 font-bold italic p-2'>Login</button>
            <Link to='/register' className='font-bold self-center underline'>Register</Link>
        </form>

    </main>
}

export default Login


