// main.js - Shared functionality across admin pages
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Sidebar toggle functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if(sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if(window.innerWidth <= 768 && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
            sidebar.classList.remove('active');
        }
    });
});

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(!isLoggedIn && !window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
    }
}