import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

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

// collection ref
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];

    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the form from submitting
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
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
