// function retrieveComment(token, commentId, callback) {
//     if (typeof token !== 'string') throw new TypeError('token is not a string')
//     if (!token.length) throw new Error('token is empty')
//     if (typeof commentId !== 'string') throw new TypeError('commentId is not a string')
//     if (!commentId.length) throw new Error('commentId is empty')

//     if (!callback)
//         return new Promise((resolve, reject) => {
//             const xhr = new XMLHttpRequest()

//             xhr.onload = function () {
//                 const { status, responseText: json } = xhr

//                 if (status >= 500) {
//                     const { error } = JSON.parse(json)

//                     reject(new Error(error))

//                     return
//                 }

//                 const comment = JSON.parse(json)

//                 resolve(comment)
//             }

//             xhr.onerror = () => reject(new Error('connection error'))

//             xhr.open('GET', `http://localhost/posts/${commentId}`)
//             xhr.setRequestHeader('Authorization', `Bearer ${token}`)
//             xhr.send()
//         })

//     if (typeof callback !== 'function') throw new TypeError('callback is not a function')
//     const xhr = new XMLHttpRequest()

//     xhr.onload = function () {
//         const { status, responseText: json } = xhr

//         if (status >= 500) {
//             const { error } = JSON.parse(json)

//             callback(new Error(error))

//             return
//         }

//         const post = JSON.parse(json)

//         callback(null, post)
//     }

//     xhr.onerror = () => callback(new Error('connection error'))

//     xhr.open('GET', `http://localhost/posts/${commentId}`)
//     xhr.setRequestHeader('Authorization', `Bearer ${token}`)
//     xhr.send()
// }

// export default retrieveComment
function retrievePublicComments(token, commentId) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new Error('token is empty')

    if (typeof commentId !== 'string') throw new TypeError('commentId is not a string')
    if (!commentId.length) throw new Error('commentId is empty')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = function () {
            const { status, responseText: json } = xhr

            if (status >= 500) {
                const { error } = JSON.parse(json)

                reject(new Error(error))

                return
            }

            const comments = JSON.parse(json)

            resolve(comments)
        }
        xhr.onerror = () => reject(new Error('connection error'))

        xhr.open('GET', 'http://localhost/posts/public')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.send()
    })
}
export default retrievePublicComments