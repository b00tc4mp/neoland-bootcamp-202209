class App extends React.Component {
    constructor() {
        log('INFO', 'App -> constructor')

        super()

        this.state = { view: 'register' }
    }

    componentDidMount() {
        log('INFO', 'App -> componentDidMount')
    }

    componentWillUnmount() {
        log('INFO', 'App -> componentWillUnmount')
    }

    navigateToRegister = () => this.setState({ view: 'register' })

    navigateToLogin = () => this.setState({ view: 'login' })

    navigateToHome = () => this.setState({ view: 'home' })

    render() {
        log('INFO', 'App -> render')

        return <>
            {this.state.view === 'login' && <LoginPage onRegisterClick={this.navigateToRegister} onLoggedIn={this.navigateToHome} />}
            
            {this.state.view === 'register' && <RegisterPage onLoginClick={this.navigateToLogin}  onRegisterUser={this.navigateToLogin}/>}

            {this.state.view === 'home' && <HomePage onLoggedout ={this.navigateToLogin} />}
        </>
    }
}