import log from '../utils/coolog'
import registerUser from '../logic/registerUser'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../components/Context'
import { errors } from 'com'
const { FormatError, LengthError, ConflictError } = errors

function Register() {
    log.info('Register -> render')

    const navigate = useNavigate()
    const { showAlert } = useContext(Context)

    const handleRegister = event => {
        log.info('Register -> handleRegister')

        event.preventDefault()

        const { name: { value: name }, email: { value: email }, password: { value: password } } = event.target
        
        try {
            registerUser(name, email, password)
                .then(() => navigate('/login'))
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof ConflictError)
                        showAlert(error.message, 'error')
                    else
                        showAlert(error.message, 'fatal')
                })
        } catch (error) {

            showAlert(error.message, 'warn')

            event.target.password.value = ''
        }
    }

    return <center>
                <main class="form-signin w-100 m-auto">
                    <form onSubmit={handleRegister}>
                    
                    <h1 class="h3 mb-3 fw-normal">Registro</h1>
                    <div class="form-floating">
                        <input type="name" name="name" class="form-control inputForm" id="floatingInput" placeholder="Nombre ..." />
                    </div>
                    <div class="form-floating">
                        <input type="email" name="email" class="form-control inputForm" id="floatingInput" placeholder="name@example.com" />
                    </div>
                    <div class="form-floating">
                        <input type="password" name="password" class="form-control inputForm" id="floatingPassword" placeholder="Contraseña ..."/>
                        
                    </div>
                
                    
                    <button className="p-2 border rounded-xl hover:animate-spin">Registro</button>
                    
                    </form>
                    <Link to="/login" className="underline">Login</Link>
                </main>
            </center>

    
}

export default Register