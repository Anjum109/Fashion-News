const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}
const displayCategories = categories => {

    const categoriesContainer = document.getElementById('categories-set');
    // categoriesContainer.innerText = '';


    const categoryList = document.createElement('li');
    categoryList.classList.add('col');
    categoryList.innerHTML = `
<h5>Home</h5>`
    categoriesContainer.appendChild(categoryList)
    for (const category of categories) {
        console.log(category)
        const categoryList = document.createElement('li');
        categoryList.classList.add('col');
        categoryList.innerHTML = `
   
    <h5 onclick="loadNewsDetails('${category.category_id}')">${category.category_name}</h5>
    `;
        categoriesContainer.appendChild(categoryList)
    }

}

const loadNewsDetails = id => {
    loadSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoadNews(data.data))
}

const displayLoadNews = news => {
    // sort by view 
    news.sort(function (a, b) {
        return b.total_view - a.total_view
    });

    const displayAllNews = document.getElementById('display-all-news');
    const displayAllNews2 = document.getElementById('display-all-news-2');
    if (news.length == 0) {
        displayAllNews.innerText = "No News Found";
    }
    else {
        displayAllNews.innerText = news.length;
        displayAllNews2.innerText = "Items for this category ";
    }

    const newsCategoryContainer = document.getElementById('news-category-container');

    newsCategoryContainer.innerText = '';


    for (const myNews of news) {
        console.log(myNews)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
       <div class="container">
       <div class="card rounded-4" style="width:22rem;">
       <div class="w-100">
       <img src="${myNews.thumbnail_url}" class="card-img-top img-fluid" alt="..."></div>
       <div class="card-body">
         
           <p class="card-text">${myNews.title}</p>
           <p class="card-text">${myNews.details.slice(0, 140) + "..."}</p>
           <div class="d-flex align-items-center">
           <img src="${myNews.author.img}" class="rounded-circle w-25 d-inline" alt="...">
           <h2 class="card-title ms-3 fs-4 fw-bold">${myNews.author.name ? myNews.author.name : 'No author name available'}</h2>
           </div>
           <p class="mt-3 fw-bold">Published Date : ${myNews.author.published_date ? myNews.author.published_date : 'No published date available'}</p>
           <p><i class="fa-solid fa-eye"> ${myNews.total_view ? myNews.total_view : ' No total view found'}</i></p>
           <button type="button" onclick="loadModalNewsDetails('${myNews._id}')" class="btn btn-primary fs-5" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
           Show Details
         </button>
       </div>
   </div>
       </div>
        `;
        newsCategoryContainer.appendChild(newsDiv)
    }
    loadSpinner(false)
}
loadCategories()
// spinner 
const loadSpinner = isloading => {
    const loader = document.getElementById('loader');
    if (isloading) {
        loader.classList.remove('d-none')
    } else {
        loader.classList.add('d-none')
    }
}

// items found
// const getItemsCount = (items) => {
//     const itemContainer = document.getElementById('itemsfound-container');
//     itemContainer.innerHTML = '';
//     const itemDiv = document.createElement('div');
//     itemDiv.innerHTML = `
//     <div class="fs-6 item-found px-3">
//     <h3 class="fw-light p-2">${items}Items found for this category</h3>
//     </div>
//     `;
//     itemContainer.appendChild(itemDiv);
// }

const loadModalNewsDetails = id => {

    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoadModalNewsDetails(data.data[0]))
}
const displayLoadModalNewsDetails = details => {
    console.log(details)
    const newsDetailModalThumbnail = document.getElementById('news-detail-modal-thumbnail');
    newsDetailModalThumbnail.src = details.thumbnail_url;
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = details.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <p>Details : ${details.details.slice(0, 120) + "..."}</p>
    <p>Author Name : ${details.author.name ? details.author.name : 'No author name found'}</p>
    <p>Published Date : ${details.author.published_date ? details.author.published_date : 'No published date found'}</p>
    <p>Total View : ${details.total_view ? details.total_view : 'No view found'}</p>
    `
}
// loadModalNewsDetails()

// const toggleSpiner = isLoading => {
//     const loaderSection = document.getElementById('loader');
//     if (isLoading) {
//         loaderSection.classList.remove('d-none');
//     }// }

loadNewsDetails()



