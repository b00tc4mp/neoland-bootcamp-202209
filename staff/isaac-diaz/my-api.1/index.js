// importamos la función para crear el servidor del módulo http
const { createServer } = require("http")
// importamos la función para leer archivos en disco del módulo fs (fileSystem)
const { readFile } = require("fs")

function parseQueryStringFromUrl (url) {
    // req.url -> '/?name=Pepito&surname=Grillo'
    const query = url.substring(2).split('&').reduce((params, item) => {
        const[key, value] = item.split('=')

        params[key] = value

        return
    }, {})

    return query
}

 const api = createServer((req, res) => {
    readFile("db.json", "utf8", (error, json) => {
        if (error) {
            res.writeHead(500, { 'Content-type': 'applicaton/json' })
            
            res.end(`{"error": ${error.message} }`)

            return
        }

        const data = JSON.parse(json)

        const { q, name, surname } = parseQueryStringFromUrl(req.url)
        
        let filtered = data

        if (q)
            filtered = filtered.filter(item => item.name.includes(q) ||
                item.surname.includes(q) ||
                item.email.includes(q) ||
                item.phone.includes(q))

        if (name)
            filtered = filtered.filter(item => item.name.includes(name))

        if (surname)
            filtered = filtered.filter(item => item.surname.includes(surname))

        res.status(200)

        res.setHeader('Content-type', 'aplication/json')

        res.json(filtered)
    })
})

// el método listen prende el servidor en el número de puerto que le paso por parámetro
api.listen(8080)
console.log("server listen on port 8080")
// para inicializar el servidor con debugger utilizar el siguiente script:
// node --inspect-brk <filename>