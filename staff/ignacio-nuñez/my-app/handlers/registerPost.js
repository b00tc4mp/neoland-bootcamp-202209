const registerUser = require('../logic/registerUser')


module.exports = (req, res) => {
    let { name, email, password } = req.body

    email = email.replace('%40', '@')
    name = name.replace('+', ' ')

    try {
        registerUser(name, email, password, error => {
            if (error) {
                res.status(500)
                res.send(error.message)

                return
            }
            res.redirect('/login')
        })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}