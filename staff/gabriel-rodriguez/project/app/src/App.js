import Login from './pages/Login'
import Home from './pages/Home'
import Search from './pages/Search'
import SobreNosotros from './pages/SobreNosotros'
import UserProfile from './pages/UserProfile'
import log from './utils/coolog'
import Register from './pages/Register'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Context from './components/Context'
import Alert from './components/Alert'
import Test from './components/Maps'
import { ReactNotifications } from 'react-notifications-component'
import NavBar from './components/NavBar'


function App() {
  console.log('cargo app')
  log.info('App -> render')

  let emailTest = 'micorero';

  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.token)
  const [message, setMessage] = useState()
  const [level, setLevel] = useState()
  const [userEmail, setUserEmail] = useState()
  const navigate = useNavigate()



  const login = (token,email) => {
    sessionStorage.token = token
     
    setLoggedIn(true)
    console.log(email)
    if(email != null){
      setUserEmail(email)
      
    }

    navigate('/')
  }

  const logout = () => {
    delete sessionStorage.token

    setLoggedIn(false)
    console.log(sessionStorage)
  }

  const showAlert = (message, level) => {
    setMessage(message)
    setLevel(level)
  }

 



  const closeAlert = () => setMessage()

  return <Context.Provider value={{ login, logout, showAlert, }}>
    <ReactNotifications />
   
    {loggedIn ? 
    <>
      <NavBar />
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </>
      :
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
        <Route path="/test" element={<Test />} />
        <Route path="/search" element={<Search />} />
        
      </Routes>}

      {message && <Alert message={message} level={level} onClose={closeAlert} />}
  </Context.Provider>
}

export default App;
