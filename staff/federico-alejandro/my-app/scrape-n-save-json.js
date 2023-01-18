const scrapeHttpCat = require('./logic/scrape-http-cat')
const { writeFile } = require('fs')

scrapeHttpCat((error, results) => {
    if (error) {
        console.error(error)

        return
    }

    const json = JSON.stringify(results, null, 4)

    writeFile('./data/cats.json', json, error => {
        if (error)
            console.error(error)
    })
})