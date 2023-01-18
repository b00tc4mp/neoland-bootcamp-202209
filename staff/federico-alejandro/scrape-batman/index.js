const express = require('express')
const {readFile } = require('fs')

const api = express()

api.get('/search', (req, res) => {
    readFile('db.json', 'utf8', (error, json) => {
        if(error) {
            res.status(500)
            res.setHeader('Content-type', 'application/json')
            res.send(`{"error": ${error.message}}`)

            return 
        }

        const data = JSON.parse(json)

        const { q, title, price} = req.query

        let filtered = data 
        if(q)
        filtered = filtered.filter(item => item.title.includes(q) || item.price.includes(q))

        if (title)
            filtered = filtered.filter(item => item.title.includes(title))

        if (price)
            filtered = filtered.filter(item => item.price.includes(price))

        res.status(200)
        res.setHeader('Content-type', 'application/json')
        //res.send(JSON.stringify(filtered))
        res.json(filtered)

    })
})

api.listen(8081)