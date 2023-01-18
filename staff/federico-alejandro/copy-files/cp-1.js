const { createReadStream, createReadStream, createWriteStream} = require('fs')

const { argv: [, , from, to], memoryUsage} = process

console.log('before stream', memoryUsage())

const rs = createReadStream(from)
const ws = createWriteStream(to)

rs.pipe(ws)

ws.on('finish', () => console.log('after stream', memoryUsage()))