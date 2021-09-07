function toggleState() {
  document.querySelector(".toggle-me").classList.toggle("active");
};

function populatePost(post) {
  document.getElementById('postTitle').innerHTML = post.title;
  var content = post.content;

  for (let i = 0; i < content.length; i++) {
    document.getElementById("postContent").innerHTML += content[i];
  }
}

function findQuery(param) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function createPreviewCard(card) {
  var wrapper = document.getElementById("postsSummaries")
    wrapper.innerHTML += `<li class="card-wrapper__card"><a href="./pages/post.html?id=${card.id}">
      <img src="${card.previewImage}" alt="A random image" />
      <div class="card-wrapper__content">
       <h3>${card.title}</h3>
       <p>
        ${card.shortSummary}
       </p>
      </div>
      </a>
     </li>`;
};


function getPosts() {
  fetch("../data/posts.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        createPreviewCard(data[i])
      }
    });
}

function getPostFromId() {
  var id = JSON.parse(findQuery('id'));

  fetch("../data/posts.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          populatePost(data[i]);
        }
      }
    });
}

function getDrink() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      var drink = data.drinks[0];
      var maxNumberOfIngredient = 15;
      var post = {
        title: drink.strDrink,
        content: [
          "<img src=" + drink.strDrinkThumb + " />",
          "<p>" + drink.strInstructions + "</p>",
          "<h3>Ingredients</h3>",
        ],
      };

      for (let i = 0; i < maxNumberOfIngredient; i++) {
        if (i === 0) {
          post.content.push("<ul>");
        }

        if (drink[`strIngredient${i}`]) {
          post.content.push(
            "<li>" +
              drink[`strIngredient${i}`] +
              " : " +
              drink[`strMeasure${i}`] +
              "</li>"
          );
        }
        if (i === maxNumberOfIngredient - 1) {
          post.content.push("</ul>");
        }
      }

      document.getElementById("postContent").innerHTML = "";
      populatePost(post);
    });
}