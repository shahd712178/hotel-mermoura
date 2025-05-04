console.log("Script loaded!"); // Should appear in console

document.querySelectorAll('.settings-nav li').forEach(tab => {
    console.log("Found tab:", tab.textContent); // Should list all tabs
});
document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Functionality
    const tabItems = document.querySelectorAll('.settings-nav li');
    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and content
            document.querySelectorAll('.settings-nav li').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.settings-tab').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Form Submissions
    const forms = document.querySelectorAll('.settings-content form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const formId = form.id;
            
            try {
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
                submitBtn.disabled = true;
                
                // Simulate API call (replace with actual fetch)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                showAlert('Settings saved successfully!', 'success');
                
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                console.log(`Form ${formId} submitted with:`, Object.fromEntries(formData));
                
            } catch (error) {
                showAlert('Error saving settings. Please try again.', 'error');
                console.error('Error:', error);
            }
        });
    });

    // File Upload Previews
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const previewId = this.id + 'Preview';
            const previewElement = document.getElementById(previewId) || 
                                  this.closest('.file-upload').querySelector('img');
            
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewElement.src = e.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    });

    // Room Categories Management
    const categoryAddBtns = document.querySelectorAll('.btn-add');
    categoryAddBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const value = input.value.trim();
            
            if (value) {
                const selectedOptions = this.closest('.multi-select').querySelector('.selected-options');
                const newTag = document.createElement('span');
                newTag.className = 'option-tag';
                newTag.innerHTML = `${value} <i class="fas fa-times"></i>`;
                
                // Add delete functionality
                newTag.querySelector('i').addEventListener('click', function() {
                    this.parentElement.remove();
                });
                
                selectedOptions.appendChild(newTag);
                input.value = '';
            }
        });
    });

    // Deposit Amount Toggle
    const depositRadios = document.querySelectorAll('input[name="depositRequired"]');
    const depositAmountGroup = document.getElementById('depositAmountGroup');
    
    depositRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            depositAmountGroup.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    });

    // Email Template Switching
    const templateItems = document.querySelectorAll('.template-nav li');
    templateItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.template-nav li').forEach(li => {
                li.classList.remove('active');
            });
            document.querySelectorAll('.template-preview').forEach(content => {
                content.classList.remove('active');
            });
            
            this.classList.add('active');
            const templateId = this.getAttribute('data-template');
            document.getElementById(templateId).classList.add('active');
        });
    });

    // Helper function to show alerts
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('fade-out');
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }
});
window.onload = function () {
    const links = [
        { buttonId: 'settings', sectionId: 'top-navbar' },
        { buttonId: 'active', sectionId: 'general-settings' },
        { buttonId: 'room-settings', sectionId: 'room-settings-section' },
        { buttonId: 'booking-settings', sectionId: 'booking-settings-section' },
        { buttonId: 'payment-settings', sectionId: 'payment-settings-section' },
        { buttonId: 'email-settings', sectionId: 'email-settings-section' },
        { buttonId: 'user-settings', sectionId: 'user-settings-section' },
        { buttonId: 'Maintenance', sectionId: 'maintenance-section' }
    ];

    links.forEach(link => {
        const button = document.getElementById(link.buttonId);
        const section = document.getElementById(link.sectionId);

        if (button && section) {
            button.onclick = () => {
                section.scrollIntoView({ behavior: 'smooth' });
            };
        }
    });
};
