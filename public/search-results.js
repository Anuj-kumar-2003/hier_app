document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.driver-card');

        const selectedDriver = {
            name: card.querySelector('h3').textContent,
            experience: card.querySelector('.driver-info p').textContent,
            rating: card.querySelector('.rating').textContent.trim(),
            price: card.querySelector('.driver-details strong:last-child').textContent
        };

        localStorage.setItem('selectedDriver', JSON.stringify(selectedDriver));

        window.location.href = '/booking-confirmation.html';
    });
});