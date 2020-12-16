const postContainer = document.getElementById('posts-container');
const loading = document.querySelector(".loader");
const filter  = document.getElementById('filter');

let limit = 5;
let page = 1;

// fetch post from api 
async function getPost(){
    const response  = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await response.json();

    return data;
}

// Show post in dom

async function showPosts(){
    const posts  = await getPost();
    
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `<div class="number">
        ${post.id}
        </div>
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        </div>
        `;
        postContainer.appendChild(postEl);
        // alert(window.innerWidth);
      
    });
}

// show loading and fetch more posts

function showLoading(){
    loading.classList.add("show");

    setTimeout(()=>{
        loading.classList.remove("show");

        setTimeout(() => {
            page++;
            showPosts();
        },500);
    },1000);
    
}

function filterPost(e){
   const term =  e.target.value.toUpperCase();
   const posts = document.querySelectorAll(".post");
   
   posts.forEach(post=>{
       const title = post.querySelector(".post-title").innerText.toUpperCase();
       const body = post.querySelector(".post-body").innerText.toUpperCase();

       if(title.indexOf(term)>-1 || body.indexOf(term)>-1){
          post.style.display = "flex";
       }
       else{
           post.style.display = "none";
       }
       
   })

}

showPosts();


window.addEventListener('scroll',()=>{

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    if(scrollTop + clientHeight >=  scrollHeight - 5){
        showLoading();
    }
  
  });

  
filter.addEventListener('input',filterPost);