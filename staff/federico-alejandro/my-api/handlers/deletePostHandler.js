const deletePost = require('../logic/deletePost')

module.exports = (req, res) => {
    const { params: { id }, headers: { authorization } } = req

    const userId = authorization.substring(7)

    try {
        deletePost(userId, id, error => {
            if (error) {
                res.status(500).json({ error: error.message })

                return
            }

            res.status(200).send()

        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}