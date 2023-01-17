const retrieveUser = require('../logic/retrieveUser')

module.exports = (req, res) => {
    const { cookie } = req.headers

    if(!cookie) {
        res.redirect('/login')

        return
    }

    const [, userId] = cookie.split('=')

    try {
        retrieveUser(userId, (error, user) => {
            if(error) {
                res.status(500)
                res.send(error.message)

                return
            }

            res.setHeader('Content-type', 'text/html')
            res.send(`<html>
            <head>
                <title>Http Cats</title>
                <link href="/style.css" rel="stylesheet" />
            </head>
            <body class="flex flex-col items-center">
                hello ${user.name}!
                <form action="/logout" method="post">
                    <button>Logout</button>
                </form>
                <form action="/search">
                    <input type="text" name="q">
                    <button>Search</button>
                </form>
            </body>
        </html>`)
        })        
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}