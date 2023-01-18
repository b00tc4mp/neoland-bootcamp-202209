function Task(props) {
    log.info('Task -> render')

    const handleUpdateTaskText = (taskId, newText) => {
        log.info('Task -> handleUpdateTaskText')

        try {
            updateTaskText(user.email, taskId, newText)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeleteTask = taskId => {
        log.info('Task -> handleDeleteTask')

        try {
            deleteTask(user.email, taskId)

            props.onDeleteTask()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleUpdateTaskStatus = (taskId, newStatus) => {
        log.info('Task -> handleUpdateTaskStatus')

        try {
            updateTaskStatus(user.email, taskId, newStatus)

            props.onUpdateTaskStatus()
        } catch (error) {
            alert(error.message)
        }
    }

    return <article key={props.task.id}  className="rounded-lg bg-blue-600 border-2 p-1 text-white">
        <p suppressContentEditableWarning={true} contentEditable="true" onKeyUp={event => handleUpdateTaskText(props.task.id, event.target.innerText)}>{props.task.text}</p>
        <div className="flex justify-between">
            <button className="material-symbols-outlined" onClick={() => handleDeleteTask(props.task.id)}>delete</button>
            <select className="material-symbols-outlined w-4 bg-transparent" onChange={event => handleUpdateTaskStatus(props.task.id, event.target.value)} defaultValue="">
                <option disabled hidden className="text-sm" value="">width_normal</option>
                {props.task.status === 'todo' ? <>
                    <option className="text-xs text-black" value="doing">DOING</option>
                    <option className="text-xs text-black" value="done">D0NE</option>
                </>
                    :
                    props.task.status === 'doing' ? <>
                        <option className="text-xs text-black" value="todo">TODO</option>
                        <option className="text-xs text-black" value="done">D0NE</option>
                    </>
                        :
                        <>
                            <option className="text-xs text-black" value="todo">TODO</option>
                            <option className="text-xs text-black" value="doing">DOING</option>
                        </>
                }
            </select>
        </div>
    </article>
}