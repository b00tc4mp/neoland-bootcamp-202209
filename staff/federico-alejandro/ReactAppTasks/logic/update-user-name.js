/**
 * Update a user in DB
 * @param {string} oldName The old user name
 * @param {string} newName The new user name
 * @returns 
 */
function updateUserName(name, newName) {
     
    if (typeof newName !== 'string') throw new Error ('name is not a string')
    if (newName.length < 1) throw new Error('name length is less than 1')
    if (!IS_ALPHABETICAL_REGEX.test(newName)) throw new Error ('name is not alphabetical')

    for (let i= 0; i < users.length; i++) {
        const user = users[i]


        if (user.name === newName) {
            throw new Error('user with name ' + newName + ' already exists')
            
        }
    }
    
    for (let i= 0; i < users.length; i++) {
        const user = users[i]

        if (user.name === name) { 
            user.name = newName

            
        }
    }

    throw new Error('user with name ' + name + ' not found')
    
}