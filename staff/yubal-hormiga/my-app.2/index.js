const express = require('express')
const searchHttpCats = require('./logic/searchHttpCats')
const authenticateUser = require('./logic/authenticateUser')
const retrieveUser = require('./logic/retrieveUser')

const app = express()

app.use(express.static('public'))

app.get('/login', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'text/html')
    res.send(`<html>
                <head>
                    <title>Http Cats</title>
                    <link href="/style.css" rel="stylesheet" />
                </head>
                <body class="flex flex-col items-center">
                    <form class="flex flex-col items-center" action="/login" method="post">
                        <input type="email" name="email" placeholder="email" />
                        <input type="password" name="password" placeholder="password" />
                        <button>Login</button>
                    </form>
                    <a href="/register">Register</a>
                </body>
            </html>`)
})

app.post('/login', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk.toString())

    req.on('end', () => {
        // email=wendy%40darling.com&password=123123123

        let { email, password } = content.split('&').reduce((body, keyValue) => {
            const [key, value] = keyValue.split('=')

            body[key] = value

            return body
        }, {})

        email = email.replace('%40', '@')

        try {
            authenticateUser(email, password, (error, user) => {
                if (error) {
                    res.status(500)
                    res.send(error.message)

                    return
                }

                res.setHeader('set-cookie', `id=${user.id}`)
                res.redirect('/')
            })
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    })
})

app.get('/', (req, res) => {
    const { cookie } = req.headers // id=user-2

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
            res.send(`<html>
                <head>
                    <title>Http Cats</title>
                    <link href="/style.css" rel="stylesheet" />
                </head>
                <body class="flex flex-col items-center">
                    hello ${user.name}!
                </body>
            </html>`)
        })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})

app.get('/register', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'text/html')
    res.send(`<html>
                <head>
                    <title>Http Cats</title>
                    <link href="/style.css" rel="stylesheet" />
                </head>
                <body class="flex flex-col items-center">
                    <form class="flex flex-col items-center">
                        <input type="name" name="name" placeholder="name" />
                        <input type="email" name="email" placeholder="email" />
                        <input type="password" name="password" placeholder="password" />
                        <button>Register</button>
                    </form>
                    <a href="/login">Login</a>
                </body>
            </html>`)
})

// http://localhost/search?q=C
app.get('/search', (req, res) => {
    const { q } = req.query

    searchHttpCats(q, (error, cats) => {
        if (error) {
            res.status(500)
            res.setHeader('Content-Type', 'text/html')
            res.send(`<html>
                <head>
                    <title>Http Cats</title>
                </head>
                <body>
                    <h1>Error: ${error.message}</h1>
                </body>
            </html>`)

            return
        }

        res.status(200)
        res.setHeader('Content-Type', 'text/html')
        res.send(`<html>
                <head>
                    <title>Http Cats</title>
                </head>
                <body>
                    <h1>Search</h1>
                    <form action="/search">
                        <input type="text" name="q" value="${q}">
                        <button>Search</button>
                    </form>
                    <h1>Results</h1>
                    <ul>
                        ${cats.reduce((lis, cat) => {
            return lis + `<li>
                                <img src="${cat.imageUrl}" />
                                <h2>${cat.code}</h2>
                                <p>${cat.text}</p>
                            </li>`
        }, '')}
                    </ul>
                </body>
            </html>`)
    })
})

app.listen(80)