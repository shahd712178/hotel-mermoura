// auth.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (in a real app, you'd have proper authentication)
    if(username === 'chahd' && password === '12345') {
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

// Check if user is already logged in when accessing other pages
// This would be in your main.js file
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(!isLoggedIn && !window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
    }
}