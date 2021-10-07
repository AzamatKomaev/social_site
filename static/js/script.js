let emailField = document.querySelector('#id_email')
let usernameField = document.querySelector('#id_username')
let password1Field = document.querySelector('#id_password1')
let password2Field = document.querySelector('#id_password2')

try {
  console.log(emailField.value)
  console.log(usernameField.value)
  console.log(password1Field.value)
  console.log(password2Field.value)
} catch {
  console.log("error")
}
