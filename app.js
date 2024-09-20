import {
    db,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
}
    from "./firebase.js"

let now = new Date();
let year = now.getFullYear();
let month = String(now.getMonth() + 1).padStart(2, '0');
let day = String(now.getDate()).padStart(2, '0');
let hours = String(now.getHours()).padStart(2, '0');
let minutes = String(now.getMinutes()).padStart(2, '0');
let formattedDate = `${day}-${month}-${year}`;
let formattedTime = `${hours}:${minutes}`;


let getInput = document.getElementById("data1");
let getInput2 = document.getElementById("data2");
let getInput3 = document.getElementById("data3");
let getInput4 = document.getElementById("data4");
let getInput5 = document.getElementById("data5");

let mainCard = document.getElementById("card");
const taskAdd = async (task) => {
    if (getInput.value.length <= 3) {
        alert("Task should be consist of 4 words")
        return
    };
    try {
        let docRef = await addDoc(collection(db, "Card"), {

            info: `<div class="col-12 col-md-6 col-lg-4 card load" style="background: #052b4e;">
            <div class="d-flex justify-content-around mb-3 p-2">
            <p class="card-text">Day:</p>
            <p class="card-text">Date:</p>
            <p class="card-text">Time:</p>
            </div>
            <h5 align="center" class="card-title pb-3">
            <i><strong class="font">${getInput.value}</strong></i>
            <i><strong class="font">${getInput2.value}</strong></i>
            <i><strong class="font">${getInput3.value}</strong></i>
            <i><strong class="font">${getInput4.value}</strong></i>
            <i><strong class="font">${getInput5.value}</strong></i>

                        </h5>
                        <div class="d-flex justify-content-between p-2">
                        <button class="btn btn-primary" onclick="editData(this)">Edit</button>
                        <button class="btn btn-success" onclick="completeData(this)">Completed</button>
                        <button class="btn btn-danger" onclick="removeData(this)">Remove</button>
                        </div>
                        </div>`
        });

        // Now that we have docRef, we can access docRef.id
        const docId = docRef.id;

        // Use the document ID to update the document with the ID included
        await updateDoc(docRef, {
            info: `<div class="col-12 col-md-6 col-lg-4 card load" style="background: #052b4e;">
            <div class="d-flex justify-content-around mb-3 p-2">
            <p class="card-text" id="date">Date : ${formattedDate}</p>
                        <p class="card-text" id="time">Time : ${formattedTime}</p>
                        <p class="card-text" id="last" style="display:none"></p>
                        </div>
                        <div id="dataid" style="display:none">${docId}</div>
                        <h5 align="center" class="card-title pb-3">
                        <i><strong class="font">${"First Name : "+getInput.value}</strong></i><br>
                        <i><strong class="font">${"Last Name : "+getInput2.value}</strong></i><br>
                        <i><strong class="font">${"Email : "+getInput3.value}</strong></i><br>
                        <i><strong class="font">${"Pasword : "+getInput4.value}</strong></i><br>
                        <i><strong class="font">${"CNIC : "+getInput5.value}</strong></i>
                        </h5>
                        <div class="d-flex justify-content-between p-2">
                        <button class="btn btn-danger" onclick="removeData(this)">Remove Student</button>
                        </div>
                        </div>`
        });

        window.location.reload()
    } catch (e) {
        console.error("Error adding or updating document: ", e);
    }
};

try {
    // mainCard.innerHTML = "Managing Your Data Please Wait..."
    mainCard.innerHTML = `<img height="50px" width="50px" src="https://i.gifer.com/ZKZg.gif"><br><h5>Managing Your Data Please Wait...</h5>`
    const querySnapshot = await getDocs(collection(db, "Card"));
    mainCard.innerHTML = ""
    querySnapshot.forEach((doc) => {
        mainCard.innerHTML += doc.data().info
        if (!mainCard.innerHTML) {
            mainCard.innerHTML = `You Dont Have Any Task`
        }
    });
} catch (error) {
    console.log(error.massage);
};

const removeData = async (remove) => {
    let removeDataParent = remove.closest('.card');
    let dataChild = removeDataParent.querySelector('#dataid');
    await deleteDoc(doc(db, "Card", dataChild.innerHTML));
    removeDataParent.remove()
    console.log(dataChild.innerHTML)
    window.location.reload()
};

const completeData = async (complete) => {
    let completeDataParent = complete.closest('.card')
    let dataChild = completeDataParent.querySelector('#dataid');
    let date = completeDataParent.querySelector('#date')
    let time = completeDataParent.querySelector('#time')
    let val = completeDataParent.querySelector('.font');
    completeDataParent.style = "background:black;"
    complete.previousElementSibling.remove()
    complete.remove()
    const washingtonRef = doc(db, "Card", dataChild.innerHTML);
    await updateDoc(washingtonRef, {
        info: `<div class="col-12 col-md-6 col-lg-4 card load" style="background:black;">
        <div class="d-flex justify-content-around mb-3 p-2">
                    <p class="card-text">${date.innerHTML}</p>
                    <p class="card-text">${time.innerHTML}</p>
                    </div>
                    <div id="dataid" style="display:none">${dataChild.innerHTML}</div>
                    
                    <h5 align="center" class="card-title pb-3">
                    <i><strong class="font">${val.innerHTML}</strong></i>
                    </h5>
                    <p class="card-text" id="last" align="center">Last Update : ${formattedTime} , ${formattedDate}</p>
                    <div class="d-flex justify-content-between align-items-center p-2">
                    <div>
                                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM17.8 8.6C18.1314 8.15817 18.0418 7.53137 17.6 7.2C17.1582 6.86863 16.5314 6.95817 16.2 7.4L10.8918 14.4776L8.70711 12.2929C8.31658 11.9024 7.68342 11.9024 7.29289 12.2929C6.90237 12.6834 6.90237 13.3166 7.29289 13.7071L10.2929 16.7071C10.4979 16.9121 10.7817 17.018 11.0709 16.9975C11.3601 16.9769 11.6261 16.8319 11.8 16.6L17.8 8.6Z"
                    fill="#d0c4af" />
            </svg>
                    </div>
                    <div><p>This Task Was Completed</p></div>
                    <div>
                    <button class="btn btn-danger" onclick="removeData(this)">Remove Task</button>
                    </div>
                    </div>
                    </div>`
    });
    window.location.reload()
};

const editData = async (edit) => {
    let editDataParent = edit.closest('.card');
    let dataChild = editDataParent.querySelector('#dataid');
    let val = editDataParent.querySelector('.font');
    let change = prompt("Change Your Task", val.innerHTML)
    val.innerHTML = change
    let date = editDataParent.querySelector('#date')
    let time = editDataParent.querySelector('#time')
    console.log(date.innerHTML)
    const washingtonRef = doc(db, "Card", dataChild.innerHTML);
    await updateDoc(washingtonRef, {
        info: `<div class="col-12 col-md-6 col-lg-4 card load" style="background: #052b4e;">
        <div class="d-flex justify-content-around mb-3 p-2">
                    <p class="card-text">${date.innerHTML}</p>
                    <p class="card-text">${time.innerHTML}</p>
        </div>
        <div id="dataid" style="display:none">${dataChild.innerHTML}</div>
                    <h5 align="center" class="card-title pb-3">
                    <i><strong class="font">${val.innerHTML}</strong></i>
                    </h5>
                    <p class="card-text" id="last" align="center">Last Update : ${formattedTime} , ${formattedDate}</p>
                    <div class="d-flex justify-content-between p-2">
                    <button class="btn btn-primary" onclick="editData(this)">Edit Task</button>
                    <button class="btn btn-success" onclick="completeData(this)">Completed</button>
                    <button class="btn btn-danger" onclick="removeData(this)">Remove Task</button>
                    </div>
                    </div>`
    });
    window.location.reload()
};

const hist = () => {
    window.location.reload()
};

window.taskAdd = taskAdd
window.editData = editData
window.completeData = completeData
window.removeData = removeData
window.hist = hist