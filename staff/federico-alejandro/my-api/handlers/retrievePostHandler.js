const retrievePost = require('../logic/retrievePost')

module.exports = (req, res) => {
    const { headers: { authorization }, params: { postId } } = req

    const userId = authorization.substring(7)

    try {
        retrievePost(userId, postId, (error, post) => {
            if (error) {
                res.status(500).json({ error: error.message })

                return
            }

            res.json(post)
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}