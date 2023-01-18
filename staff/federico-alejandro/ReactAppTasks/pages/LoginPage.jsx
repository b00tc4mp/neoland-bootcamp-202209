function LoginPage(props) {
    log.info('LoginPage -> render')

    const handleClick = event => {
        event.preventDefault()

        const onNavigateToRegister = props.onNavigateToRegister //referencio al callback

        onNavigateToRegister() //llamo al callback
    }

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const emailInput = form.email
        const passwordInput = form.password

        const email = emailInput.value
        const password = passwordInput.value

        try {
            authenticateUser(email, password)
                .then((userId) => {
                    user = { userId }

                    props.onLogIn()
                })
                .catch((error) => {
                    alert(error.message);

                    passwordInput.value = "";
                })
        } catch (error) {
            alert(error.message)

            passwordInput.value = ''
        }
    }

    return <main className='flex flex-col items-center gap-2 mt-36'>
        <h1 className='text-3xl font-extrabold italic'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-60 p-7 bg-indigo-600 rounded-lg h-80 shadow-2xl shadow-gray-900'>
            <label htmlFor='email' className='font-bold text-white italic'>Email</label>
            <input type='email' name='email' id='email' placeholder=' Input your email' className=' bg-slate-300 border-b border-black w-50 rounded-md' />

            <label htmlFor='password' className='font-bold text-white italic"'>Password</label>
            <input name='passwprd' type='password' id='password' placeholder=' Input a password' className='bg-slate-300 border-b border-black rounded-md' />

            <button className='mx-14 font-bold italic  rounded-md bg-slate-300 p-2'>Login</button>
            <a href='' onClick={handleClick} className='animate-pulse underline font-bold text-white text-lg italic self-center p-2 content-end'>Register</a>
        </form>
    </main>

}