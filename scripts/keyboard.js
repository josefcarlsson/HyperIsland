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
 let keyboard = document.querySelector(".keyboard");
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

 createSVG()
}
function createSVG() {
 let wrapperCord = document.querySelector(".keyboard-wrapper").getBoundingClientRect();
 let svg = document.getElementById("keyboard-lines");
 svg.setAttribute("width", wrapperCord.width);
 svg.setAttribute("height", wrapperCord.height);
 svg.setAttribute("viewBox", `0 0 ${wrapperCord.width} ${wrapperCord.height}`);
}

function findStudentFormKey(key) {
 return students.filter(student => student.key === key);
}

function diplayStudent(student) {
 wrapperRef = document.getElementById("active-student-information");
 wrapperRef.innerHTML = `
  <div>
   ${student[0].name}
  </div>
 `;

 drawLine('key-'+student[0].key, wrapperRef)
 let prev = document.querySelector(".keyboard__key--pressed")

 if (prev) {
  prev.classList.remove("keyboard__key--pressed");
 }

 document.getElementById(`key-${student[0].key}`).classList.add('keyboard__key--pressed');
}

function drawLine(key, toEl) {
 let svg = document.getElementById("keyboard-lines").getBoundingClientRect();
 let wrapperCord = document.getElementById("active-student-information").getBoundingClientRect();
 let currentEl = document.getElementById(key).getBoundingClientRect();
 let from = {
   x: currentEl.x + currentEl.width / 2,
   y: currentEl.y - wrapperCord.y,
 };
 let to = { x: wrapperCord.x, y: wrapperCord.height / 2};
 let H = currentEl.x + currentEl.width / 2 < wrapperCord.x ? wrapperCord.x : wrapperCord.x + wrapperCord.width;
 let d = `M ${from.x}, ${from.y} L ${from.x}, ${wrapperCord.height}`;
 
 if (
   currentEl.x + currentEl.width / 2 < wrapperCord.x ||
   currentEl.x + currentEl.width / 2 > wrapperCord.x + wrapperCord.width
 ) {
  d = `M ${from.x}, ${from.y} L ${from.x}, ${to.y} V ${to.y} H ${H}`;
 }
  document.getElementById("dotted-path").setAttribute("d", d);
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
