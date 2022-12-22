import { errors } from 'com'

const { ConflictError } = errors

/**
 * Create list box on the home
 * @param {string} listId 
 * @param {string} title 
 */

export default function (listId, title) {
    if(typeof listId !== 'string') throw new TypeError('listId is not a string')
    if(!listId.length) throw new Error('listId is empty')

    if(typeof title !== 'string') throw new TypeError ('title is not a string')
    if(!title.length) throw new Error ('title is empty')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const {status, responseText: json } = xhr

            if (status === 201)
                resolve()
            else if (status === 409) {
                const { error } = JSON.parse(json)
                
                reject(new ConflictError(error))
            } else if (status < 500){
                const { error } = JSON.parse(json)

                reject(new Error(error) )
            }
        }

        xhr.onerror = () => reject(new Error ('connection error'))

        xhr.open ('POST', `http://localhost/lists/${listId}/items`)
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { title }
        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}