import { getAuth, signInWithEmailAndPassword } from "./firebase.js"

const login = _ => {
  let mail = document.getElementById("mail")
  let pass = document.getElementById("pass")
  if (!mail.value) {
    alert("Email Not Found")
    return
  }
  if (!pass.value) {
    alert("Password Not Found")
    return
  }
  if (pass.value.length <= 7) {
    alert("Password Must Be 8 Characters")
    return
  }

  const auth = getAuth();
  signInWithEmailAndPassword(auth, mail.value, pass.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      window.location.replace("./main.html")
    })
    .catch((error) => {
      const errorCode = "May you arn't registerd or incorrect email / password ";
      const errorMessage = "May you arn't registerd or incorrect email or password ";
      alert(errorCode,errorMessage)
    });

};

const create = _ => {
  window.location.replace("./sign.html")
}

window.login = login
window.create = create