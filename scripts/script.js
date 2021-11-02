var lettersInKeyboard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '´', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å', '¨', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', "'", '<', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-','space']


function generateKeyboard() {
 for (let i = 0; i < lettersInKeyboard.length; i++) {
  document.querySelector(".keyboard").innerHTML += `
  <div class="${lettersInKeyboard[i] !== 'space' ? 'keyboard--key' : 'keyboard--space'} keyboard">${lettersInKeyboard[i]}</div>
   `;
 }
  
}

generateKeyboard();