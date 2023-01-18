// /**
//  * Creates a post against API
//  * 
//  * @param {string} token The user token
//  * @param {string} text The post text
//  * @param {string} visibility The comment visibility
//  * @param {callback} callback The callback to attend the result
//  */
//  function createComment(token, text, visibility, callback) {
//     if (typeof token !== 'string') throw new TypeError('token is not a string')
//     if (!token.length) throw new Error('token is empty')
//     if (typeof text !== 'string') throw new TypeError('text is not a string')
//     if (!text.length) throw new Error('text is empty')
//     if (typeof visibility !== 'string') throw new TypeError('visibility is not a string')
//     if (!visibility.length) throw new Error('visibility is empty')
//     if (visibility !== 'public' && visibility !== 'private') throw new Error('invalid visibility')

//     if (!callback)
//         return new Promise((resolve, reject) => {
//             const xhr = new XMLHttpRequest()

//             xhr.onload = () => {
//                 const { status, responseText: json } = xhr

//                 if (status >= 500) {
//                     const { error } = JSON.parse(json)

//                     reject(new Error(error))

//                     return
//                 }

//                 resolve()
//             }

//             xhr.onerror = () => reject(new Error('connection error'))

//             xhr.open('POST', 'http://localhost/posts')
//             xhr.setRequestHeader('Authorization', `Bearer ${token}`)
//             xhr.setRequestHeader('Content-Type', 'application/json')

//             const payload = { text, visibility }

//             const json = JSON.stringify(payload)

//             xhr.send(json)
//         })


//     if (typeof callback !== 'function') throw new TypeError('callback is not a function')
//     const xhr = new XMLHttpRequest()

//     xhr.onload = () => {
//         const { status, responseText: json } = xhr

//         if (status >= 500) {
//             const { error } = JSON.parse(json)

//             callback(new Error(error))

//             return
//         }

//         callback(null)
//     }

//     xhr.onerror = () => callback(new Error('connection error'))

//     xhr.open('POST', 'http://localhost/posts')
//     xhr.setRequestHeader('Authorization', `Bearer ${token}`)
//     xhr.setRequestHeader('Content-Type', 'application/json')

//     const payload = { text, visibility }

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

// export default createComment