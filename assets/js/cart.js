document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cartItems');
    const logoutBtn = document.getElementById('logoutBtn');


    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = "../../index.html"; // Redirect to login page
    });

    function displayCartItems() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const cartItems = JSON.parse(localStorage.getItem(loggedInUser + '_cart'));

        if (!cartItems || cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>No items in cart</p>';
            return;
        }

        cartItemsContainer.innerHTML = ''; // Clear previous items

        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            const itemName = document.createElement('p');
            itemName.textContent = `Product: ${item.name}`;

            const itemQuantity = document.createElement('p');
            itemQuantity.textContent = `Quantity: ${item.quantity}`;

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `Price: ${item.price}`;

            const totalPrice = document.createElement('p');
            totalPrice.textContent = `Total Price: ${item.quantity * item.price}`;

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.classList.add('plusBtn');
            plusButton.addEventListener('click', function () {
                // Increment quantity
                item.quantity++;
                // Update the displayed quantity
                itemQuantity.textContent = `Quantity: ${item.quantity}`;
                // Update total price
                totalPrice.textContent = `Total Price: ${item.quantity * item.price}`;
                // Update cart in local storage
                updateCart(loggedInUser, cartItems);
            });

            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.classList.add('minusBtn');
            minusButton.addEventListener('click', function () {
                // Decrement quantity if greater than 1
                if (item.quantity > 1) {
                    item.quantity--;
                    // Update the displayed quantity
                    itemQuantity.textContent = `Quantity: ${item.quantity}`;
                    // Update total price
                    totalPrice.textContent = `Total Price: ${item.quantity * item.price}`;
                    // Update cart in local storage
                    updateCart(loggedInUser, cartItems);
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('deleteBtn');
            deleteButton.addEventListener('click', function () {
                // Remove item from cart
                const index = cartItems.indexOf(item);
                if (index !== -1) {
                    cartItems.splice(index, 1);
                    // Update cart in local storage
                    updateCart(loggedInUser, cartItems);
                    // Refresh cart items display
                    displayCartItems();
                }
            });

            cartItemDiv.appendChild(itemName);
            cartItemDiv.appendChild(itemQuantity);
            cartItemDiv.appendChild(itemPrice);
            cartItemDiv.appendChild(totalPrice);
            cartItemDiv.appendChild(plusButton);
            cartItemDiv.appendChild(minusButton);
            cartItemDiv.appendChild(deleteButton);

            cartItemsContainer.appendChild(cartItemDiv);
        });
    }

    function updateCart(user, cart) {
        localStorage.setItem(user + '_cart', JSON.stringify(cart));
    }

    displayCartItems();
});
