// import { useNavigate , Link } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import { errors } from 'com'
// import retrieveUser from '../logic/retrieveUser'
// import Context from '../components/Context'
// import { useContext } from 'react'
// import logo from '../img/logo.jpg'
// import retrieveUsers from '../logic/retrieveUsers'
// import UpdateUserRole from '../components/UpdateUserRole'


// const { FormatError, AuthError, LengthError, NotFoundError } = errors

// function Users() {

//     const { showAlert } = useContext(Context)

//     const [user, setUser] = useState()
//     const [users, setUsers] = useState([])
//     const [role, setRole] = useState()


//     useEffect(() => {
//         userRetrieve()
//         usersRetrieve()
//     }, [])

//     const userRetrieve = () => {
//         try {
//             retrieveUser(sessionStorage.token)
//                 .then(user => {
//                     setUser(user)
//                 })

//                 .catch(error => {
//                     if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
//                         showAlert(error.message, 'warn')
//                     else if (error instanceof AuthError || error instanceof NotFoundError)
//                         showAlert(error.message, 'error')
//                     else
//                         showAlert(error.message, 'fatal')
//                 })
//         } catch (error) {
//             if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
//                 showAlert(error.message, 'warn')
//             else
//                 showAlert(error.message, 'fatal')
//         }
//     }

//     const usersRetrieve = () => {
//         try {
//             retrieveUsers(sessionStorage.token)
//                 .then(users => {
//                     setUsers(users)
//                 })
//                 .catch(error => {
//                     if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
//                         showAlert(error.message, 'warn')
//                     else if (error instanceof AuthError)
//                         showAlert(error.message, 'error')
//                     else if (error instanceof NotFoundError) {
//                         setUsers()
//                     } else
//                         showAlert(error.message, 'fatal')
//                 })
//         } catch (error) {
//             if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
//                 showAlert(error.message, 'warn')
//             else
//                 showAlert(error.message, 'fatal')
//         }
//     }

//     const handleRole = () => {
//         setRole(true)
        
//     }
  
//     return <main className="h-full">
//         <header className='h-1/6 top-0 flex justify-around items-center bg-teal-600	'>
//         <Link to="/"><img src={logo} className='w-20 h-20 cursor-pointer'/></Link>
//             <h1>USERS</h1>
//             <div className='border-2 border-black'>Log Out</div>
//         </header>
//         <div>
//             <ul>
//             {users.map(user => {
//                 return <article key={user.id}>
//                  <li>{user.name},  {user.email},  {user.role}, <button  onClick={handleRole} className='border-2 border-black'>edit</button></li>
//                  {/* {role && <UpdateUserRole usuario={user.id} onClose={()=>setRole()} onUpdated={()=> setRole()}/>} */}              
//                  </article>
//             })}
//             </ul>
//         </div>
//         {role && <UpdateUserRole onClose={()=>setRole()} onUpdated={()=> setRole()}/>}

//     </main>

// }

// export default Users