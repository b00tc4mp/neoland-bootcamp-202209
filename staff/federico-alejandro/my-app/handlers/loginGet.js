const renderPage = require('./helpers/renderPage')

module.exports = (req, res) => {
    const { cookie } = req.headers // id=user-2

    if (cookie) {
        res.redirect('/')

        return
    }

    res.status(200)
    res.setHeader('Content-Type', 'text/html')
    res.send(renderPage(`<form class="flex flex-col items-center" action="/login" method="post">
                        <input type="email" name="email" placeholder="email" />
                        <input type="password" name="password" placeholder="password" />
                        <button class="border border-solid">Login</button>
                    </form>
                    <a href="/register">Register</a>`))
}