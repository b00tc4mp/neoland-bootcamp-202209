const { useState, useEffect } = React

function Settings() {
    log.info('Settings -> constructor')

    const [view, setView] = useState('settings')

    useEffect(() => {
        log.info('Settings -> effect "componentDidMount"')

        return () => log.info('Settings -> effect "componentWillUnMount"')
    }, [])

    const handleUpdateUserEmail = event => {
        log.info('Settings -> handleUpdateUserEmail')

        event.preventDefault()

        try {
            const newEmail = event.target.email.value

            updateUserEmail(user.email, newEmail)

            user.email = newEmail

            alert('E-mail updated')
        } catch (error) {
            alert(error.message)
        }
    }

    const handleUpdateUserName = event => {
        log.info('Settings -> handleUpdateUserName')

        event.preventDefault()

        try {
            const newName = event.target.name.value

            updateUserName(user.name, newName)

            user.name = newName

            alert('Name updated')
        } catch (error) {
            alert(error.message)
        }
    }

    const handleUpdateUserPassword = event => {
        log.info('Settings -> handleUpdateUserPassword')

        event.preventDefault()

        const newPassword = event.target.password.value
        try {

            updateUserPassword(user.password, newPassword)

            user.password = newPassword

            alert('Password updated')

            event.target.password.value = ''

        } catch (error) {
            alert(error.message)
            event.target.password.value = ''
        }
    }

    return <section className='flex flex-col items-center mt-36' >
        <h2 className='font-extrabold text-2xl mb-3'>Settings</h2>
        <div className='flex flex-col items-end border-8 p-3 border-blue-600 rounded-lg'>
            <form className='block' onSubmit={handleUpdateUserEmail}>
                <label htmlFor='email' className='font-extrabold'>Email</label>
                <input name='email' type='email' id='email' placeholder=' input an email' defaultValue={user.email} className='m-3 border-b border-black w-50 rounded-md' />
                <button className='m-5 text-sm border-transparent rounded-md font-serif bg-blue-600 text-white w-14'>Save</button>
            </form>
            <form className='block' onSubmit={handleUpdateUserName}>
                <label htmlFor='name' className='font-extrabold'>Name</label>
                <input name='name' type='name' id='name' placeholder=' Name' defaultValue={user.name} className='m-3 border-b border-black w-50 rounded-md' />
                <button className='m-5 text-sm border-transparent rounded-md font-serif bg-blue-600 text-white w-14'>Save</button>
            </form>
            <form className='block' onSubmit={handleUpdateUserPassword}>
                <label htmlFor='password' className='font-extrabold'>Password</label>
                <input name='password' type='password' id='password' placeholder=' Input a new password' className='m-3 border-b border-black w-50 rounded-md' />
                <button className='m-5 text-sm border-transparent rounded-md font-serif bg-blue-600 text-white w-14'>Save</button>
            </form>
        </div>
    </section>
}

