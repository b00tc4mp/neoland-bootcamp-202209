const retrieveItems = require('../logic/retrieveItems')
const { errors: {NotFoundError, FormatError, TypeError } } = require('com')

module.exports = (req, res) => {
    try {
        const { params: { listId }, userId } = req
    
        retrieveItems(userId, listId)
            .then(items => res.json(items))
            .catch(error => {
                if (error instanceof NotFoundError)
                    res.status(404).json({ error: error.message })
                else
                    res.status(500).json({ error: error.message })
            })
    } catch (error) {
        if (error instanceof TypeError || error instanceof FormatError)
            res.status(400).json({ error: error.message })
        else
            res.status(500).json({ error: error.message })
    }
}