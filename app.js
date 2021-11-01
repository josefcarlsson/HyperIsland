const express = require("express");
const axios = require("axios");
const app = express();
const port = 3001;

const sassMiddleware = require("node-sass-middleware");

app.use('/styles', sassMiddleware({
 src: __dirname + '/site/styles/',
 dest: __dirname + '/site/styles/',
 debug: true,
 outputStyle: 'expanded'
}));

app.use(express.static("./site"));

const headers = {
  Authorization: `Bearer i8vASnPSDjc0-3Z-Ir46VNyv8rMJ9kEzJ31RpvCdSTzjusVcVAJ4WQ0FlDJI3j31`,
};

function formatSong(song) {
  console.log(song.result.full_title);
  return song.result.full_title;
}

async function getSong(query) {
  let res = await axios.get(`https://api.genius.com/search?q=${query}`, {
    headers,
  });
  const formatedSongs = formatSong(res.data.response.hits[0]);
  return formatedSongs;
}


app.get("/", (req, res) => {
  res.sendFile("./site/index.html", { root: __dirname });
});

app.get("/search", async (req, res) => {
  var search = await getSong(req.query.search);
  console.log("searching for: ", req.query.search);
  res.json(search);

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
