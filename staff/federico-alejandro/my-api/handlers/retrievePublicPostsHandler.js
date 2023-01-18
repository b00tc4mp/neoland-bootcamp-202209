const retrievePublicPosts = require('../logic/retrievePublicPosts')

module.exports = (req, res) => {
    const { headers: { authorization } } = req

    const userId = authorization.substring(7)

    try {
        retrievePublicPosts(userId, (error, posts) => {
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