const scrapeHttpBatman = require('./scrape-batman')
const { writeFile } = require('fs')

scrapeHttpBatman((error, results) => {
    if(error) {
        console.error(error)

        return
    }
    const json = JSON.stringify(results, null, 1)

    writeFile('./db.json', json, error => { //funcion que escribe los datos de forma asincrona en el archivo que mencionemos 
        if (error) 
            console.error(error)
        
    })
})