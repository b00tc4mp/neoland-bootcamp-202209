// CASE succeeds on existing user and task
{
    const user = {
        name: 'Carlo Mango',
        email: 'carlo@mango.com',
        password: '123123123'
    }
    users.push(user)

    const task = {
        id: 'task-3000',
        user: user.email,
        text: 'code code and code',
        status: 'doing'
    }

    //tasks.push(task)
    tasks[3] = task

    const res = deleteTask(user.email, task.id)

    console.assert(res === undefined)

    let found = false

    for (let i = 0; i < tasks.length && !found; i++) {
        const _task = tasks[i]

        if (_task.id === task.id)
            found = true
    }

    console.assert(!found)
}

// TODO add more test cases (unhappies)