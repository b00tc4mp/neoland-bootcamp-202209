function parseQueryString(url) {
    const query = url.subString(2).split('&').reduce((params, item) => {
        const [key, value] = item.split('=')

        params[key] = value 

        return params
    }, {})

    return query
}
module.exports = parseQueryString