document.querySelector('.booking-card').addEventListener('submit', function (e) {
    e.preventDefault();

    const bookingData = {
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('customerEmail')?.value || '',
        phone: document.getElementById('phone').value,
        tripType: document.getElementById('tripType').value,
        pickupLocation: document.getElementById('pickupLocation').value,
        dropLocation: document.getElementById('dropLocation').value,
        travelDate: document.getElementById('travelDate').value,
        travelTime: document.getElementById('travelTime').value,
        specialInstructions: document.getElementById('specialInstructions').value
    };

    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    // If you use a separate search page:
    window.location.href = '/search-results.html';

    // Or go directly to confirmation:
    // window.location.href = '/booking-confirmation.html';
});