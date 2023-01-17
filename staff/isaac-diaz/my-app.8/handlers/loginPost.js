const authenticateUser = require('../logic/authenticateUser')

module.exports = (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk.toString())

    req.on('end', () => {
        // email=wendy%40darling.com&password=123123123 // url-encoded

        let { email, password } = content.split('&').reduce((body, keyValue) => {
            const[key, value] = keyValue.split('=')

            body[key] = value

            return body
        }, {})

        email = email. replace('%40', '@')

        try{
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                res.status(500)
                res.send(error.message)

                return
            }

            res.header('set-cookie', 'id=${userId}')
            res.redirect('/')
            })            
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    })
}