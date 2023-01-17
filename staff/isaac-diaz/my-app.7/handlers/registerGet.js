module.exports = (req, res) => {
    const { cookie } = req.headers

    if(cookie) {
        res.redirect('/')

        return
    }

    res.status(200)
    res.setHeader('Content-type', 'text/html')
    res.sed(`<html>
    <head>
        <title>Http Cats</title>
        <link href="/style.css" rel="stylesheet" />
    </head>
    <body class="flex flex-col items-center">
        <form class="flex flex-col items-center" method="post" action="/register">
            <input type="name" name="name" placeholder="name" />
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button>Register</button>
        </form>
        <a href="/login">Login</a>
    </body>
</html>`)
}