const deletePost = require('../logic/deletePost')

module.exports = (req, res) => {
    let { postId, postUserId } = req.body

    try {
        deletePost(postId, postUserId, error => {
            if (error) {
                if (error.message === 'Post doesnt exist') {
                    res.status(404).json({ error: error.message })
                } else {
                    res.status(500).json({ error: 'server error' })
                }

                return
            }

            res.status(200).send()
        })
    } catch (error) {
        res.status(500)
        res.json({ error: error.message })
    }
}