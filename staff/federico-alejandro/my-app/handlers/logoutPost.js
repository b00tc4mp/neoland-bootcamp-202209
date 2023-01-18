module.exports = (req, res) => {
    res.clearCookie('id')
    res.redirect('/login')
}