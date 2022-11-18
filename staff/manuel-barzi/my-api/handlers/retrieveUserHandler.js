const retrieveUser = require('../logic/retrieveUser')

module.exports = (req, res) => {
    const { params: { userId } } = req

    try {
        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(500).json({ error: error.message })

                return
            }

            res.json(user)            
        })
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}