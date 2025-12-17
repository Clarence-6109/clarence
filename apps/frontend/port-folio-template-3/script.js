// script.js

// Select all project cards
const cards = document.querySelectorAll('.project-card');

// Function to handle mouse movement over a card
function handleTilt(event) {
    const card = event.currentTarget;
    // Get the center point of the card
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate mouse position relative to the center of the card
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    // Calculate rotation amounts (adjust sensitivity by changing the divisor, e.g., 25)
    // Tilt the card on the Y-axis based on horizontal mouse position
    // Tilt the card on the X-axis based on vertical mouse position (inverted for natural feel)
    const rotateY = mouseX / 35; 
    const rotateX = mouseY / -35; 

    // Apply the 3D transform using the style property
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.classList.add('active-tilt');
}

// Function to reset the card position when the mouse leaves
function resetTilt(event) {
    const card = event.currentTarget;
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    card.classList.remove('active-tilt');
}

// Attach event listeners to each card
cards.forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', resetTilt);
});
