const { readFile, writeFile } = require('fs')

module.exports = function(userId, postId, text, visibility, callback) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new Error('postId is empty')
    if (typeof text !== 'string') throw new TypeError('text is not a string')
    if (!text.length) throw new Error('text is empty')
    if (typeof visibility !== 'string') throw new TypeError('visibility is not a string')
    if (!visibility.length) throw new Error('visibility is empty')
    if (visibility !== 'public' && visibility !== 'private') throw new Error('invalid visibility')
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')


    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const userExists = users.some((user) => user.id === userId)

        if (!userExists) {
            callback(new Error(`user with id ${userId} does not exist`))

            return
        }

        readFile('./data/posts.json', 'utf8', (error, json) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(json)

            const post = posts.find(post => post.id === postId)

            if (!post) {
                callback(new Error(`post with id ${postId} does not exist`))

                return
            }

            if (post.user !== userId) {
                callback(new Error(`post with id ${postId} does not belong to user with id ${userId}`))

                return
            }

            post.text = text
            post.visibility = visibility
            post.date = new Date().toISOString()

            const newJson = JSON.stringify(posts, null, 4)

            writeFile('./data/posts.json', newJson, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })

    })
}
