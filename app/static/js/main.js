// Woopy - Main JavaScript
// This file handles basic interactions and HTMX enhancements

// HTMX Configuration
document.addEventListener('htmx:afterRequest', function(evt) {
    // Handle HTMX response codes
    if (evt.detail.xhr.status === 401) {
        // Unauthorized - redirect to login
        window.location.href = '/auth/login';
    }
    if (evt.detail.xhr.status === 403) {
        // Forbidden - show error
        console.warn('Access denied');
    }
});

// Show loading indicator
document.addEventListener('htmx:beforeRequest', function(evt) {
    // Optional: add visual feedback for loading
});

// Handle HTMX errors gracefully
document.addEventListener('htmx:responseError', function(evt) {
    console.error('Request failed:', evt.detail);
});

// Form submission helpers
document.addEventListener('DOMContentLoaded', function() {
    // Keyboard shortcuts (optional)
    document.addEventListener('keydown', function(e) {
        // Cmd/Ctrl + Enter to submit nearest form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const form = document.activeElement.closest('form');
            if (form) {
                form.submit();
            }
        }
    });
});

// Utility function: Show notification
function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    document.body.insertBefore(alertDiv, document.body.firstChild);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Utility function: Confirm action
function confirmAction(message) {
    return confirm(message);
}

// Export for use in other modules
window.Woopy = {
    showNotification,
    confirmAction
};
