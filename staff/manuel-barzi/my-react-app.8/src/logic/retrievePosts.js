export default function (userId, callback) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')
    
    if (!callback)
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest

            xhr.onload = function () {
                const { status, responseText: json } = xhr

                if (status >= 500) {
                    const { error } = JSON.parse(json)

                    reject(new Error(error))

                    return
                }

                const posts = JSON.parse(json)

                resolve(posts)
            }

            xhr.onerror = () => reject(new Error('connection error'))

            xhr.open('GET', 'http://localhost/posts')
            xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
            xhr.send()
        })

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        const posts = JSON.parse(json)

        callback(null, posts)
    }

    xhr.onerror = () => callback(new Error('connection error'))

    xhr.open('GET', 'http://localhost/posts')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
    xhr.send()
}