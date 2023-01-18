const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    fs.writeFile(process.argv[3], data, (err) => {
        if(err)
        console.log(err)

    })
   
})
/*const { readFile, writeFile } = require('fs')

const { argv: [, , from, to], memoryUsage } = process

console.log('before read', memoryUsage())

readFile(from, (error, content) => {
    if (error) {
        console.error(error.message)

        return
    }

    console.log('after read, before write', memoryUsage())

    writeFile(to, content, error => {
        if (error) {
            console.error(error.message)

            return
        }

        console.log('after write', memoryUsage())
    })
})*/
    