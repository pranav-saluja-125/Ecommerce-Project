document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products');
    const loadMoreButton = document.getElementById('loadMoreBtn');
    const showCartBtn = document.getElementById('showCartBtn');
    const logoutBtn = document.getElementById('logoutBtn');


    showCartBtn.addEventListener('click', function () {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            window.location.href = "cart.html";
        } else {
            alert('Please log in to view your cart.');
        }
    });

    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = "../../index.html"; // Redirect to login page
    });


    let startIndex = 0;
    const productsPerPage = 5;

    function displayProducts(startIndex, productsPerPage) {
        const products = JSON.parse(localStorage.getItem('data'));

        if (!products || startIndex >= products.length) {
            loadMoreButton.style.display = 'none'; 
            return;
        }

        const endIndex = Math.min(startIndex + productsPerPage, products.length);
        for (let i = startIndex; i < endIndex; i++) {
            const product = products[i];
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Quantity: ${product.desc}</p>
                <p>Price: ${product.price}</p>
                <button class="add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        }

        if (endIndex < products.length) {
            loadMoreButton.style.display = 'block'; 
        } else {
            loadMoreButton.style.display = 'none';
            
        }
    }

    loadMoreButton.addEventListener('click', function () {
        startIndex += productsPerPage;
        displayProducts(startIndex, productsPerPage);
    });

    productsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const product = JSON.parse(event.target.dataset.product);
            // Call function to add the product to cart
            addToCart(product);
        }
    });
    
    function addToCart(product) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('Please log in to add items to your cart.');
            return;
        }

        let cart = JSON.parse(localStorage.getItem(loggedInUser + '_cart')) || [];

        // Check if product already exists in cart
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        if (existingProductIndex !== -1) {
            // If product already exists, increment quantity
            cart[existingProductIndex].quantity++;
        } else {
            // Otherwise, add product to cart
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem(loggedInUser + '_cart', JSON.stringify(cart));
        console.log(`Added ${product.name} to cart`);
        console.log(cart);  
    }

    displayProducts(startIndex, productsPerPage);
});
