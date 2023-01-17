const scrapeHttpCat = require('./logic/scrape-htttp-cat')

const { writeFile } = require('fs')

scrapeHttpCat((error, results) => {
    if (error) {    
        console.error(error)

        return
    }

    const json = JSON.stringify(results, null, 4)

    writeFile('./db.json', json, error => {
        if (error)
            console.error(error)
    })
})