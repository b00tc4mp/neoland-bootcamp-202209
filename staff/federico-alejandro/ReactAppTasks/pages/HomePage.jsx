const { useState, useEffect } = React

function HomePage(props) {
    log.info('HomePage -> render')

    const [view, setView] = useState('tasks')
    const [timestamp, setTimestamp] = useState(Date.now())

    useEffect(() => {
        log.info('Home -> effect "componentDidMount"')

        return () => log.info('Home -> efffect "componentWillUnmount"')

    }, [])

    useEffect(() => log.info('Home -> effect "componentWillReceiveProps"'), [props])

    const handleLogout = () => {
        log.info('Home -> handleLogout')

        user = null

        props.onLogout()
    }

    const handleNavigateToSettings = () => {
        log.info('Home -> handleNavigateToSettings')

        setView('settings')
    }

    const handleNavigateToTasks = () => {
        log.info('Home -> handleNavigateToTasks')

        setView('tasks')
    }

    return <main className="min-h-screen w-full ">
        <Header
            onNavigateToTasks={handleNavigateToTasks}
            onNavigateToSettings={handleNavigateToSettings}
            onLogout={handleLogout}
            view={view}
            
        />

        {view === 'tasks' && <Tasks />}

        {view === 'settings' && <Settings />}
    </main>
}
