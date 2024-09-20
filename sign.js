import {
    createUserWithEmailAndPassword,
    getAuth
}
    from "./firebase.js"

    
    const sign = _ => {

    let firstName = document.getElementById("fName").value;
    let lastName = document.getElementById("lName").value;
    let email = document.getElementById("mail").value;
    let password = document.getElementById("pass").value;

    if (!firstName) {
        alert("First Name Not Found")
        return
    };
    if (!lastName) {
        alert("Last Name Not Found")
        return
    };
    if (!mail) {
        alert("Email Not Found")
        return
    };
    if (!pass) {
        alert("Password Not Found")
        return
    };
    if (pass.length <= 7) {
        alert("Password Must Be 8 Characters")
        return
    };

    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Email", mail);
    localStorage.setItem("Password", pass);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            alert("You're successfully registerd")
            window.location.replace("./index.html")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode,errorMessage)
        });
};
window.sign = sign