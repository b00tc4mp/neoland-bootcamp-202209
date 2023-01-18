const { useState, useEffect } = React

function Tasks(props) {
    log.info('Tasks -> constructor')

    const [tasks, setTasks] = useState([])
    const [time, setTime] = useState(new Date().toDateString('es-ES'))

    // this.state = {
    //     tasks: [],
    //     time: new Date().toLocaleString('es-ES')


    useEffect(() => {
        log.info('Tasks -> effect "componentDidMount"')

        return () => log.info('Tasks -> effect "componentWillUnmount"')

    }, [])

    useEffect(() => {
        log.info('Tasks ->  effect "componentWillReceiveProps"')

        handleRefreshTasks()
    }, [props])

    const handleRefreshTasks = () => {
        log.info('Tasks -> handleRefreshTasks')

        try {
            const tasks = retrieveTasks(user.email)

            setTasks(tasks)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleAddTask = () => {
        log.info('Tasks -> handleAddTask')

        try {
            createTask(user.email)

            const tasks = retrieveTasks(user.email)

            setTasks(tasks)
        } catch (error) {
            alert(error.message)
        }
    }

    return <section className="mt-24 flex flex-col items-center gap-4">
        <h2 className="text-3xl font-extrabold italic">Tasks</h2>
        <time className="font-extrabold m-2 underline">{time}</time>
        <div className="flex flex-col sm:flex-row gap-x-44">
            <section className="flex flex-col h-fit rounded-lg border-blue-600 order-inherit gap-2 w-72 border-4 p-2">
                <h2 className="font-extrabold">TODO</h2>
                {/*se aplica filter que devuelve un array y sobre ese nuevo array se aplica el metodo map  */}
                {tasks.filter(task => task.status === 'todo').map(task =>
                    <Task key={task.id}
                        task={task}
                        onDeleteTask={handleRefreshTasks}
                        onUpdateTaskStatus={handleRefreshTasks} />)}
            </section>
            <section className="flex flex-col h-fit border-4 border-blue-600 rounded-lg order-inherit w-72 p-2 gap-2">
                <h2 className="font-extrabold">DOING</h2>
                {tasks.filter(task => task.status === 'doing').map(task => <Task
                    key={task.id}
                    task={task}
                    onDeleteTask={handleRefreshTasks}
                    onUpdateTaskStatus={handleRefreshTasks} />)}
            </section>
            <section className="border-4 h-fit rounded-lg border-blue-600 order-inherit w-72 p-2 gap-2">
                <h2 className="font-extrabold">DONE</h2>
                {tasks.filter(task => task.status === 'done').map(task => <Task
                    key={task.id}
                    task={task}
                    onDeleteTask={handleRefreshTasks}
                    onUpdateTaskStatus={handleRefreshTasks} />)}
            </section>
        </div>
        <div className="flex flex-col items-center text-white my-2 border-1 p-2 mx-10 font-semibold italic rounded-full bg-blue-600 rounded-x1 shadow-2xl shadow-gray-900">
            <button onClick={handleAddTask}>+ Add task</button>
        </div>
    </section>

}
