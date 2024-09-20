import {
    initializeApp
}
    from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    deleteField,
    documentId
}
    from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import {
    getStorage,
    ref,
    deleteObject
}
    from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
}
    from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBYSiu8SPMuOIwquOjGcl9h7CnOfD06NXU",
    authDomain: "task-manager-9dab8.firebaseapp.com",
    projectId: "task-manager-9dab8",
    storageBucket: "task-manager-9dab8.appspot.com",
    messagingSenderId: "77805722099",
    appId: "1:77805722099:web:7c1863be54d12c8c1e9a86"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    app,
    getFirestore,
    db,
    collection,
    addDoc,
    getDocs,
    getStorage,
    ref,
    deleteObject,
    doc,
    deleteDoc,
    updateDoc,
    deleteField,
    documentId,
    getAuth,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
};