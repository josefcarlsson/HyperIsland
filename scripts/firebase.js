import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

//Add your own config content
const firebaseConfig = {
  apiKey: "AIzaSyAvarrbdVBZaeCB2yEUAqUBLMxjKYKkJ40",
  authDomain: "hyperisland-37e31.firebaseapp.com",
  projectId: "hyperisland-37e31",
  storageBucket: "hyperisland-37e31.appspot.com",
  messagingSenderId: "769231743856",
  appId: "1:769231743856:web:ae37107d0db902622a3db5",
  measurementId: "G-D28KNT08RR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
