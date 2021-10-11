function getStoredDate() {

 return {
   localstorage: localStorage.getItem("date")
     ? localStorage.getItem("date")
     : null,
   sessionstorage: sessionStorage.getItem("date")
     ? sessionStorage.getItem("date")
     : null,
 };
}

function formateDate(d) {
 if (!d) {
  return 'none';
 }
 
 var date = new Date(d);
 return `
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
  `;
}

function saveDate(button) {
 var date = new Date();
 localStorage.setItem("date", date);
 sessionStorage.setItem("date", date);
 button.innerHTML = 'Saved :)';
 findDates();
}

function findDates() {
 var storedDates = getStoredDate();
 var currentDate = new Date();
 printDate("current", formateDate(currentDate));
 printDate("local", formateDate(storedDates.localstorage));
 printDate("session", formateDate(storedDates.sessionstorage));
}

function printDate(id, date) {
 if (!document.getElementById(id)) return null;
 document.getElementById(id).innerHTML = date;
}