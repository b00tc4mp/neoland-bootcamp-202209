module.exports = function(url) {
    // req.url -> '/?name=Pepito&surname=Grillo'
    const query = url.substring(2).split('&').reduce((params, item) => {
        const[key, value] = item.split('=')

        params[key] = value

        return params
    }, {})

    return query
}