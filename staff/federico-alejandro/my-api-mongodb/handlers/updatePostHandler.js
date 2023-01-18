const updatePost = require('../logic/updatePost')

module.exports = (req, res) => {
    try {
        const { body: { text, visibility }, params: { postId }, userId } = req

        updatePost(userId, postId, text, visibility)
            .then(() => res.status(204).send())
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}