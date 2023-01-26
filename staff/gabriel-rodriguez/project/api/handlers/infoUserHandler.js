const infoUserHandler = require('../logic/infoUser')

const { errors: { FormatError, NotFoundError } } = require('../../com')

module.exports = (req, res) => {
    console.log()
    try {
        const { userId } = req
    
        infoUserHandler(userId)
            .then(user => console.log(user,'test'))
            .catch(error => {
                console.log(error)
                // if (error instanceof NotFoundError)
                //     res.status(404).json({ error: error.message })
                // else
                //     res.status(500).json({ error: error.message })
            })
    } catch (error) {
        console.log('dededeee')
        if (error instanceof TypeError || error instanceof FormatError)
            res.status(400).json({ error: error.message })
        else
            res.status(500).json({ error: error.message })
    }
}