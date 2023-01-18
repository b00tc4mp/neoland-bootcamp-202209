const retrievePost = require('../logic/retrievePost')

module.exports = (req, res) => {
    try {
        const { params: { postId }, userId } = req

        retrievePost(userId, postId)
            .then(post => res.json(post))
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}