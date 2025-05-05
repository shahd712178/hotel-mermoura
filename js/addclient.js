document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const arrivalInput = document.getElementById('arrival');
    const departureInput = document.getElementById('departure');
    const roomTypeSelect = document.getElementById('room-type');
    const guestsSelect = document.getElementById('guests');
    const bookingDetails = document.getElementById('bookingDetails');
    const clientForm = document.getElementById('clientForm');
    
    // Room prices (you can customize these)
    const roomPrices = {
        'Single': 120,
        'Double': 180,
        'Junior-Single': 150,
        'Junior-Double': 220,
        'Apart-Single': 200,
        'Apart-Double': 280
    };
    
    // Set minimum arrival date to today
    const today = new Date().toISOString().split('T')[0];
    arrivalInput.min = today;
    
    // Update departure min date when arrival changes
    arrivalInput.addEventListener('change', function() {
        if (arrivalInput.value) {
            departureInput.min = arrivalInput.value;
            
            // If departure is before arrival, reset it
            if (departureInput.value && departureInput.value < arrivalInput.value) {
                departureInput.value = '';
            }
        }
        updateBookingSummary();
    });
    
    // Update booking summary when any field changes
    [departureInput, roomTypeSelect, guestsSelect].forEach(element => {
        element.addEventListener('change', updateBookingSummary);
    });
    
    // Calculate and display booking summary
    function updateBookingSummary() {
        if (arrivalInput.value && departureInput.value && roomTypeSelect.value) {
            const arrivalDate = new Date(arrivalInput.value);
            const departureDate = new Date(departureInput.value);
            
            // Calculate nights
            const timeDiff = departureDate - arrivalDate;
            const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            
            if (nights > 0) {
                const roomType = roomTypeSelect.value;
                const guests = guestsSelect.value;
                const pricePerNight = roomPrices[roomType] || 0;
                const totalPrice = pricePerNight * nights;
                
                bookingDetails.innerHTML = `
                    <p><strong>Room Type:</strong> ${roomType}</p>
                    <p><strong>Check-in:</strong> ${formatDate(arrivalDate)}</p>
                    <p><strong>Check-out:</strong> ${formatDate(departureDate)}</p>
                    <p><strong>Nights:</strong> ${nights}</p>
                    <p><strong>Guests:</strong> ${guests}</p>
                    <p><strong>Price per night:</strong> $${pricePerNight}</p>
                    <p class="total-price"><strong>Total Price:</strong> $${totalPrice}</p>
                `;
            } else {
                bookingDetails.innerHTML = '<p class="error">Departure date must be after arrival date</p>';
            }
        } else {
            bookingDetails.innerHTML = '<p>Complete your booking details to see the summary</p>';
        }
    }
    
    // Format date for display
    function formatDate(date) {
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    // Form submission
    clientForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Collect form data
        const formData = {
            arrival: arrivalInput.value,
            departure: departureInput.value,
            roomType: roomTypeSelect.value,
            guests: guestsSelect.value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            payment: document.querySelector('input[name="payment"]:checked').value
        };
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Your reservation has been confirmed! Thank you for choosing Hotel Mermoura.');
        
        // Reset form (optional)
        // clientForm.reset();
        // bookingDetails.innerHTML = '<p>Complete your booking details to see the summary</p>';
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Check required fields
        const requiredFields = [
            'first-name', 'last-name', 'email', 'phone',
            'arrival', 'departure', 'room-type', 'guests'
        ];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        // Validate email format
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        // Validate phone number (basic validation)
        const phone = document.getElementById('phone');
        if (phone.value.length < 8) {
            phone.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        // Validate dates
        if (arrivalInput.value && departureInput.value) {
            const arrival = new Date(arrivalInput.value);
            const departure = new Date(departureInput.value);
            
            if (departure <= arrival) {
                departureInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
        }
        
        if (!isValid) {
            alert('Please fill in all required fields correctly.');
        }
        
        return isValid;
    }
    
    // Initialize booking summary
    updateBookingSummary();
});