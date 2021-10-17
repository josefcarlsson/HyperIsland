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

//Add to firebase
async function addName(){
  var name = readInput("name");
  if (!name) return null;
    try {
      const docRef = await addDoc(collection(db, "names"), {
        name: name,
      });
      clearInput("name");
      displayNamesInList("listOfNames");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

//Remove to firebase
async function deleteName(){
  var id = this.getAttribute("data-id");
  await deleteDoc(doc(db, "names", id));
  displayNamesInList("listOfNames");
}

//Get all from firebase
async function getNames() {
  const names = await getDocs(collection(db, "names"));
  return names;
};

function readInput(id){
  if(!document.getElementById(id) && !document.getElementById(id).value) return null;
  
  return document.getElementById(id).value;
}




function clearContentOfElement(id){
  if (!document.getElementById(id)) return null;
  document.getElementById(id).innerHTML = "";
}

function formatListItem(item){
  return `<li>
            <h3>${item.name}</h3> 
            <button 
              class="deleteName" 
              data-id="${item.id}">
              DELETE
            </button>
          </li>`;
}

function clearInput(id){
  if(!document.getElementById(id)) return null;
  document.getElementById(id).value = '';
}

function addNameToList(list, item){
  if (!document.getElementById(list)) return null;
  document.getElementById(list).innerHTML += formatListItem(item);
};

function addEventListner(){
  if(!document.getElementById("addName")) return null;
    document.getElementById("addName").removeEventListener("click", addName);
    document.getElementById("addName").addEventListener("click", addName);

  if(!document.getElementsByClassName("deleteName")) return null;
  var elements = document.getElementsByClassName("deleteName");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", deleteName, false);
  }
};

async function displayNamesInList(id){
  var namesInDb = await getNames();
  clearContentOfElement(id);

  namesInDb.forEach((doc) => {
    addNameToList('listOfNames', { id: doc.id, name: doc.data().name });
  });
  
  addEventListner();
  return;
}

async function init(){
  await displayNamesInList("listOfNames");
  addEventListner();
}

init();