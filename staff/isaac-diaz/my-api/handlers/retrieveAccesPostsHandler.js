const retrieveAccesPosts = require('../logic/retrieveAccessPosts')

module.exports = (req, res) => {
    try {
    const { userId } = req

        retrieveAccesPosts(userId)
            .then(posts => res.json(posts))
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}