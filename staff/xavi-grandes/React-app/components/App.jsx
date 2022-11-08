class App extends React.Component {
  constructor() {
    super();

    this.state = {
      view: "login",
    };
  }

  navigateToRegister = () => {
    this.setState ({view: "register"}) 
  };

  navigateToLogin = () => {
    this.setState ({view: "login"})
  }

  navigateToHomePage = () => {
    this.setState ({view: "home"})
  }

  render() {
    return (
      <>
        {this.state.view === "login" && <LoginPage onRegisterClick={this.navigateToRegister} onLoggedIn={this.navigateToHomePage} />}

        {this.state.view === "register" && <RegisterPage onLoginClick={this.navigateToLogin} onRegisterSubmit={this.navigateToLogin} />}

        {this.state.view === "home" && <HomePage onLoggedOut={this.navigateToLogin} />}
      </>
    );
  }
}
