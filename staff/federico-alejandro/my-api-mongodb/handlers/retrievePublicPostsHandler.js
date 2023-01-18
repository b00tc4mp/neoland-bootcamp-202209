const retrievePublicPosts = require('../logic/retrievePublicPosts')

module.exports = (req, res) => {
    try {
        const { userId } = req

        retrievePublicPosts(userId)
            .then(posts => res.json(posts))
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}