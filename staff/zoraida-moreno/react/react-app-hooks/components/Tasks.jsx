const { useState, useEffect } = React

function Tasks(props) {
    log.info('Tasks -> render')

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        log.info('Tasks -> effect "componentDidMount"')

        //handleRefreshTasks()

        return () => log.info('Tasks -> effect "componentWillUnmount"')
    }, [])

    useEffect(() => {
        log.info('Tasks -> effect "componentWillUnmount"')

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
    
    return <section className="flex flex-col items-center">
        <h2>Tasks</h2>
        <div className="flex flex-col sm:flex-row gap-4 space-x-24">
            <section className="flex flex-col gap-2 rounded-md p-2 bg-white w-50">
                <h2>TODO</h2>
                {tasks.filter(task => task.status === 'todo').map(task =>
                        <Task
                            key={task.id}
                            task={task}
                            onDeleteTask={handleRefreshTasks}
                            onUpdateTaskStatus={handleRefreshTasks}
                        />
                    )}
            </section>
            <section className="rounded-md p-2 bg-white w-50">
                <h2>DOING</h2>
                {tasks.filter(task => task.status === 'doing').map(task => <Task
                        key={task.id}
                        task={task}
                        onDeleteTask={handleRefreshTasks}
                        onUpdateTaskStatus={handleRefreshTasks}
                    />)}
            </section>
            <section className="rounded-md p-2 bg-white w-50">
                <h2>DONE</h2>
                {tasks.filter(task => task.status === 'done').map(task => <Task
                        key={task.id}
                        task={task}
                        onDeleteTask={handleRefreshTasks}
                        onUpdateTaskStatus={handleRefreshTasks}
                    />)}                
            </section>
        </div>
    </section>
}