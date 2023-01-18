const retrieveUser = require('../logic/retrieveUser')
const renderPage = require('./helpers/renderPage')

module.exports = (req, res) => {
    const { cookie } = req.headers // id usuario

    if (!cookie) {
        res.redirect('/login')

        return
    }

    const [, userId] = cookie.split('=')

    try {
        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(500)
                res.send(error.message)

                return
            }

            res.setHeader('Content-Type', 'text/html')
            res.send(renderPage(`hello ${user.name}!
                    <form action='/logout' method='post'>
                          <button>Logout</button>
                          </form>
                          <form action='/search'>
                          <input type='text' name='q'>
                          <button>Search</button>
                          </form>`))
        })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}