const authenticateUser = require('../logic/authenticateUser')

module.exports = (req, res) => {
    let { email, password } = req.body

    email = email.replace('%40', '@')

    try {
        authenticateUser(email, password, (error, userId) => {
            if (error) {
                res.status(500)
                res.send(error.message)

                return
            }

            res.setHeader('set-cookie', `id=${userId}`) // session cookie
            res.redirect('/')
        })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}