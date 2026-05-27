document.addEventListener('DOMContentLoaded', function () {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));
    const selectedDriver = JSON.parse(localStorage.getItem('selectedDriver'));

    if (!bookingData || !selectedDriver) {
        window.location.href = '/views/book-driver.html';
        return;
    }

    document.getElementById('bookingId').textContent =
        'HIER' + Date.now().toString().slice(-6);

    document.getElementById('driverName').textContent =
        selectedDriver.name;

    document.getElementById('tripType').textContent =
        bookingData.tripType;

    document.getElementById('pickupLocation').textContent =
        bookingData.pickupLocation;

    document.getElementById('dropLocation').textContent =
        bookingData.dropLocation;

    document.getElementById('travelDate').textContent =
        bookingData.travelDate;

    document.getElementById('travelTime').textContent =
        bookingData.travelTime;

    document.getElementById('totalFare').textContent =
        selectedDriver.price;
});