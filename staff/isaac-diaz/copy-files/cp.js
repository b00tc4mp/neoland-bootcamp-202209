//TODO redo cp in npode ($ cp helloworld.txt), to make it run like: cp in node helloworld


//TIPS argv, readFile, writeFile 👀

//Metodo para copiar datos de alta ocupación mediante streaming

const { createReadStream, createWriteStream } = require('fs')

const { argv: [, , from, to], memoryUsage } = process

console.log('Before stream', memoryUsage())

const rs = createReadStream(from)

const ws = createWriteStream(to)

rs.pipe(ws)

ws.on('finish', () => console.log('after stream', memoryUsage()))

