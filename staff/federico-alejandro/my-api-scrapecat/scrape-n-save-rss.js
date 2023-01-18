const scrapeHttpCat = require('./scrape-http-cat')
const { writeFile } = require('fs')

scrapeHttpCat((error, results) => {
    if (error) {
        console.error(error)

        return
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
        <channel>
            <title>HTTP &amp; Cats</title>
            <description>Meow</description>
            <link>https://http.cat</link>`

    results.forEach(result => {
        xml += `    <item>
                <title>${result.code}</title>
                <description>${result.text}</description>
                <media:content type="image/jpeg" medium="image" url="${result.imageUrl}" />
                </item>
                `
    })

    xml += `    </channel>
            </rss>`

    writeFile('./rss.xml', xml, error => {
        if (error)
            console.error(error)
    })
})