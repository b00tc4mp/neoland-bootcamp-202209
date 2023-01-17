const { XMLHttpRequest } = require("xmlhttprequest")
const { JSDOM } = require('jsdom')

const xhr = new XMLHttpRequest

//res
xhr.onload = () => {
    const html = xhr.responseText

    const dom = new JSDOM(html)

    const doc = dom.window.document

    const boxes = doc.querySelectorAll(".Thumbnail_container__V0mxR")

    const results = []

    boxes.forEach(box => {
        var backgroundImage = box.querySelector('.Thubnail_image_ucHEX').style.backgroundImage

        var imageUrl = 'http://http.cat/' + backgroundImage.slice(5, backgroundImage.length - 1)

       
        const result = { imageUrl }
        results.push(result)
    })

    console.log(JSON.stringify(results))

   
}

xhr.open("GET", "http://http.cat")
xhr.send()      