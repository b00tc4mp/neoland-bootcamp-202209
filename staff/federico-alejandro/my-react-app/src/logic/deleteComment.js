// /**
//  * Delete a comment against API
//  * 
//  * @param {string} token The user token
//  * @param {string} commentId The comment commentId
//  *@param {callback} callback The callback to attend the result
//  */
//  function deleteComment(token, commentId, callback) {
//     if (typeof token !== 'string') throw new TypeError('token is not a string')
//     if (!token.length) throw new Error('token is empty')
//     if (typeof commentId !== 'string') throw new TypeError('commentId is not a string')
//     if (!commentId.length) throw new Error('commentId is empty')

//     if (!callback)
//         return new Promise((resolve, reject) => {
//             const xhr = new XMLHttpRequest

//             xhr.onload = () => {
//                 const { status } = xhr

//                 if (status >= 500) {
//                     const { error } = JSON.parse(json)

//                     reject(new Error(error))

//                     return
//                 }

//                 resolve()
//             }

//             xhr.onerror = () => reject(new Error('connection error'))

//             xhr.open('DELETE', `http://localhost/posts/${commentId}`)
//             xhr.setRequestHeader('Authorization', `Bearer ${token}`)
//             xhr.setRequestHeader('Content-Type', 'application/json')

//             const payload = { commentId }

//             const json = JSON.stringify(payload)

//             xhr.send(json)
//         })

//     if (typeof callback !== 'function') throw new TypeError('callback is not a function')
//     const xhr = new XMLHttpRequest

//     xhr.onload = () => {
//         const { status } = xhr

//         if (status >= 500) {
//             const { error } = JSON.parse(json)

//             callback(new Error(error))

//             return
//         }

//         callback(null)
//     }

//     xhr.onerror = () => callback(new Error('connection error'))

//     xhr.open('DELETE', `http://localhost/posts/${commentId}`)
//     xhr.setRequestHeader('Authorization', `Bearer ${token}`)
//     xhr.setRequestHeader('Content-Type', 'application/json')

//     const payload = { commentId }

//     const json = JSON.stringify(payload)

//     xhr.send(json)
// }
// /**
//  * Attends the result of the post creation
//  * 
//  * @callback callback
//  * 
//  * @param {Error} error The authentication error
//  */

// export default deleteComment