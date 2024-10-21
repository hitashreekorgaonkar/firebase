import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm21-Wtc1s4mnLBMpcTlbT8i3eZwLsjb8",
  authDomain: "fir-tutorial-1477a.firebaseapp.com",
  projectId: "fir-tutorial-1477a",
  storageBucket: "fir-tutorial-1477a.appspot.com",
  messagingSenderId: "587731561551",
  appId: "1:587731561551:web:06b9d192d84c0d6704ce3a",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, "books");

// queries
const q = query(
  colRef,
  // where("author", "==", "Abhijit Majumder"),
  orderBy("createdAt")
);

// real time collection data
onSnapshot(q, (snapshot) => {
  //In Firebase, onSnapshot is a real-time listener used to receive updates whenever a Firestore document or collection changes.
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the form from submitting
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the form from submitting
  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

//  get a single document
const docRef = doc(db, "books", "weJY0DIDnG4xdu7M7inU");
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", updateForm.id.value);
  updateDoc(docRef, { title: "update title" }).then(() => {
    updateForm.reset();
  });
});

// signing users up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // console.log("user created", cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// logging in and out
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // console.log("user logged in", cred.user);
      loginForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // console.log("The user signed out");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
  console.log("user status changed: ", user);
});
