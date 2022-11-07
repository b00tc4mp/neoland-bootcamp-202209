log('DEBUG', 'mount register')

const registerForm = document.createElement('form')
registerForm.className = 'container'

registerForm.onsubmit = function (event) {
    event.preventDefault()

    log('DEBUG', 'submit register')

    const name = registerNameInput.value
    const email = registerEmailInput.value
    const password = registerPasswordInput.value

    try {
        registerUser(name, email, password)

        registerForm.reset()

        alert('user registered')

        registerLoginLink.click()
    } catch (error) {
        alert(error.message)

        registerPasswordInput.value = ''
    }
}

const registerNameLabel = document.createElement('label')
registerNameLabel.htmlFor = 'register-name'
registerNameLabel.className = 'container__item--left'
registerNameLabel.innerText = 'Name'

const registerNameInput = document.createElement('input')
registerNameInput.type = 'name'
registerNameInput.id = 'register-name'
registerNameInput.placeholder = 'input your name'
// TODO refine this regex as it doesn't accept a composed name
// registerNameInput.pattern = '[a-zA-Z]{1,}'
registerNameInput.required = true
registerNameInput.oninvalid = function () {
    alert('Use characters from A to Z for names (min 1 character, and not numerics)')
}

const registerEmailLabel = document.createElement('label')
registerEmailLabel.htmlFor = 'register-email'
registerEmailLabel.className = 'container__item--left'
registerEmailLabel.innerText = 'E-mail'

const registerEmailInput = document.createElement('input')
registerEmailInput.type = 'email'
registerEmailInput.id = 'register-email'
registerEmailInput.placeholder = 'input your e-mail'
registerEmailInput.required = true

const registerPasswordLabel = document.createElement('label')
registerPasswordLabel.htmlFor = 'register-password'
registerPasswordLabel.className = 'container__item--left'
registerPasswordLabel.innerText = 'Password'

const registerPasswordInput = document.createElement('input')
registerPasswordInput.type = 'password'
registerPasswordInput.id = 'register-password'
registerPasswordInput.placeholder = 'input your password'
//registerPasswordInput.minLength = 8
// TODO improve following regex to support also symbols ($, %, ...)
registerPasswordInput.pattern = '[A-Za-z0-9\S]{8,}'
registerPasswordInput.required = true
registerPasswordInput.title = 'Use min 8 characters for the password and no spaces'

const registerSubmitButton = document.createElement('button')
registerSubmitButton.className = 'container__item--right'
registerSubmitButton.innerText = 'Register'

registerForm.append(registerNameLabel, registerNameInput, registerEmailLabel, registerEmailInput, registerPasswordLabel, registerPasswordInput, registerSubmitButton)

const registerLoginLink = document.createElement('a')
registerLoginLink.href = ""
registerLoginLink.innerText = 'Login'

registerLoginLink.onclick = function (event) {
    event.preventDefault()

    log('DEBUG', 'navigate to login')

    registerPage.remove()
    document.body.append(loginPage)
}

const registerPage = document.createElement('main')
registerPage.className = 'container'
registerPage.append(registerForm, registerLoginLink)
