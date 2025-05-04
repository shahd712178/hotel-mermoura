// dashboard.js - Dashboard-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize booking trends chart
    initBookingChart();
});

function initBookingChart() {
    const ctx = document.getElementById('bookingChart').getContext('2d');
    
    const bookingChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Bookings 2023',
                data: [12, 19, 15, 22, 18, 25, 30, 28, 26, 22, 18, 24],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}