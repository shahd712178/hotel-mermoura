// messages.js - Enhanced Messages Management Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        messageDetailModal: document.getElementById('messageDetailModal'),
        closeMessageModal: document.getElementById('closeMessageModal'),
        messageItems: document.querySelectorAll('.message-item'),
        selectAllCheckbox: document.getElementById('selectAllMessages'),
        messageCheckboxes: document.querySelectorAll('.message-checkbox input'),
        bulkActionButtons: {
            markRead: document.querySelector('.btn-mark-read-bulk'),
            archive: document.querySelector('.btn-archive-bulk'),
            delete: document.querySelector('.btn-delete-bulk')
        },
        filters: {
            status: document.getElementById('messageStatus'),
            type: document.getElementById('messageType'),
            search: document.getElementById('messageSearch')
        },
        replyForm: document.getElementById('replyForm'),
        cancelReplyBtn: document.getElementById('cancelReplyBtn')
    };

    // State Management
    const state = {
        selectedMessages: new Set(),
        currentOpenMessage: null
    };

    // Initialize event listeners
    function initEventListeners() {
        // Modal close
        if (elements.closeMessageModal) {
            elements.closeMessageModal.addEventListener('click', closeMessageModal);
        }

        // Window click handler
        window.addEventListener('click', handleWindowClick);

        // Message item click handlers
        elements.messageItems.forEach(item => {
            item.addEventListener('click', handleMessageItemClick);
            
            // Individual action buttons
            item.querySelector('.btn-mark-read').addEventListener('click', handleMarkAsRead);
            item.querySelector('.btn-reply').addEventListener('click', handleReply);
            item.querySelector('.btn-archive').addEventListener('click', handleArchive);
        });

        // Bulk actions
        if (elements.selectAllCheckbox) {
            elements.selectAllCheckbox.addEventListener('change', handleSelectAll);
        }

        elements.bulkActionButtons.markRead.addEventListener('click', handleBulkMarkAsRead);
        elements.bulkActionButtons.archive.addEventListener('click', handleBulkArchive);
        elements.bulkActionButtons.delete.addEventListener('click', handleBulkDelete);

        // Filters
        elements.filters.status.addEventListener('change', filterMessages);
        elements.filters.type.addEventListener('change', filterMessages);
        elements.filters.search.addEventListener('input', filterMessages);

        // Reply form
        if (elements.replyForm) {
            elements.replyForm.addEventListener('submit', handleReplySubmit);
        }
        if (elements.cancelReplyBtn) {
            elements.cancelReplyBtn.addEventListener('click', resetReplyForm);
        }
    }

    // Message Modal Functions
    function openMessageModal(messageItem) {
        if (!messageItem) return;
        
        const senderAvatar = messageItem.querySelector('.sender-avatar img').src;
        const senderName = messageItem.querySelector('.sender-info h3').textContent;
        const senderEmail = messageItem.querySelector('.sender-info p').textContent;
        const messageSubject = messageItem.querySelector('.message-preview h3').textContent;
        const messageType = messageItem.querySelector('.message-type').textContent;
        const messageDate = messageItem.querySelector('.message-date').textContent;
        
        // Set modal content
        document.getElementById('detailSenderAvatar').src = senderAvatar;
        document.getElementById('detailSenderName').textContent = senderName;
        document.getElementById('detailSenderEmail').textContent = senderEmail;
        document.getElementById('detailMessageSubject').textContent = messageSubject;
        document.getElementById('detailMessageType').textContent = messageType;
        document.getElementById('detailMessageDate').textContent = messageDate;
        
        // Set message type class
        const typeDetail = document.getElementById('detailMessageType');
        typeDetail.className = 'message-type-detail ' + messageItem.querySelector('.message-type').classList[1];
        
        // Store reference to currently open message
        state.currentOpenMessage = messageItem;
        
        // Open modal
        elements.messageDetailModal.classList.add('active');
    }

    function closeMessageModal() {
        elements.messageDetailModal.classList.remove('active');
        state.currentOpenMessage = null;
    }

    // Message Status Functions
    function markMessageAsRead(messageItem) {
        if (!messageItem) return;
        
        messageItem.classList.remove('unread');
        messageItem.classList.add('read');
        messageItem.querySelector('.btn-mark-read').innerHTML = '<i class="fas fa-envelope-open"></i>';
    }

    function archiveMessage(messageItem) {
        if (!messageItem) return;
        
        messageItem.classList.add('archived');
        messageItem.style.display = 'none';
        
        // If this was the currently open message, close the modal
        if (state.currentOpenMessage === messageItem) {
            closeMessageModal();
        }
    }

    function deleteMessage(messageItem) {
        if (!messageItem) return;
        
        messageItem.remove();
        
        // If this was the currently open message, close the modal
        if (state.currentOpenMessage === messageItem) {
            closeMessageModal();
        }
    }

    // Selection Functions
    function updateSelectedMessages() {
        state.selectedMessages.clear();
        elements.messageCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                state.selectedMessages.add(checkbox.closest('.message-item'));
            }
        });
    }

    // Filter Functions
    function filterMessages() {
        const statusValue = elements.filters.status.value;
        const typeValue = elements.filters.type.value;
        const searchValue = elements.filters.search.value.toLowerCase();
        
        elements.messageItems.forEach(item => {
            if (item.classList.contains('archived') && statusValue !== 'archived') {
                item.style.display = 'none';
                return;
            }
            
            const itemStatus = item.classList.contains('unread') ? 'unread' : 
                             item.classList.contains('replied') ? 'replied' : 
                             item.classList.contains('archived') ? 'archived' : 'read';
            
            const itemType = item.querySelector('.message-type').classList[1];
            const itemContent = item.textContent.toLowerCase();
            
            const statusMatch = statusValue === 'all' || itemStatus === statusValue;
            const typeMatch = typeValue === 'all' || itemType === typeValue;
            const searchMatch = searchValue === '' || itemContent.includes(searchValue);
            
            item.style.display = (statusMatch && typeMatch && searchMatch) ? '' : 'none';
        });
    }

    // Event Handlers
    function handleWindowClick(e) {
        if (e.target === elements.messageDetailModal) {
            closeMessageModal();
        }
    }

    function handleMessageItemClick(e) {
        // Don't open details if clicking on checkbox or action buttons
        if (e.target.closest('.message-checkbox') || e.target.closest('.message-actions')) {
            return;
        }
        
        const messageItem = e.currentTarget;
        openMessageModal(messageItem);
        
        // Mark as read when opening
        if (messageItem.classList.contains('unread')) {
            markMessageAsRead(messageItem);
        }
    }

    function handleMarkAsRead(e) {
        e.stopPropagation();
        markMessageAsRead(e.currentTarget.closest('.message-item'));
    }

    function handleReply(e) {
        e.stopPropagation();
        // Focus on reply textarea when clicking reply
        const replyTextarea = document.getElementById('replyMessage');
        if (replyTextarea) {
            replyTextarea.focus();
        }
    }

    function handleArchive(e) {
        e.stopPropagation();
        const messageItem = e.currentTarget.closest('.message-item');
        
        if (confirm('Are you sure you want to archive this message?')) {
            archiveMessage(messageItem);
            showToast('Message archived!');
        }
    }

    function handleSelectAll(e) {
        elements.messageCheckboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
        updateSelectedMessages();
    }

    function handleBulkMarkAsRead() {
        updateSelectedMessages();
        
        if (state.selectedMessages.size === 0) {
            showAlert('Please select at least one message');
            return;
        }
        
        state.selectedMessages.forEach(messageItem => {
            markMessageAsRead(messageItem);
        });
        
        elements.selectAllCheckbox.checked = false;
        showToast(`${state.selectedMessages.size} messages marked as read`);
        state.selectedMessages.clear();
    }

    function handleBulkArchive() {
        updateSelectedMessages();
        
        if (state.selectedMessages.size === 0) {
            showAlert('Please select at least one message');
            return;
        }
        
        if (confirm(`Are you sure you want to archive ${state.selectedMessages.size} messages?`)) {
            state.selectedMessages.forEach(messageItem => {
                archiveMessage(messageItem);
            });
            
            elements.selectAllCheckbox.checked = false;
            showToast(`${state.selectedMessages.size} messages archived`);
            state.selectedMessages.clear();
        }
    }

    function handleBulkDelete() {
        updateSelectedMessages();
        
        if (state.selectedMessages.size === 0) {
            showAlert('Please select at least one message');
            return;
        }
        
        if (confirm(`Are you sure you want to delete ${state.selectedMessages.size} messages? This action cannot be undone.`)) {
            state.selectedMessages.forEach(messageItem => {
                deleteMessage(messageItem);
            });
            
            elements.selectAllCheckbox.checked = false;
            showToast(`${state.selectedMessages.size} messages deleted`);
            state.selectedMessages.clear();
        }
    }

    function handleReplySubmit(e) {
        e.preventDefault();
        const replyText = document.getElementById('replyMessage').value.trim();
        
        if (!replyText) {
            showAlert('Please enter a reply message');
            return;
        }
        
        // In a real app, this would send the reply
        console.log('Reply sent:', replyText);
        showToast('Reply sent successfully!');
        
        // Mark as replied
        if (state.currentOpenMessage) {
            state.currentOpenMessage.classList.add('replied');
            const statusBadge = state.currentOpenMessage.querySelector('.message-type');
            if (statusBadge) {
                statusBadge.textContent = 'Replied';
                statusBadge.className = 'message-type replied';
            }
        }
        
        resetReplyForm();
    }

    function resetReplyForm() {
        if (elements.replyForm) {
            elements.replyForm.reset();
        }
    }

    // UI Feedback Functions
    function showAlert(message) {
        alert(message);
    }

    function showToast(message) {
        // In a real app, this would show a nice toast notification
        console.log('Toast:', message);
    }

    // Initialize the application
    initEventListeners();
});