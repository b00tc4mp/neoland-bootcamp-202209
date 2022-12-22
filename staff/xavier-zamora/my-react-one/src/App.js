import Login from './pages/Login'
import { useState } from 'react'
import Home from './pages/Home'
import log from './utils/coolog'
import Register from './pages/Register'
import Launcher from './pages/Launcher'

function App() {
  log.info('App -> render')

  const [view, setView] = useState('launcher')

  const navigateToHome = () => setView('home')

  const navigateToLogin = () => setView('login')

  const navigateToRegister = () => setView('register')

  const navigateToLauncher = () => setView('launcher')

  return <>
    {view === 'login' && <Login onLogin={navigateToHome} onNavigateToRegister={navigateToRegister} />}
    {view === 'register' && <Register onRegister={navigateToLogin} onNavigateToLogin={navigateToLogin} />}
    {view === 'home' && <Home />}
    {view === 'launcher' && <Launcher />}
  </>
}

export default App;