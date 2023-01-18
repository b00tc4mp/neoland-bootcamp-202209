const retrievePostsUser = require('../logic/retrievePostsUser')

module.exports = (req, res) => {
    //const { headers: { authorization} } = req
    try {
        const { params: { postId }, userId } = req

        retrievePostsUser(userId, postId)
            .then(posts => res.json(posts))
            .catch(error => res.status(500).json({ error: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}