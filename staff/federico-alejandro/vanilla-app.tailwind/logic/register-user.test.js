// CASE succeeds on new user (happy)

    var name = 'Ju Anjo'
    var email = 'ju@anjo.com'
    var password = '123123123'

    var res = registerUser(name, email, password)

    console.assert(res === undefined)

    var found = false

    for (var i = 0; i < users.length && !found; i++) {
        var user = users[i]

        if (user.email === email) found = true
    }

    console.assert(found)


// CASE fails on existing user (unhappy)

    var user = {
        name: 'Coco Drilo',
        email: 'coco@drilo.com',
        password: '123123123'
    }

    users.push(user)

    var _error = null

    try {
        registerUser(user.name, user.email, user.password)
    } catch (error) {
        _error = error
    }


    console.assert(_error instanceof Error)
    console.assert(_error.message === 'user already exists')


// CASE fails on empy name (unhappy)

    var _error = null

    try {
        registerUser('', 'ti@gre.com', '123123123')
    } catch (error) {
        _error = error
    }

    console.assert(_error instanceof Error)
    console.assert(_error.message === 'name length is less than 1')

