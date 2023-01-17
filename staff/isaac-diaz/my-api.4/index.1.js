// importamos la función para crear el servidor del módulo http
const { createServer } = require('http')
// importamos la función para leer archivos en disco del módulo fs (fileSystem)
const { readFile } = require('fs')

const parseQueryString = require("./parseQueryString");

// creamos un servidor y le pasamos por parámetro una callback que establece qué va a hacer nuestro
// servidor cuando reciba una "http request" de un cliente

// la callback del createServer tiene 2 parámetros prefijados que son la request y la response

const api = createServer((req, res) => {
    // llamamos a readFile que lee un archivo en disco
    // ¡READ FILE ES ASÍNCRONO!
    // en el primer parámetro le paso el path
    // en el segundo parámetro le paso la codificación
    // en el tercer parámetro le paso una callback que se va a ejecutar cuando termine de leer

    readFile('db.json', 'utf8', (error, json) => {
        if (error) {
            // seteo headers en la response
            // status code 500
            // key: "Content-type" - value: "application/json"
            res.writeHead(500, { 'Content-type': 'application/json' })
            // llamamos al método end que envía la response
            // este método recibe por parámetro el body de la respuesta

            res.end(`{ "error": ${error.message} }`)
            // otra forma de hacerlo:
            // const jsonError = JSON.parse({ error: error.message });
            // res.end(jsonError);

            return
        }

        // si no hubo error setea el status 200 y el header json
        res.writeHead(200, { 'Content-type': 'application/json' })

        const { q } = parseQueryString(req.url)
        // const query = parseQueryString(req.url)
        // const q = queryString.q

        const data = JSON.parse(json)

        //TODO parse query string (param q)

        //TODO filter data by param q

        //TODO respond with the results
        const dataFiltered = data.filter();

        res.end(JSON.stringify(data))
    })
})

// el método listen prende el servidor en el número de puerto que le paso por parámetro
api.listen(8080)
console.log("server listen on port 8080")
// para inicializar el servidor con debugger utilizar el siguiente script:
// node --inspect-brk <filename>