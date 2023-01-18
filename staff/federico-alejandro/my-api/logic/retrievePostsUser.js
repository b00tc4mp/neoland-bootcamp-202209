const { readFile } = require('fs')

/**
 * Retrieves user posts (private and public) by user id
 * 
 * @param {string} userId The user id
 * @param {string} the post id
 * @param {function} callback The callback that handles the result
 */
function retrievePostsUser(userId, postId, callback) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} does not exist`))

            return
        }

        readFile('./data/posts.json', 'utf8', (error, json) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(json)

            const postsFiltered = posts.filter(post => {
                //post.id === postId
                if (post.user === userId ) { //post.user === userId userId === post.userId
                    delete post.visibility

                    const user = users.find(user => user.id === post.user)

                    const { id, name } = user
                    post.user = { id, name }

                    return true
                }

                return false

            })

            postsFiltered.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)

            callback(null, postsFiltered)
        })
    })
}

module.exports = retrievePostsUser