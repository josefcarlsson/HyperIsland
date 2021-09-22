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
  document.getElementById("postContent").innerHTML = post.content;
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

function formatPost(post) {

  let formated = {
    title: post.title.rendered,
    id: post.id,
    shortSummary: post.excerpt.rendered,
    previewImage: post._embedded["wp:featuredmedia"][0].source_url,
    content: post.content.rendered,
  };

  return formated;
}

function getPosts() {
  createFilter()
  fetch("http://localhost:8888/wp-json/wp/v2/posts?_embed")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let formatedPost = formatPost(data[i]);
        posts.push(formatedPost);
        createPreviewCard(formatedPost);
      }
    });
}

function getPostFromId() {
  var id = JSON.parse(findQuery("id"));


  fetch(`http://localhost:8888/wp-json/wp/v2/posts/${id}?_embed`)
    .then((response) => response.json())
    .then((data) => {
      populatePost(formatPost(data));
    });
}
/* 
  get id
  populate html with post content
*/

//  ! create the button for each letter
function createFilter() {
  var filterItems = ['ALL','a', 'b', 'c', 'd', 'e', 'f','g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r','s', 't','u','v','w','x','y', 'z']
  
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
  console.log('posts', posts)
  for (let i = 0; i < posts.length; i++) {

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
