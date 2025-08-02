document.addEventListener('DOMContentLoaded', () => {
    // Sample product data
    const products = [
        { id: 1, name: 'Fancy Clothing', category: 'clothing', rating: 4.5, image: 'clothing.jpg' },
        { id: 2, name: 'Stylish Heels', category: 'heels', rating: 4.8, image: 'heels.jpg' },
        { id: 3, name: 'Modern Accessories', category: 'accessories', rating: 4.2, image: 'accessories.jpg' },
        { id: 4, name: 'Smart Watch', category: 'electronics', rating: 4.9, image: 'electronics.jpg' },
        { id: 5, name: 'T-Shirt', category: 'clothing', rating: 3.8, image: 'clothing.jpg' },
        { id: 6, name: 'Running Shoes', category: 'heels', rating: 4.1, image: 'heels.jpg' },
        { id: 7, name: 'Leather Bag', category: 'accessories', rating: 4.6, image: 'accessories.jpg' },
        { id: 8, name: 'Laptop', category: 'electronics', rating: 4.7, image: 'electronics.jpg' }
    ];

    const productList = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortDropdown = document.getElementById('sort');
    let currentCategory = 'all';

    // Function to render products to the page
    function renderProducts(productsToRender) {
        productList.innerHTML = '';
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            
            // Create a star rating string
            const fullStars = Math.floor(product.rating);
            const hasHalfStar = product.rating % 1 !== 0;
            let ratingStars = '★'.repeat(fullStars);
            if (hasHalfStar) {
                ratingStars += '½'; // Using '½' for half-stars
            }
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <div class="rating">Rating: ${ratingStars} (${product.rating})</div>
            `;
            productList.appendChild(productCard);
        });
    }

    // Function to filter and sort the products
    function filterAndSortProducts() {
        // 1. Filter the products
        let filteredProducts = products;
        if (currentCategory !== 'all') {
            filteredProducts = products.filter(product => product.category === currentCategory);
        }

        // 2. Sort the filtered products
        const sortBy = sortDropdown.value;
        if (sortBy === 'rating-high-to-low') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'rating-low-to-high') {
            filteredProducts.sort((a, b) => a.rating - b.rating);
        }

        // 3. Render the final list
        renderProducts(filteredProducts);
    }

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentCategory = button.dataset.category;
            filterAndSortProducts();
        });
    });

    // Event listener for sort dropdown
    sortDropdown.addEventListener('change', filterAndSortProducts);

    // Initial render of all products
    filterAndSortProducts();
});