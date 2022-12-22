/* eslint-disable import/no-anonymous-default-export */
export default function (token, flowId, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new Error('token is empty')
    if (typeof flowId !== 'string') throw new TypeError('flowId is not a string')
    if (!flowId.length) throw new Error('flowId is empty')

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

                const flow = JSON.parse(json)

                resolve(flow)
            }

            xhr.onerror = () => reject(new Error('connection error'))

            xhr.open('GET', `http://localhost/flow/${flowId}`)
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
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

        const appointment = JSON.parse(json)

        callback(null, appointment)
    }

    xhr.onerror = () => callback(new Error('connection error'))

    xhr.open('GET', `http://localhost/flow/${flowId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.send()
}