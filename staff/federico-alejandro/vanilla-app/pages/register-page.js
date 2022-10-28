log('DEBUG', 'mount register')

const registerPage = document.createElement('main')
registerPage.className = 'container container--register'

registerPage.onsubmit = function(event) {
    event.preventDefault();
    
    log('DEBUG', 'submit register')

    const name = registerName.value
    const email =  registerEmail.value
    const password = registerPassword.value

    try {
        registerUser(name, email, password)
    
        registerForm.reset()

        alert('user registered')

        registerLoginLink.click()

    } catch (error) {
        alert(error.message)

        registerPassword.value = ''
    }
   
    //if (result instanceof Error) {
        //alert(result.message)
}

const registerLabelName = document.createElement('label')
registerLabelName.htmlFor = 'name'
registerLabelName.className = 'container__item--left'
registerLabelName.innerText = 'Name'
const registerName = document.createElement('input')
registerName.type = 'name'
registerName.name = 'name'
registerName.id = 'name'
registerName.placeholder = 'input your name'
registerName.pattern = '[A-Za-z]{1,}' 
registerName.requierd = true
registerName.oninvalid = function() {
    alert('Use characters from A to Z for names (min 1 character, and not numerics')
}


const registerLabelEmail = document.createElement('label')
const registerEmail = document.createElement('input')
registerLabelEmail.htmlFor = 'email'
registerLabelEmail.className = 'container__item--left'
registerLabelEmail.innerText = 'E-mail'
registerEmail.type = 'email'
registerEmail.name = 'email'
registerEmail.id = 'email'
registerEmail.placeholder = 'input your email'
registerEmail.required = true

const registerLabelPassword = document.createElement('label')
const registerPassword = document.createElement('input')
registerLabelPassword.className = 'container__item--left'
registerLabelPassword.htmlFor = 'Password'
registerLabelPassword.innerText = 'Password'
registerPassword.type = 'password'
registerPassword.name = ''
registerPassword.id = 'password'
registerPassword.placeholder = 'input your password'
//registerPassword.minLength = 8
// TODO improve following regex to support also symbols ($, %,..)
registerPassword.pattern = '[A-Za-z0-9\S]{8,}'
registerPassword.required = true
registerPassword.title = 'Use min 8 characters for the password and no spaces'


const registerButton = document.createElement('button')
registerButton.innerText = 'Register'

const registerLoginLink = document.createElement ('a')
registerLoginLink.href =""
registerLoginLink.innerText = 'login'
registerLoginLink.className = 'login--link'

registerLoginLink.onclick = function(event) {
    event.preventDefault()

    log('DEBUG', 'navigate to login')

    registerPage.remove()
    document.body.append(loginPage)
 }

const registerForm = document.createElement('form')
registerForm.className = 'container'
registerForm.append(registerLabelName, registerName, registerLabelEmail, registerEmail, registerLabelPassword, registerPassword, registerButton, registerLoginLink)
registerPage.append(registerForm)

