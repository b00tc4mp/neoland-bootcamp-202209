const { XMLHttpRequest } = require("xmlhttprequest")
const { JSDOM } = require('jsdom')

function scrapeHttpCat(callback) {
    const xhr = new XMLHttpRequest

    //response
    xhr.onload = () => {
        const html = xhr.responseText

        const dom = new JSDOM(html)

        const doc = dom.window.document
        //tomamos una nodeListOf (algo parecido a un array) de los divs que contienen cada gatito
        const boxes = doc.querySelectorAll('.Thumbnail_container__V0mxR')

        const results = []

        boxes.forEach(box => {
            const backgroundImage = box.querySelector('.Thumbnail_image__ucHEX').style.backgroundImage

            const imageUrl = 'https://http.cat/' + backgroundImage.slice(5, -1)

            const code = box.querySelector('.Thumbnail_title__RZPuS').textContent

            const text = box.querySelector('p').textContent

            const result = { imageUrl, code, text }
            results.push(result)
        })

        callback(null, results)
    }

    

    xhr.error = () => callback(new Error('connection error'))
    // request
    xhr.open('GET', 'https://http.cat')
    xhr.send()
}
module.exports = scrapeHttpCat