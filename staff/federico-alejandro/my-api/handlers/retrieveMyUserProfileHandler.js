const retrieveMyUserProfile = require('../logic/retrieveMyUserProfile')

module.exports = (req, res) => {
    const { headers: { authorization } } = req

    const userId = authorization.substring(7)

    try {
        retrieveMyUserProfile(userId, (error, user) => {
            if (error) {
                res.status(500).json({ error: error.message })

                return
            }
        
            res.json(user)
        })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}