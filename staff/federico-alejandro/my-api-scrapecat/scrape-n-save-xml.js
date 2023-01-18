const scrapeHttpCat = require('./scrape-http-cat')
const { writeFile } = require('fs')

scrapeHttpCat((error, results) => {
    if(error) {
        console.error(error)

        return
    }

    let xml = '<?xml version="1.0 encoding="UTF-8"?>\n<results>\n'

    results.forEach(result => {
        xml +=`     <cat>
        <image>${result.imageUrl}</image>
        <code>${result.code}></code>
        <text>${result.text}</text>
        </cat>\n`
    })

    xml += '</results>'

    writeFile('./db.xml', xml, error => {
        if(error)
        console.error(error)
    })
})