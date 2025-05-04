// rooms.js - Rooms Management Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const addRoomBtn = document.getElementById('addRoomBtn');
    const roomModal = document.getElementById('roomModal');
    const closeModal = document.getElementById('closeModal');
    const cancelRoomBtn = document.getElementById('cancelRoomBtn');
    const roomForm = document.getElementById('roomForm');
    
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    
    // Open modal for adding new room
    if(addRoomBtn) {
        addRoomBtn.addEventListener('click', function() {
            document.getElementById('modalTitle').textContent = 'Add New Room';
            roomForm.reset();
            roomModal.classList.add('active');
        });
    }
    
    // Close modal
    if(closeModal) {
        closeModal.addEventListener('click', function() {
            roomModal.classList.remove('active');
        });
    }
    
    if(cancelRoomBtn) {
        cancelRoomBtn.addEventListener('click', function() {
            roomModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if(e.target === roomModal) {
            roomModal.classList.remove('active');
        }
    });
    
    // Form submission
    if(roomForm) {
        roomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally send data to server
            alert('Room saved successfully!');
            roomModal.classList.remove('active');
            // In a real app, you would update the table here
        });
    }
    
    // Edit room functionality
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            // Get data from the row
            const roomId = row.cells[0].textContent;
            const roomType = row.cells[2].textContent;
            const price = row.cells[3].textContent.replace(/\D/g, '');
            const size = row.cells[4].textContent.replace(/\D/g, '');
            const capacity = row.cells[5].textContent.split('-')[1];
            const availability = row.cells[6].querySelector('.status').classList[1];
            
            // Set modal title
            document.getElementById('modalTitle').textContent = 'Edit Room ' + roomId;
            
            // Fill form with data
            document.getElementById('roomType').value = roomType.split(' ')[0];
            document.getElementById('roomNumber').value = roomId;
            document.getElementById('price').value = price;
            document.getElementById('size').value = size;
            document.getElementById('capacity').value = capacity;
            document.getElementById('availability').value = availability;
            
            // Open modal
            roomModal.classList.add('active');
        });
    });
    
    // Delete room functionality
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if(confirm('Are you sure you want to delete this room?')) {
                const row = this.closest('tr');
                // In a real app, you would send a request to delete from server
                row.remove();
                alert('Room deleted successfully!');
            }
        });
    });
});