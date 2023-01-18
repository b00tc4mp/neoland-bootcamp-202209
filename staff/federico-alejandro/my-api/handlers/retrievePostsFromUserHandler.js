const retrievePostsFromUser = require('../logic/retrievePostsFromUser')

module.exports = (req, res) => {
    const { headers: { authorization }, params: { targetUserId} } = req

    const userId = authorization.substring(7)

    try {
        retrievePostsFromUser(userId, targetUserId, (error, posts) => {
            if (error) {
                res.status(500).json({ error: error.message })

                return
            }

            res.json(posts)
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}