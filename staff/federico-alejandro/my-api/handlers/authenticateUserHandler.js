const authenticateUser = require('../logic/authenticateUser')

module.exports = (req, res) => {
    let { email, password } = req.body

    try {
        authenticateUser(email, password, (error, userId) => {
            if (error) {
                res.status(500).json({ error: error.message })

                return
            }
            
            res.json({ userId })
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}