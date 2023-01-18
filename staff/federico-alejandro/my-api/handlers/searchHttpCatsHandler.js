const searchHttpCats = require('../logic/searchHttpCats')

module.exports = (req, res) => {
    try {
        const { q } = req.query

        searchHttpCats(q, (error, cats) => {
            if (error) {
                res.status(500).json({ error: error.message})

                return
            }

            res.json(cats)
        })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}