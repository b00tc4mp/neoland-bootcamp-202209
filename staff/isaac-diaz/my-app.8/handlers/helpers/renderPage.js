module.exports = function renderPage(body) {
    return `<html>
    <head>
        <title>Http Cats App</title>
        <link href="/style.css" rel="stylesheet" />
    </head>
    <body class="flex flex-col items-center">
        ${body}
    </body>
</html>`
}