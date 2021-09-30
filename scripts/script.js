let posts = []
var number = 0;
var currentFilter = 'ALL';

let options = {
  threshold: 0.4
}

let observer = new IntersectionObserver(function (entries) {
  for (let i = 0; i < entries.length; i++) {
    console.log("entries", entries);
    if (entries[i].isIntersecting) {
      entries[i].target.classList.add('been-in-view');
    } else {
      entries[i].target.classList.remove("been-in-view");
    }
  }
}, options);

function startObserver() {
 let target = document.querySelectorAll('.card-wrapper__card');
  for (let i = 0; i < target.length; i++) {
   observer.observe(target[i]);
  }
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

  if (!document.getElementById("postsSummaries")) return null;
  
  let d = new Date(card.date);
  let date = `${d.getDate()}/${d.getUTCMonth()} - ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`

  var wrapper = document.getElementById("postsSummaries")
    wrapper.innerHTML += `<li class="card-wrapper__card"><a href="./pages/post.html?id=${card.id}">
      <img src="${card.previewImage}" alt="A random image" />
      <div class="card-wrapper__content">
       <span>${date}</span>
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
    title: (post.title) ? post.title.rendered : 'no title',
    id: (post.id) ? post.id : 'No id',
    date: (post.date) ? post.date : 'No date set',
    shortSummary: (post.excerpt) ? post.excerpt.rendered : 'no summary',
    previewImage: (post._embedded && post._embedded["wp:featuredmedia"]) ?
      post._embedded["wp:featuredmedia"][0].source_url : '../assets/placeholder.jpeg',
    content: (post.content) ? post.content.rendered : 'Nothing has been written',
  };

  return formated;
}

function sortByDate(array) {
  return array.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
}

function getPosts() {

  fetch("http://localhost:8888/wp-json/wp/v2/posts?_embed&per_page=100")
    .then((response) => response.json())
    .then((data) => {
      let sortedPost = sortByDate(data);

      for (let i = 0; i < sortedPost.length; i++) {
        let formatedPost = formatPost(sortedPost[i]);
        posts.push(formatedPost);
        createPreviewCard(formatedPost);
      }
    }).then(() => {
      createFilter()
    }).then(() => {
      startObserver();
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
  createSortButtons()
}

function sortFilter(order) {
  let sortedPost = sortByDate(posts);

  if (order === 'desc') {
    sortedPost.reverse();
  }
  posts = sortedPost;
  filterPosts(currentFilter);
}

function createSortButtons(filterItem) {
  // ! onclick send letter to function
  document.getElementById("filter").innerHTML += `
    <div>
      <button onclick="sortFilter('asc')"> 
        ASC
      </button>
    
    <span>:</span>
      <button onclick="sortFilter('desc')"> 
        DESC
      </button>
    </div>
    `;
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
  currentFilter = filter;
  
  document.getElementById("postsSummaries").innerHTML = '';
  var found = false;

  for (let i = 0; i < posts.length; i++) {

    if (posts[i].title.charAt(0).toLowerCase() == filter.toLowerCase() || filter === 'ALL') {
      //! if its same replace the content of wrapper
      createPreviewCard(posts[i]);
      found = true
    }
    startObserver();
  }

  if (!found) {
    document.getElementById("postsSummaries").innerHTML = "<h1>Not found</h1>";
  }
}
