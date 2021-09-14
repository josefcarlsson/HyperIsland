let posts = []
var number = 0;

function addToNumber() {
  number = number + 1;
  console.log(number);
}

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
  console.log(param);
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
  createFilter()
  fetch("../data/posts.json")
    .then((response) => response.json())
    .then((data) => {

      posts = data;
      for (let i = 0; i < data.length; i++) {
        createPreviewCard(data[i])
      }
    });
}

function getPostFromId() {

  var id = JSON.parse(findQuery('id'));
  console.log("id", findQuery("id"));

  fetch("../data/posts.json")
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data)
      for (let i = 0; i < data.length; i++) {
        console.log('from query', id, 'in loop:', data[i].id, "same", data[i].id === id);
        if (data[i].id === id) {
          console.log(data[i]);
          populatePost(data[i]);
        }
      }
    });
}
/* 
  get id
  populate html with post content
*/

//  ! create the button for each letter
function createFilter() {
  var filterItems = ['ALL','a', 'b', 'c', 'd', 'e', 'f','g', 'H', 'j', 'k', 'l', 'm']
  
  for (let i = 0; i < filterItems.length; i++) {
    createFilterButton(filterItems[i]);
  }

}
//  ! create the button for each letter
function createFilterButton(filterItem) {
  // ! onclick send letter to function
  document.getElementById("filter").innerHTML += `
    <li>
      <button onclick="filterPosts('${filterItem}')"> 
        ${filterItem}
      </button>
    </li>`;
}


//! loop all post  compare title with first letter with the letter we send in
function filterPosts(filter) {

  document.getElementById("postsSummaries").innerHTML = '';
  var found = false;

  for (let i = 0; i < posts.length; i++) {
    console.log(post[i])
    if (posts[i].title.charAt(0).toLowerCase() == filter.toLowerCase() || filter === 'ALL') {
      //! if its same replace the content of wrapper
      createPreviewCard(posts[i]);
      found = true
    } 
  }

  if (!found) {
    document.getElementById("postsSummaries").innerHTML = "<h1>Not found</h1>";
  }
}
