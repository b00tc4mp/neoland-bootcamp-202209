//TODO redo cp in npode ($ cp helloworld.txt), to make it run like: cp in node helloworld


//TIPS argv, readFile, writeFile 👀

//Metodo para copiar datos de baja ocupación

const fs = require('fs')
fs.readFile(process.argv[2], 'UTF-8', (error, data) => {
    if (error) {
        console.error(error.message)
        return
    }

    fs.writeFile(process.argv[3], data, (error) => {
        if (error) {
            console.error(error.message)
            return
        }
    })
})
