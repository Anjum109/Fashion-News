const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    for (const category of categories) {
        console.log(category)
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('col');
        categoryDiv.innerHTML = `
        <h5>${category.category_name}</h5>
        `;
        categoriesContainer.appendChild(categoryDiv)
    }
}
loadCategories()