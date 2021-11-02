let tempImage =
 "https://images.aftonbladet-cdn.se/v2/images/e4f188ac-2fc3-4770-a651-7a10fa8d7c5f?fit=crop&format=auto&h=2052&q=50&w=1900&s=e05602163cc1737ec1153fff7c922be153ee50fd";

let students = [];

async function getStudents() {
 let res = await fetch('../assets/students.json')
 students = await res.json();
 generateKeyboard(students);
 addEventListnerOnkeyboard();
}

function generateKeyboard(students) {
 let keyboard = document.querySelector(".keyboard")
 for (let i = 0; i < students.length; i++) {
  keyboard.innerHTML += `
   <button style="background-image:url(${
     students[i].img ? students[i].img : tempImage
   })" data-key="${students[i].key}" id="key-${
    students[i].key
  }" class="keyboard__key keyboard">${students[i].key}</button>
   `;
 }

 keyboard.innerHTML += `
   <button class="keyboard__space keyboard">hello@hyperisland.com</button>
 `;
}

function findStudentFormKey(key) {
 return students.filter(student => student.key === key);
}

function diplayStudent(student) {
 document.getElementById("active-student-information").innerHTML = `
  <div>
   ${student[0].name}
  </div>
 `;
 
 let prev = document.querySelector(".keyboard__key--pressed")

 if (prev) {
  prev.classList.remove("keyboard__key--pressed");
 }

 document.getElementById(`key-${student[0].key}`).classList.add('keyboard__key--pressed');
}

function addEventListnerOnkeyboard() {
 window.addEventListener("keydown", function (event) {
  if (event.key !== undefined) {
   if (event.code === "Space") {
     window.location.href = "mailto:hello@hyperisland.com?subject=GameConf"
   } else {
     let activeStudent = findStudentFormKey(event.key);
     diplayStudent(activeStudent);
   }
   // Handle the event with KeyboardEvent.key
  } else if (event.which !== undefined) {
   // Handle the event with KeyboardEvent.which
  }
 });

 var keys = document.querySelectorAll(".keyboard__key");
 for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", function (event) {
    let student = findStudentFormKey(event.target.getAttribute('data-key'));
    diplayStudent(student);
  });
 }
}

getStudents();
