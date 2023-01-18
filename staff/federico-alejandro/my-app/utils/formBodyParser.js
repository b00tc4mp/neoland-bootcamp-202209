module.exports = (req, res, next) => {
    let content = ''

    req.on('data', chunk => content += chunk.toString())

    req.on('end', () => {
        const body = content.split('&').reduce((body, keyValue) => {
            const [key, value] = keyValue.split('=')

            body[key] = value

            return body
        }, {})

        req.body = body

        next()
    })
}