const retrievePosts = require('../logic/retrievePosts')

module.exports = (req, res) => {
    try {
        const { params: { postId }, userId } = req

        retrievePosts(userId, postId)
            .then(posts => res.json(posts))
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}