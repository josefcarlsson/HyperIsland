// url : https://emoji-api.com/emojis?access_key=bc60e3c945a9f4122bb298304962837ab7f070e4

//CREATE variable listOfEmojies

function getEmojies() {
  /*

 
 FEATCH emojies from api 
 CONVERT responce from featch to json
 IF response from api is an array
 STORE converted res in variable listOfEmojies
 ENDIF

 */
}

// ACTION user presses the button
function searchForEmoji(evt) {
  var searchStr = new FormData(evt).get("search");
  /*
 GET user input in searchfield
 STORE the value in a variable
 
 IF user input is a string
 ENDIF

 CLEAR #emojies element
 FOR all as ITEM in listOfEmojies
  IF the variable from user input is the same as the ITEM description
   STORE the item in a variable
   PRINT the variable in #emojis by innerHTML
  ELSE
   PRINT "there are no matches" in #emojies
  ENDIF
 ENDFOR
 */
}
