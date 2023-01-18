const xhr = new XMLHttpRequest

xhr.onload = () => {
    const json = xhr.responseText

    const data = JSON.parse(json)

    console.log(data)
}

xhr.open('GET', 'http://localhost:8080')

xhr.send()