import log from '../utils/coolog'
import registerUser from '../logic/registerUser'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../components/Context'
import { errors } from 'com'

const { FormatError, LengthError, ConflictError } = errors


function Register() {
    log.info('Register -> render')

    const navigate = useNavigate()
    const { showAlert } = useContext(Context)

    const handleRegister = event => {
        log.info('Register -> HandleRegister')

        event.preventDefault()

        const { name: { value: name }, email: { value: email }, password: { value: password } } = event.target

        try {
            registerUser(name, email, password)
                .then(() => navigate('/login'))
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof ConflictError)
                        showAlert(error.message, 'error')
                    else
                        showAlert(error.message, 'fatal')
                })
        } catch (error) {
            showAlert(error.message, 'warn')

            event.target.password.value = ''
        }
    }

    return <main className='h-full flex flex-col items-center justify-center gap-2 bg-white dark:bg-black text-black dark:text-white'>
        <form className='w-5/5 shadow-xl shadow-gray-400 border-2 flex flex-col gap-1 justify-center items-center p-8 rounded-xl' onSubmit={handleRegister}>            
            <label htmlFor='name' className='flex mt-0'>Name</label>
            <input name='name' type='text' id='name' placeholder='input your name' className='border-b border-black text-black' />
            <label htmlFor='email' className='container__item-left'>E-mail</label>
            <input name='email' type='email' id='email' placeholder='input your e-mail' className='border-b border-black text-black' />
            <label htmlFor='password' className='container__item-left'>Password</label>
            <input name='password' type='password' id='password' placeholder='input your password' className='border-b border-black text-black' />
            <button className='p-2 mb-0.5 border rounded-xl hover:animate-bounce'>Register</button>        
        </form>
        <div className='flex items-center justify-center'>
            <Link to='/login' className='flex text-center underline'>Login</Link>
        </div>
    </main>
}

export default Register
