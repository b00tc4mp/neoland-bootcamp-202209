module.exports = (req, res) => {
    const { cookie } = req.headers

    if(cookie) {
        res.redirect('/')

        return
    }

    res.status(200)
    set.header('Sontent-type', 'text/html')
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
}