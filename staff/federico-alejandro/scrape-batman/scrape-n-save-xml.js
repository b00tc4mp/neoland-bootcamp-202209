const scrapeHttpCat = require('./scrape-batman')
const { writeFile } = require('fs')

scrapeHttpCat((error, results) => {
    if(error) {
        console.error(error)

        return
    }

    let xml = '<?xml version="1.0 encoding="UTF-8"?>\n<results>\n'

    results.forEach(result => {
        xml += `    <personajes>
        image>${result.imageUrl}</image>
        <title>${result.title}></title>
        <price>${result.price}</price> 
        </personajes>\n`
    })

    xml += '</results'

    writeFile('./db.xml', xml, error => {
        if(error)
        console.error(error)
    })
})