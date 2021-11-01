// url : https://emoji-api.com/emojis?access_key=bc60e3c945a9f4122bb298304962837ab7f070e4

//CREATE variable listOfEmojies

async function getSongs(search) {
  var res = await fetch(`./search?search=${search}`);
  var data = res.json();
  return data;
}

function createListItem(item) {
  var item =
    `<li>
      <img src="${item.song_art_image_thumbnail_url}" alt="album-cover"/>
      <div>
        <h3>${item.title}</h3>
        <p>${item.artist_names}</p>
        <a href="${item.url}">Read more</a>
      </div>
    </li>`;
  
  return item;
}

// ACTION user presses the button
async function searchForSong(evt) {
  var searchStr = new FormData(evt).get("search");
  var data = await getSongs(searchStr);
  var list = document.getElementById('list');
  list.innerHTML = "";
  console.log(data)
  list.innerHTML += data;
}
