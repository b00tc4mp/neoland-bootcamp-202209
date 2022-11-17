const returnUser = require('../logic/returnUser')

module.exports = (req, res) => {
    const { userId } = req.body

    try {
        returnUser(userId, (error, user) => {
            if (error) {
                res.status(500)
                res.json({ error: error.message })

                return
            }

            res.json(user)
        })
    } catch (error) {
        res.status(500)
        res.json({ error: error.message })
    }
}