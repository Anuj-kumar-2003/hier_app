document.addEventListener('DOMContentLoaded', function () {

    // Dummy Data
    const dashboardData = {
        customers: 1240,
        drivers: 520,
        bookings: 3480,
        revenue: 245000
    };

    // Fill Statistics
    document.getElementById('totalCustomers').textContent =
        dashboardData.customers;

    document.getElementById('totalDrivers').textContent =
        dashboardData.drivers;

    document.getElementById('totalBookings').textContent =
        dashboardData.bookings;

    document.getElementById('totalRevenue').textContent =
        '₹' + dashboardData.revenue.toLocaleString();

    // Approve Buttons
    document.querySelectorAll('.approve-btn').forEach(button => {

        button.addEventListener('click', function () {

            alert('Driver Approved Successfully');

            this.parentElement.parentElement.remove();
        });

    });

    // Reject Buttons
    document.querySelectorAll('.reject-btn').forEach(button => {

        button.addEventListener('click', function () {

            alert('Driver Rejected');

            this.parentElement.parentElement.remove();
        });

    });

});