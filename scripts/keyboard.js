let activeStudent = null;

async function getStudents() {
 let res = await fetch('../assets/students.json')
 let students = await res.json();
 generateKeyboard(students);
}

function generateKeyboard(students) {
 let keyboard = document.querySelector(".keyboard")
 for (let i = 0; i < students.length; i++) {
  keyboard.innerHTML += `
   <button class="keyboard__key keyboard">${students[i].key}</button>
   `;
 }

 keyboard.innerHTML += `
   <button class="keyboard__space keyboard">hello@hyperisland.com</button>
 `;
}

getStudents();