document.getElementById('hireDriverForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = {
    customerName: document.getElementById('customerName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    city: document.getElementById('city').value,
    pickupDate: document.getElementById('pickupDate').value,
    pickupTime: document.getElementById('pickupTime').value,
    duration: document.getElementById('duration').value,
    vehicleType: document.getElementById('vehicleType').value,
    requirements: document.getElementById('requirements').value,
    experience: document.getElementById('experience').value
  };

  const response = await fetch('/api/hire-driver', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  const result = await response.json();
  alert(result.message);

  if (result.success) {
    document.getElementById('hireDriverForm').reset();
  }
});