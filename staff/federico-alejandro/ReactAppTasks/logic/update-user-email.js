/**
 * Update a user in DB
 * @param {string} oldEmail The old user email
 * @param {string} newEmail The new user email
 * @returns 
 */

function updateUserEmail(userEmail, newEmail) { // Estaba email, los 2 primeros if no
    if (typeof userEmail !== 'string') throw new TypeError('userEmail is not a string')
    if (!IS_EMAIL_REGEX.test(userEmail)) throw new Error('userEmail is not valid')

    if (typeof newEmail !== "string") throw new Error("newEmail is not string");
    if (!IS_EMAIL_REGEX.test(newEmail)) throw new Error("newEmail is not valid");

    for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if (user.email === newEmail)
            throw new Error('user with e-mail ' + newEmail + ' already exists')
    }

    for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if (user.email === userEmail) {
            user.email = newEmail

            for (let j = 0; j < tasks.length; j++) {
                const task = tasks[j]

                if (task.user === userEmail) {
                    task.user = newEmail
                }
            }

            return
        }
    }

    throw new Error('user with e-mail ' + userEmail + ' not found')
}