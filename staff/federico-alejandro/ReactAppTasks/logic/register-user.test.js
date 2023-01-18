// CASE succeeds on new user (happy)
{
    const name = 'Ju Anjo'
    const email = 'ju@anjo.com'
    const password = '123123123'

    const res = registerUser(name, email, password)

    console.assert(res === undefined)

    let found = false

    for (let i = 0; i < users.length && !found; i++) {
        const user = users[i]

        if (user.email === email) found = true
    }

    console.assert(found)
}

// CASE fails on existing user (unhappy)
{
    const user = {
        name: 'Coco Drilo',
        email: 'coco@drilo.com',
        password: '123123123'
    }

    users.push(user)

    let _error = null

    try {
        registerUser(user.name, user.email, user.password)
    } catch (error) {
        _error = error
    }


    console.assert(_error instanceof Error)
    console.assert(_error.message === 'user already exists')

}
// CASE fails on empy name (unhappy)
{
    let _error = null

    try {
        registerUser('', 'ti@gre.com', '123123123')
    } catch (error) {
        _error = error
    }

    console.assert(_error instanceof Error)
    console.assert(_error.message === 'name length is less than 1')
}
