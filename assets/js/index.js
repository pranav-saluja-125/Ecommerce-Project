document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signupContainer = document.getElementById('signupContainer');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');

    // signup hide
    signupContainer.style.display = 'none';

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');

        if (username === savedUsername && password === savedPassword) {
            localStorage.setItem('loggedInUser', username);
            alert('Login successful!');
            window.location.href="./assets/html/homepage.html";
        } else {
            alert('Invalid username or password.');
        }
    });

    signupContainer.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;

        if (username && password) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert('Sign up successful!');
        } else {
            alert('Please enter both username and password.');
        }
    });

    signupLink.addEventListener('click', function (event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        signupContainer.style.display = 'block';
        loginLink.style.display = 'block';
        signupLink.style.display = 'none';
        loginContainer.style.display = 'none';
    });

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        loginForm.style.display = 'block';
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
        loginLink.style.display = 'none';
        signupLink.style.display = 'block';
    });
});
