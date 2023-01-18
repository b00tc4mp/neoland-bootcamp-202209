const deletePost = require('../logic/deletePost')

module.exports = (req, res) => {
    try {
        const { params: { postId }, userId } = req

        deletePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}