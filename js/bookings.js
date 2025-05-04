// bookings.js - Bookings Management Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar
    initBookingCalendar();
    
    // View toggle functionality
    const calendarViewBtn = document.getElementById('calendarViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const calendarContainer = document.getElementById('calendarContainer');
    const listContainer = document.getElementById('listContainer');
    
    calendarViewBtn.addEventListener('click', function() {
        calendarViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        calendarContainer.style.display = 'block';
        listContainer.style.display = 'none';
    });
    
    listViewBtn.addEventListener('click', function() {
        listViewBtn.classList.add('active');
        calendarViewBtn.classList.remove('active');
        listContainer.style.display = 'block';
        calendarContainer.style.display = 'none';
    });
    
    // Modal elements
    const bookingModal = document.getElementById('bookingModal');
    const closeBookingModal = document.getElementById('closeBookingModal');
    const editBookingModal = document.getElementById('editBookingModal');
    const closeEditBookingModal = document.getElementById('closeEditBookingModal');
    const cancelEditBookingBtn = document.getElementById('cancelEditBookingBtn');
    const bookingForm = document.getElementById('bookingForm');
    
    // Add new booking button
    const addBookingBtn = document.createElement('button');
    addBookingBtn.className = 'btn-add-booking';
    addBookingBtn.innerHTML = '<i class="fas fa-plus"></i> Add Booking';
    document.querySelector('.bookings-header').appendChild(addBookingBtn);
    
    addBookingBtn.addEventListener('click', function() {
        document.getElementById('editBookingModalTitle').textContent = 'Add New Booking';
        bookingForm.reset();
        editBookingModal.classList.add('active');
    });
    
    // Close modals
    closeBookingModal.addEventListener('click', function() {
        bookingModal.classList.remove('active');
    });
    
    closeEditBookingModal.addEventListener('click', function() {
        editBookingModal.classList.remove('active');
    });
    
    cancelEditBookingBtn.addEventListener('click', function() {
        editBookingModal.classList.remove('active');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if(e.target === bookingModal) {
            bookingModal.classList.remove('active');
        }
        if(e.target === editBookingModal) {
            editBookingModal.classList.remove('active');
        }
    });
    
    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would normally send data to server
        alert('Booking saved successfully!');
        editBookingModal.classList.remove('active');
        // In a real app, you would update the calendar/table here
    });
    
    // Edit booking buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            // Get data from the row
            const bookingId = row.cells[0].textContent;
            const guest = row.cells[1].textContent;
            const room = row.cells[2].textContent;
            const checkIn = row.cells[3].textContent;
            const checkOut = row.cells[4].textContent;
            const status = row.cells[7].querySelector('.status').classList[1];
            
            // Set modal title
            document.getElementById('editBookingModalTitle').textContent = 'Edit Booking ' + bookingId;
            
            // Fill form with data (in a real app, you'd have more complete data)
            document.getElementById('bookingGuest').value = guest;
            document.getElementById('bookingRoom').value = room.split(' ')[1].replace(/[()]/g, '');
            document.getElementById('bookingCheckIn').value = checkIn;
            document.getElementById('bookingCheckOut').value = checkOut;
            document.getElementById('bookingStatus').value = status;
            
            // Open modal
            editBookingModal.classList.add('active');
        });
    });
    
    // Delete booking buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if(confirm('Are you sure you want to delete this booking?')) {
                const row = this.closest('tr');
                // In a real app, you would send a request to delete from server
                row.remove();
                alert('Booking deleted successfully!');
            }
        });
    });
    
    // Booking action buttons in detail modal
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');
    const cancelBookingBtn = document.getElementById('cancelBookingBtn');
    const printBookingBtn = document.getElementById('printBookingBtn');
    
    confirmBookingBtn.addEventListener('click', function() {
        document.getElementById('bookingStatus').textContent = 'Confirmed';
        document.getElementById('bookingStatus').className = 'status confirmed';
        alert('Booking confirmed!');
        bookingModal.classList.remove('active');
    });
    
    cancelBookingBtn.addEventListener('click', function() {
        if(confirm('Are you sure you want to cancel this booking?')) {
            document.getElementById('bookingStatus').textContent = 'Cancelled';
            document.getElementById('bookingStatus').className = 'status cancelled';
            alert('Booking cancelled!');
            bookingModal.classList.remove('active');
        }
    });
    
    printBookingBtn.addEventListener('click', function() {
        alert('Invoice would be printed in a real application');
    });
});

function initBookingCalendar() {
    const calendarEl = document.getElementById('bookingCalendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            {
                title: 'John Doe - Junior-Single',
                start: '2023-11-15',
                end: '2023-11-18',
                backgroundColor: '#2ecc71',
                borderColor: '#27ae60'
            },
            {
                title: 'Jane Smith - Apart-Double',
                start: '2023-11-20',
                end: '2023-11-25',
                backgroundColor: '#3498db',
                borderColor: '#2980b9'
            },
            {
                title: 'Robert Johnson - Single Room',
                start: '2023-11-10',
                end: '2023-11-12',
                backgroundColor: '#f39c12',
                borderColor: '#e67e22'
            },
            {
                title: 'Sarah Williams - Double Room',
                start: '2023-12-05',
                end: '2023-12-10',
                backgroundColor: '#2ecc71',
                borderColor: '#27ae60'
            },
            {
                title: 'Michael Brown - Junior-Double',
                start: '2023-12-15',
                end: '2023-12-20',
                backgroundColor: '#9b59b6',
                borderColor: '#8e44ad'
            }
        ],
        eventClick: function(info) {
            const event = info.event;
            
            // Set modal content
            document.getElementById('bookingModalTitle').textContent = 'Booking Details';
            document.getElementById('bookingId').textContent = '#BK-' + (1000 + Math.floor(Math.random() * 9000));
            document.getElementById('guestName').textContent = event.title.split(' - ')[0];
            document.getElementById('roomInfo').textContent = event.title.split(' - ')[1];
            document.getElementById('checkInDate').textContent = event.startStr;
            document.getElementById('checkOutDate').textContent = event.endStr;
            
            // Calculate nights
            const checkIn = new Date(event.startStr);
            const checkOut = new Date(event.endStr);
            const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
            document.getElementById('nights').textContent = nights;
            
            // Set status based on event color
            let status, statusClass;
            if(event.backgroundColor === '#2ecc71') {
                status = 'Confirmed';
                statusClass = 'confirmed';
            } else if(event.backgroundColor === '#f39c12') {
                status = 'Pending';
                statusClass = 'pending';
            } else if(event.backgroundColor === '#9b59b6') {
                status = 'Completed';
                statusClass = 'completed';
            }
            
            document.getElementById('bookingStatus').textContent = status;
            document.getElementById('bookingStatus').className = 'status ' + statusClass;
            
            // Open modal
            document.getElementById('bookingModal').classList.add('active');
        },
        dateClick: function(info) {
            // When clicking on a date, open the add booking form with that date pre-filled
            document.getElementById('editBookingModalTitle').textContent = 'Add New Booking';
            document.getElementById('bookingCheckIn').value = info.dateStr;
            bookingForm.reset();
            editBookingModal.classList.add('active');
        }
    });
    
    calendar.render();
}