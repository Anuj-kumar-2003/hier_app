document.addEventListener('DOMContentLoaded', function () {
    const driverData = JSON.parse(localStorage.getItem('driverRegistrationData'));

    if (!driverData) {
        window.location.href = '/views/driver-register.html';
        return;
    }

    // Fill review fields
    document.getElementById('fullName').textContent =
        driverData.fullName || '';

    document.getElementById('email').textContent =
        driverData.email || '';

    document.getElementById('phone').textContent =
        driverData.phone || '';

    document.getElementById('licenseNumber').textContent =
        driverData.licenseNumber || '';

    document.getElementById('experience').textContent =
        driverData.experience ? `${driverData.experience} Years` : '';

    document.getElementById('city').textContent =
        driverData.city || '';

    // Final submission
    document.getElementById('submitBtn').addEventListener('click', async function () {
        const response = await fetch('/register-driver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driverData)
        });

        if (response.ok) {
            localStorage.removeItem('driverRegistrationData');
            alert('Driver registration successful!');
            window.location.href = '/driver-login.html';
        } else {
            const message = await response.text();
            alert(message);
        }
    });
});