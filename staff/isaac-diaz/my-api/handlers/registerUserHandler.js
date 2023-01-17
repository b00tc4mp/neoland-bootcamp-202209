const registerUser = require('../logic/registerUser')

module.exports = (req, res) => {
    try {
    const body = req.body

    const { name, email, password } = body

        registerUser(name, email, password)
            .then(() => res.status(200).send())
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}