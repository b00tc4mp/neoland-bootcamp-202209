const { readFile } = require("fs")

function searchHttpBatman(query, callback) {
    if (typeof query !== 'string') throw new TypeError('query is not a string')
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    readFile('./db.json', 'utf8', (error, json) => {
        if(error) {
            callback(error)

            return
        }

        const personajes = JSON.parse(json)

        const filtered = personajes.filter(personaje => personaje.code.includes(query) || personaje.text.includes(query))

        callback(null, filtered)

    })
}
module.exports = searchHttpBatman