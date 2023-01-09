function deleteTask(userId, taskId, callback) {
    if (typeof userId !== 'string') throw new Error('userId is not a string')
    if (typeof taskId !== 'string') throw new Error('taskId is not a string')
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        callback(null)
    }

    xhr.onerror = () => callback(new Error('connection error'))


    xhr.open('DELETE', `http://localhost/tasks/${taskId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    const payload = { userId, taskId }

    const json = JSON.stringify(payload)

    xhr.send(json)
}

export default deleteTask