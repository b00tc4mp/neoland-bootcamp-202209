export default function (token, targetUserId, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new Error('token is empty')
    if (typeof targetUserId !== 'string') throw new TypeError('targetUserId is not a string')
    if (!targetUserId.length) throw new Error('targerUserId is empty')

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

                const user = JSON.parse(json)

                resolve(user)

            }

            xhr.open('GET', `http://localhost/users/${targetUserId}`)
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
            xhr.send()

        })   

}


