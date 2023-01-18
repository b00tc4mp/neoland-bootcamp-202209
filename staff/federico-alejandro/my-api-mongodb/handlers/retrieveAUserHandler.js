const retrieveAUser = require('../logic/retrieveAUser')

module.exports = (req, res) => {
    try {
        const { params: { targetUserId }, userId } = req

        retrieveAUser(userId, targetUserId)
            .then(user => res.json(user))
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}