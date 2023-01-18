const scrapeHttpCat = require('./scrape-http-cat')

scrapeHttpCat((error, results) => {
    if (error) {
        console.error(error)

        return
    }

    const json = JSON.stringify(results, null, 4)

    console.log(json)
})