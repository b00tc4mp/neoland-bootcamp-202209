function RegisterPage(props) {

    const hadleClick = (event) => {
        log('INFO', 'LoginPage -> render')
        event.preventDefault()

        const onLoginLinkClick = props.onLoginLinkClick

        onLoginLinkClick()
    }

    const handleSubmit = (event) => {
        log('INFO', 'Submit Register')
        event.preventDefault()

        const form = event.target

        const nameInput = form.name
        const emailInput = form.email
        const passwordInput = form.password

        const name = nameInput.value
        const email = emailInput.value
        const password = passwordInput.value

        try {
            registerUser(name, email, password)
            const onRegisterSuccess = props.onRegisterSuccess

            onRegisterSuccess()
        } catch (error) {
            alert(error.message)
            passwordInput.value = ''
        }
    }


    return (
        <main className="h-screen">
            <div className="h-full flex flex-col flex-wrap justify-center items-center bg-gradient-to-br from-cyan-500 to-blue-500">
                <h1 className="text-center text-white text-lg pb-4">
                    Create your Account to continue to Sign in
                </h1>
                <form className="flex flex-col justify-start w-96 gap-1 px-12 py-14 rounded bg-white" onSubmit={handleSubmit}>
                    <img src="img/logologintrello.png" className="self-center w-2/5 mb-8" />
                    <label htmlFor="registerName"></label>
                    <input
                        name='name'
                        type="text"
                        placeholder="Enter a name"
                        id="registerName"
                        required=""
                        title="Please enter at least 1 character"
                        className="h-10 border-gray-400 border-2 rounded border-solid text-slate-800 text-base pl-2"
                    />
                    <label htmlFor="registerEmail"></label>
                    <input
                        name='email'
                        type="email"
                        placeholder="Enter an e-mail"
                        id="registerEmail"
                        title="Please use @ and . on your email"
                        className="h-10 border-gray-400 border-2 rounded border-solid text-slate-800 text-base pl-2"
                    />
                    <label htmlFor="registerPassword"></label>
                    <input
                        name='password'
                        type="password"
                        placeholder="Enter a password"
                        id="registerPassword"
                        title="Please enter at least 8 characters without spaces"
                        className="h-10 border-gray-400 border-2 rounded border-solid text-slate-800 text-base pl-2"
                    />
                    <span className="flex">
                        <input type="checkbox" />
                        <label className="text-xs mx-2 my-3">Show password</label>
                    </span>
                    <button className="w-full h-8 self-start bg-sky-700 rounded border-none text-white font-bold">
                        Register
                    </button>
                </form>
                <a href="" className="mt-2 text-white text-base hover:text-black" onClick={hadleClick}>
                    Sign in
                </a>
            </div>
        </main>
    );
}