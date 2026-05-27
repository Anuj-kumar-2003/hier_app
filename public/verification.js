document.addEventListener('DOMContentLoaded', function () {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));

    if (!bookingData) {
        window.location.href = '/views/book-driver.html';
        return;
    }

    // Customer Details
    document.getElementById('customerName').textContent =
        bookingData.customerName || '';

    document.getElementById('customerEmail').textContent =
        bookingData.customerEmail || 'Not Provided';

    document.getElementById('customerPhone').textContent =
        bookingData.phone || '';

    // Trip Details
    document.getElementById('tripType').textContent =
        bookingData.tripType || '';

    document.getElementById('pickupLocation').textContent =
        bookingData.pickupLocation || '';

    document.getElementById('dropLocation').textContent =
        bookingData.dropLocation || '';

    document.getElementById('travelDate').textContent =
        bookingData.travelDate || '';

    document.getElementById('travelTime').textContent =
        bookingData.travelTime || '';

    document.getElementById('specialInstructions').textContent =
        bookingData.specialInstructions || 'None';

    // Confirm button
    document.getElementById('confirmBtn').addEventListener('click', function () {
        window.location.href = '/search-results.html';
    });
});