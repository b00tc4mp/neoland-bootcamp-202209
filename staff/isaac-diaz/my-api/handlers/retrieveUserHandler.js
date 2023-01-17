const retrieveUser = require('../logic/retrieveUser')

module.exports = (req, res) => {
    try {
        const { userId } = req

        retrieveUser(userId)
            .then(user => res.json(user))
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}