//CASE succeeds when user and task already exist

var user = {
    name: 'Plu To',
    email: 'plu@to.com',
    password: '123123123'
}

users.push(user)

var task = {
    id: 'task-1000',
    user: user.email,
    text: 'practice coding',
    status: 'doing'
}
tasks.push(task)

var res = updateTaskText(user.email, task.id, 'practice codign and drimk vitamins')

console.assert(res === undefined)

let foundTask

for (var i = 0; i < tasks.length && !foundTask; i++) {
    var _task = tasks[i]

    if (_task.id === task.id) {
        foundTask = _task
    }
}

console.assert(!!foundTask)
console.assert(foundTask.text === 'practice coding and drink vitamins')

//CASE fails when user dos not exist

var user = {
    name: 'Caca Tua',
    email: 'caca@tua.com',
    password: '123123123'
}

// users.push(user

var task = {
    id: 'task-1001',
    user: user.email,
    text: 'practice coding',
    status: 'doing'
}

tasks.push(task)

var _error = null

try {
    updateTaskText(user.email, task.id, 'practice coding and drink vitamins')
} catch (error) {
    _error = error
}

console.assert(_error instanceof Error)
console.assert(_error.message === 'user with email ' + user.email + ' not found')

//CASE fails when task does not exist

var user = {
    name: 'Ele Fante',
    email: 'ele@fante.com',
    password: '123123123'
}

users.push(user)

var task = {
    id: 'task=1002',
    user: user.email,
    text: 'practice coding',
    status: 'doing'
}

// tasks.push(task)
var _error = null

try {
    updateTaskText(user.email, task.id, 'practice coding and drink vitamins')
} catch (error) {
    _error = error
}
console.assert(_error instanceof Error)
console.assert(_error.message === 'task with id ' + task.id + ' not found')

// CASE fails when task does not exist

var user = {
    name: 'Ele Fante',
    email: 'ele@fante.com',
    password: '123123123'
}

users.push(user)

var task = {
    id: 'task-1003',
    user: 'pepito@grillo.com',
    text: 'practice coding',
    status: 'doing'
}

tasks.push(task)

var _error = null

try {
    updateTaskText(user.email, task.id, 'practice coding and drink vitamins')
} catch (error) {
    _error = error
}
console.assert(_error instanceof Error)
console.assert(_error.message === 'task with id ' + task.id + ' does not belong to user with email ' + user.email)
