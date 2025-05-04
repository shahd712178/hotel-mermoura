// clients.js - Clients Management Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const clientModal = document.getElementById('clientModal');
    const closeClientModal = document.getElementById('closeClientModal');
    const cancelClientBtn = document.getElementById('cancelClientBtn');
    const clientForm = document.getElementById('clientForm');
    const addClientBtn = document.getElementById('addClientBtn');
    
    const clientDetailsModal = document.getElementById('clientDetailsModal');
    const closeClientDetailsModal = document.getElementById('closeClientDetailsModal');
    
    // Open modal for adding new client
    if(addClientBtn) {
        addClientBtn.addEventListener('click', function() {
            document.getElementById('clientModalTitle').textContent = 'Add New Client';
            clientForm.reset();
            clientModal.classList.add('active');
        });
    }
    
    // Close modals
    if(closeClientModal) {
        closeClientModal.addEventListener('click', function() {
            clientModal.classList.remove('active');
        });
    }
    
    if(closeClientDetailsModal) {
        closeClientDetailsModal.addEventListener('click', function() {
            clientDetailsModal.classList.remove('active');
        });
    }
    
    if(cancelClientBtn) {
        cancelClientBtn.addEventListener('click', function() {
            clientModal.classList.remove('active');
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if(e.target === clientModal) {
            clientModal.classList.remove('active');
        }
        if(e.target === clientDetailsModal) {
            clientDetailsModal.classList.remove('active');
        }
    });
    
    // Form submission
    if(clientForm) {
        clientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally send data to server
            alert('Client saved successfully!');
            clientModal.classList.remove('active');
            // In a real app, you would update the table here
        });
    }
    
    // Edit client buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            // Get data from the row
            const clientId = row.cells[0].textContent;
            const clientName = row.cells[1].textContent.trim();
            const clientEmail = row.cells[2].textContent;
            const clientPhone = row.cells[3].textContent;
            const clientCountry = row.cells[4].textContent;
            const clientStatus = row.cells[7].querySelector('.status').classList[1];
            
            // Set modal title
            document.getElementById('clientModalTitle').textContent = 'Edit Client ' + clientId;
            
            // Split name into first and last
            const nameParts = clientName.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');
            
            // Fill form with data
            document.getElementById('clientFirstName').value = firstName;
            document.getElementById('clientLastName').value = lastName;
            document.getElementById('clientEmail').value = clientEmail;
            document.getElementById('clientPhone').value = clientPhone;
            document.getElementById('clientCountry').value = clientCountry;
            document.getElementById('clientStatus').value = clientStatus;
            
            // Open modal
            clientModal.classList.add('active');
        });
    });
    
    // Delete client buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if(confirm('Are you sure you want to delete this client?')) {
                const row = this.closest('tr');
                // In a real app, you would send a request to delete from server
                row.remove();
                alert('Client deleted successfully!');
            }
        });
    });
    
    // View client details (click on row)
    const clientRows = document.querySelectorAll('.clients-table tbody tr');
    clientRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't open details if clicking on action buttons
            if(!e.target.closest('.actions')) {
                const clientId = row.cells[0].textContent;
                const clientName = row.cells[1].textContent.trim();
                const clientEmail = row.cells[2].textContent;
                const clientPhone = row.cells[3].textContent;
                const clientCountry = row.cells[4].textContent;
                const clientBookings = row.cells[5].textContent;
                const clientLastStay = row.cells[6].textContent;
                const clientStatus = row.cells[7].querySelector('.status').classList[1];
                const clientAvatar = row.querySelector('.client-avatar').src;
                
                // Set modal content
                document.getElementById('detailClientName').textContent = clientName;
                document.getElementById('detailClientAvatar').src = clientAvatar;
                document.getElementById('detailClientEmail').textContent = clientEmail;
                document.getElementById('detailClientPhone').textContent = clientPhone;
                document.getElementById('detailClientCountry').textContent = clientCountry;
                document.getElementById('detailClientBookings').textContent = clientBookings;
                document.getElementById('detailClientLastStay').textContent = clientLastStay;
                document.getElementById('detailClientStatus').textContent = clientStatus.charAt(0).toUpperCase() + clientStatus.slice(1);
                document.getElementById('detailClientStatus').className = 'status ' + clientStatus;
                
                // Open modal
                clientDetailsModal.classList.add('active');
            }
        });
    });
    
    // Edit client from details modal
    const editClientFromDetailsBtn = document.getElementById('editClientFromDetailsBtn');
    if(editClientFromDetailsBtn) {
        editClientFromDetailsBtn.addEventListener('click', function() {
            clientDetailsModal.classList.remove('active');
            
            // Get data from details modal
            const clientName = document.getElementById('detailClientName').textContent;
            const clientEmail = document.getElementById('detailClientEmail').textContent;
            const clientPhone = document.getElementById('detailClientPhone').textContent;
            const clientCountry = document.getElementById('detailClientCountry').textContent;
            const clientStatus = document.getElementById('detailClientStatus').classList[1];
            
            // Set modal title
            document.getElementById('clientModalTitle').textContent = 'Edit Client';
            
            // Split name into first and last
            const nameParts = clientName.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');
            
            // Fill form with data
            document.getElementById('clientFirstName').value = firstName;
            document.getElementById('clientLastName').value = lastName;
            document.getElementById('clientEmail').value = clientEmail;
            document.getElementById('clientPhone').value = clientPhone;
            document.getElementById('clientCountry').value = clientCountry;
            document.getElementById('clientStatus').value = clientStatus;
            
            // Open edit modal
            clientModal.classList.add('active');
        });
    }
    
    // Send email button
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    if(sendEmailBtn) {
        sendEmailBtn.addEventListener('click', function() {
            const clientEmail = document.getElementById('detailClientEmail').textContent;
            alert(`Email client form would open for: ${clientEmail}`);
        });
    }
    
    // View bookings button
    const viewClientBookingsBtn = document.getElementById('viewClientBookingsBtn');
    if(viewClientBookingsBtn) {
        viewClientBookingsBtn.addEventListener('click', function() {
            const clientName = document.getElementById('detailClientName').textContent;
            alert(`Would show all bookings for: ${clientName}`);
            // In a real app, this would filter the bookings page
        });
    }
    
    // Client search functionality
    const clientSearch = document.getElementById('clientSearch');
    if(clientSearch) {
        clientSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.clients-table tbody tr');
            
            rows.forEach(row => {
                const name = row.cells[1].textContent.toLowerCase();
                const email = row.cells[2].textContent.toLowerCase();
                const phone = row.cells[3].textContent.toLowerCase();
                
                if(name.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});