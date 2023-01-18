var { XMLHttpRequest } = require('xmlhttprequest')
var { JSDOM } = require('jsdom')


function scrapeHttpBatman(callback) {
    xhr = new XMLHttpRequest()

    xhr.onload = () => {
        var html = xhr.responseText

        var dom = new JSDOM(html)

        var doc = dom.window.document

        var boxes = doc.querySelectorAll('.productBlock') //div class contenedor del producto
        //seleccionados todo lo que esta dentro de la caja
        var results = []

        boxes.forEach(box => {
            var imageUrl = box.querySelector('img').src //de la imagen queremos el src

            var name = box.querySelector('.productBlock_productName').textContent//tomamos el nombre de cada personaje

            var title = name.substring(27, name.length - 28)//acortamos el titulo

            var price = box.querySelector('.productBlock_priceValue').textContent // tomamos el precio de cada producto

            var result = { imageUrl, title, price }
            results.push(result)
        })

        callback(null, results)

    } //https://www.zavvi.es/brands/hot-toys/batman.list
    xhr.error = () => callback(new Error('connection error'))
    //abrimos la peticion 
    xhr.open('GET', 'https://www.zavvi.es/brands/hot-toys/batman.list')
    xhr.send() //envio de peticion
}
module.exports = scrapeHttpBatman
    

    