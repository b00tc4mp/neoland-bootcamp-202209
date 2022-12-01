const registerUser = require('../logic/registerUser')

module.exports = (req, res) => {
    try {
        const { name, email, password } = req.body
    
        registerUser(name, email, password)
            .then(() => res.status(201).send())
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}