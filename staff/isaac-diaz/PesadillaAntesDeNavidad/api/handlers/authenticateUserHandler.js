const authenticateUser = require('../logic/authenticateUser')
const jwt = require('jsonwebtoken')
const { NotFoundError, AuthError, FormatError, LengthError } = require('../../com/errors')

const { JWT_SECRET, JWT_EXPIRATION } = process.env

module.exports = (req, res) => {
    try {
        const { email, password } = req.body

        authenticateUser(email, password)
            .then(userId => {
                const payload = { sub: userId }

                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

                res.json({ token })
            })
            .catch(error => {
                if (error instanceof NotFoundError)
                    res.status(404).json({ error: error.message })
                else if (error instanceof AuthError)
                    res.status(401).json({ error: error.message })
                else
                    res.status(500).json({ error: error.message })
            })
    } catch (error) {
        if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
            res.status(400).json({ error: error.message })
        else
            res.status(500).json({ error: error.message })
    }
}