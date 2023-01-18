// importamos la funcion para crear el servidor del modulo http
const { createServer } = require('http')
//importamos la funcion para leer archivos en disco del modulo fs(fileSystem)
const { readFile } = require('fs')
const parseQueryString = require('./parseQueryString')//importo el archivo

//creamos un servidor y le pasamos por parametro una callback que establece que va hacer
//nuestro servidor cuando reciba una 'http request' de un cliente
//la callback de createServer tiene 2 parametros prefijados que son la request y la response
const api = createServer((req, res) => {
    readFile('db.json', 'utf8', (error, json) => {   //--------------->//llamamos a readFile(es asincrono) que lee un archivo en disco
        if (error) {                                                   //en el primer parametro le paso el path(archivo)
            res.writeHead(500, { 'Content-type': 'application/json' }) //en el segundo parametro le paso la codificacion
            //seteo headers en la response                             //en tercer lugar le paso una callback que se va a ejecutar cuando termine de leer
            //status code 500(error del servidor)
            //key: 'Content-type' - value:'application/json' devuelve respuesta en formato json
            res.end(`{"error": "${error.message}"}`)
            //llamamos al metodo end que envia la response, este metodo recibe por parametro el body de la respuesta 
            return
        }
        //si no hubo error setea el status 200 y el header json
        res.writeHead(200, { 'Content-type': 'application/json' })

        const data = JSON.parse(json)//transforma en objeto

        const { q, name, surname } = parseQueryString(req.url) // DONE parse query string (param q)

        let filtered = data
        if (q)
            filtered = filtered.filter(item => item.name.includes(q) || item.surname.includes(q) || item.email.includes(q) || item.phone.includes(q))

        if (name)
            filtered = filtered.filter(item => item.name.includes(name))

        if (surname)
            filtered = filtered.filter(item => item.surname.includes(surname))

        // TODO respond with the results
        res.end(JSON.stringify(filtered))//transforma en string
    })
})

api.listen(8080) //el metodo listen prende el servidor en el numero de puerto que le paso por parametro
// para inicializar el servidor con debugger utilizar el siguiente script:
// node --inspect-brk <filename> 