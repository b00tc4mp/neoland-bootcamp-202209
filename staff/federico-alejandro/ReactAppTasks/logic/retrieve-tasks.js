function retrieveTasks(userEmail){
    if (typeof userEmail !== 'string') throw new Error('email is not a string')
    if (!IS_EMAIL_REGEX.test(userEmail)) throw new Error('email is not valid')

    let found = false

   for ( let i = 0; i < users.length && !found; i++) {
        const user = users[i]
        
        if (user.email === userEmail)
           found = true
   }
   // if not found then..
   if (!found) throw new Error ('user with email ' + userEmail + ' not found' )
    
   const filteredTasks = []

   for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]

       if (task.user === userEmail)
       filteredTasks.push(task)
   }

    return filteredTasks
}