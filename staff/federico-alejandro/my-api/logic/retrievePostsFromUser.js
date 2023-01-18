const { readFile } = require('fs')

/**
 * Retrieves all posts from a specific user
 * 
 * @param {string} userId The user id
 * @param {string} targetUserId The target user id to retrieve posts from
 * @param {function} callback The callback function
 */
function retrievePublicPosts(userId, targetUserId, callback) {//targetUserId = persona (objetivo) que quiero ver
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')
    if (typeof targetUserId !== 'string') throw new TypeError('targetUserId is not a string')
    if (!targetUserId.length) throw new Error('targetUserId is empty')
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

        const targetUser = users.find(user => user.id === targetUserId)

        if (!targetUser) {
            callback(new Error(`target user with id ${targetUserId} does not exist`))

            return
        }

        readFile('./data/posts.json', 'utf8', (error, json) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(json)

            const targetPosts = posts.filter(post => {
                if (post.visibility === 'public' && post.user === targetUserId) {
                    delete post.visibility
                    delete post.user

                    return true
                }

                return false
            })

            targetPosts.sort((a, b) => a.date > b.date? -1 :  a.date < b.date? 1 : 0)

            callback(null, targetPosts)
        })
    })
}

module.exports = retrievePublicPosts