const { readFile } = require('fs')

/**
 * Retrieves a user
 * 
 * @param {string} userId The user id (requester)
 * @param {string} targetUserId The target user id to retrieve
 * @param {function} callback The callback function
 */
module.exports = function (userId, targetUserId, callback) {
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

        
        delete targetUser.password
        delete targetUser.id

        callback(null, targetUser)
    })
}