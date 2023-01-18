function RegisterPage(props) {
    log.info('RegisterPage -> render')

    const handleClick = event => {
        event.preventDefault()

        const onNavigateToLogin = props.onNavigateToLogin

        onNavigateToLogin()
    }

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nameInput = form.name
        const emailInput = form.email
        const passwordInput = form.password

        const name = nameInput.value
        const email = emailInput.value
        const password = emailInput.value

        try{
            registerUser(name, email, password)

            alert('user registered')

            const onRegisterUser = props.onRegisterUser

            onRegisterUser()
        } catch (error) {
            alert(error.message)

            passwordInput.value = ''
        }
    }


    return <main className='flex flex-col gap-6 w-60 mt-44 bg-indigo-600 rounded-lg h-80 shadow-2xl shadow-gray-900'>
        <form className='flex flex-col items-center py-1 gap-4 border-5 border-stone-900 h-96' onSubmit={handleSubmit}>
            <label htmlFor='name' className='font-bold text-white italic'>Name</label>
            <input type='name' id='name' name='name' placeholder=' Input your name' pattern='[A-Za-z]{1,}' className=' bg-slate-300 border-b border-black rounded-md' />

            <lable htmlFor='email' className='font-bold text-white italic justify-start'>Email</lable>
            <input type='email' id='email' name='email' placeholder=' Input your email' className='bg-slate-300 border-b border-black rounded-md' />

            <label htmlFor='password' className='font-bold text-white italic'>Password</label>
            <input type='password' id='password' name='pasword' placeholder=' Input a password' className='bg-slate-300 border-b border-black rounded-md' pattern="[A-Za-z0-9S]{8,}" required="" title="Use min 8 characters for the password and no spaces" />

            <button className='font-bold underline text-white italic'>Register</button>
            <a href='' className='login--link font-bold text-white italic animate-bounce' onClick={handleClick}>Login</a>
        </form>
    </main>
}