log("DEBUG", "mount register");

 // la variable divContainer es igual a - un elemento div en el documento
// la variable divContainer tiene una class llamada 'contaniner'
var registerPage = document.createElement("div");
registerPage.classList = "RegisterContainer";

var registerForm = document.createElement("form");
// registerForm.method = 'post'

registerForm.onsubmit = function (event) {
  event.preventDefault();
  //previene que el navegador por defecto refresque la página cuando se realiza el submit de los datos

  var name = registerInputName.value
  var email = registerInputEmail.value
  var password = registerInputPasword.value

  const result = registerUser(name, email, password)

  if (result instanceof Error){
    alert(result.message)

    return
  }

  registerForm.reset();

  alert("user registered");

  registerAnchor.click();
};

var registerH1 = document.createElement("h1");
registerH1.innerText = "REGISTER";

var registerLine = document.createElement("hr");

var registerDivName = document.createElement("div");
registerDivName.classList.add("input", "name");

var registerLabelName = document.createElement("label");
registerLabelName.htmlFor = "name";
registerLabelName.innerHTML = "Name";

var registerInputName = document.createElement("input");
registerInputName.type = "name";
registerInputName.name = "name";
registerInputName.id = "name";
registerInputName.placeholder = "Input your name";
registerInputName.pattern = '[a-zA-Z]{1,}';
registerInputName.required = true;
registerInputName.oninvalid = function() {
  alert('Use characters from A to Z for names (min 1 character, and not numerics)')
}

var registerDivEmail = document.createElement("div");
registerDivEmail.classList.add("input", "email");

var registerLabelEmail = document.createElement("label");
registerLabelEmail.htmlFor = "registerEmail";
registerLabelEmail.innerText = "E-mail";

var registerInputEmail = document.createElement("input");
registerInputEmail.type = "email";
registerInputEmail.name = "email";
registerInputEmail.id = "registerEmail";
registerInputEmail.placeholder = "input your email";
registerInputEmail.required = true;

var registerDivPassword = document.createElement("div");
registerDivPassword.classList.add("input", "password");

var registerLabelPassword = document.createElement("label");
registerLabelPassword.htmlFor = "registerPassword";
registerLabelPassword.innerText = "Pasword";

var registerInputPasword = document.createElement("input");
registerInputPasword.type = "password";
registerInputPasword.name = "password";
registerInputPasword.id = "registerPassword";
registerInputPasword.placeholder = "Input your password";
registerInputPasword.required = true
registerInputPasword.minLength = 8
registerInputPasword.title = 'Use min 8 characters for the password'

var registerButton = document.createElement("button");
registerButton.innerText = "Register";

var registerAnchor = document.createElement("a");
registerAnchor.className = "loginLink";
registerAnchor.innerText = "Log In";

registerPage.append(
  registerH1,
  registerLine,
  registerForm,
  registerAnchor
);
registerForm.append(
  registerDivName,
  registerDivEmail,
  registerDivPassword,
  registerButton
);
registerDivName.append(registerLabelName, registerInputName);
registerDivEmail.append(registerLabelEmail, registerInputEmail);
registerDivPassword.append(registerLabelPassword, registerInputPasword);

// al hacer click en la variable registerAnchor que es un enlace.
registerAnchor.onclick = function (event) {
  event.preventDefault();

  log("DEBUG", "navigate to login");

  registerPage.remove();
  document.body.append(loginPage);
  document.body.className = "body-login"
};