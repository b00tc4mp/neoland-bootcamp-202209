const { useState, useEffect } = React

function Header(props) {
    log.info('Header -> render')

    const [toggleButtonText, setToggleButtonText] = React.useState('menu')



    useEffect(() => {
        log.info('Header -> componentDidMount')

        return () => log.info('Header -> effect "componentWillUnmount"')
    }, [])

    useEffect(() => log.info('Header -> effect "componentWillReceiveProps"'), [props])

    const handleNavigateToTasks = event => {
        log.info('Header -> handleNavigateToTasks')

        event.preventDefault()

        props.onNavigateToTasks()
    }

    const handleToggleMenu = () => {
        log.info('Header -> handleToggleMenu')

        setToggleButtonText(toggleButtonText === 'menu' ? 'close' : 'menu')

    }

    const handleNavigateToSettings = event => {
        log.info('Header -> handleNavigateToSettings')

        event.preventDefault()

        setToggleButtonText('menu')

        props.onNavigateToSettings()
    }

    const handleLogout = () => {
        log.info('Header -> handleLogout')

        props.onLogout()
    }

    return <header className="flex flex-col fixed w-full">
        <div className="flex justify-between">
            <span className="font-extrabold italic text-2xl my-8 ml-3">
                {user && user.name}
            </span>
            <a href="" onClick={handleNavigateToTasks}>
                <img src="https://1000logos.net/wp-content/uploads/2021/05/Trello-logo.png" className=" h-20 w-30 mr-20" /></a>
            <button className="flex flex-col justify-center material-symbols-outlined" onClick={handleToggleMenu}>{toggleButtonText}</button>
        </div>
        {/*si se muestra los elementos del settings, el menu se muetra como close(X) y sino se muestra el icono de menu*/}
        {toggleButtonText === 'close' &&
            <div className="flex flex-col items-end">
                <a className="items-end material-symbols-outlined" href="" onClick={handleNavigateToSettings}>settings</a>
                <button className=" material-symbols-outlined" onClick={handleLogout}>logout</button>
            </div>}
    </header>
}