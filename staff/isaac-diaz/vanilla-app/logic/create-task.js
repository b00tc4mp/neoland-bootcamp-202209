function createTask(userEmail) {
    
    if (typeof userEmail !== 'string') throw new Error('email is not string')
    if (!IS_EMAIL_REGEX.test(userEmail)) throw new Error('email is not valid')

    let found = false

    for(let i = 0; i < users.length && !found; i++) {
        const user = users[i]

        if(user.email === userEmail)
        found = true
    }

    if (!found) throw new Error('user with email ' + userEmail + ' not found')

    let nextTaskId

    if(tasks.length === 0) {
        nextTaskId = "task-1"
    } else {
        const lastIndex = tasks.length - 1
        const lastTask = tasks[lastIndex]
        const lastTaskId = lastTask.id
    
        const countString = lastTaskId.substring(5)
        const count = parseInt(countString)
        
        const nextCount = count + 1
        nextTaskId = 'task-' + nextCount
    }

    const task = {
        id: nextTaskId,
        user: userEmail,
        text: '',
        status:'todo'
    }

    tasks.push(task)   
}

