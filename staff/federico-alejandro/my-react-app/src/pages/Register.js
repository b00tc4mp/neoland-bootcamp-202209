/* eslint-disable jsx-a11y/anchor-is-valid */
import log from '../utils/coolog'
import registerUser from '../logic/registerUsers'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    log.info('RegisterPage -> render')

    const navigate = useNavigate()

    const handleRegister = event => {
        event.preventDefault()

        const { name: { value: name }, email: { value: email }, password: { value: password } } = event.target

        try {
            // registerUser(name, email, password, error => {
            //     if (error) {
            //         alert(error.message)
            //         return
            //     }
            // })
            // alert('user registered')
            // navigate('/login')
            registerUser(name, email, password)
                .then(() => navigate('/login'))
                .catch(error => error.message)
        } catch (error) {
            alert(error.message)

            event.target.password.value = '' //mejorar
        }
    }

    return <main className='h-full flex flex-col items-center justify-center gap-2 bg-white dark:bg-black text-black dark:text-white'>
        <form className='flex flex-col w-60 p-7 rounded-lg h-70 shadow-2xl shadow-gray-900 gap-2 bg-slate-400' onSubmit={handleRegister}>
            <label htmlFor='name' className='font-bold text-black italic'>Name</label>
            <input type='name' id='name' name='name' placeholder=' Input your name' className=' bg-slate-300 border-b border-black rounded-md' />

            <lable htmlFor='email' className='font-bold text-black italic justify-start'>Email</lable>
            <input type='email' id='email' name='email' placeholder=' Input your email' className='bg-slate-300 border-b border-black rounded-md' />

            <label htmlFor='password' className='font-bold text-black italic'>Password</label>
            <input type='password' id='password' name='pasword' placeholder=' Input a password' className='bg-slate-300 border-b border-black rounded-md' pattern="[A-Za-z0-9S]{8,}" required="" title="Use min 8 characters for the password and no spaces" />

            <button className='font-bold underline text-black italic'>Register</button>
            <Link to='/login' className='login--link self-center font-bold text-black italic animate-bounce'>Login</Link>
        </form>
    </main>
}
export default Register