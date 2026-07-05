// Tourism data
const destinations = [
    { name: "Taj Mahal, Agra", description: "One of the Seven Wonders of the World" },
    { name: "Jaipur, Rajasthan", description: "The Pink City with majestic forts" },
    { name: "Kerala Backwaters", description: "Serene houseboat experiences" },
    { name: "Goa Beaches", description: "Sun, sand, and sea adventures" },
    { name: "Varanasi Ghats", description: "Spiritual capital of India" },
    { name: "Ladakh Valley", description: "Breathtaking Himalayan landscapes" }
];

const hotels = [
    { name: "The Taj Mahal Palace", description: "Mumbai - 5 Star Luxury" },
    { name: "Oberoi Udaivilas", description: "Udaipur - Heritage Palace Hotel" },
    { name: "Wildflower Hall", description: "Shimla - Mountain Resort" }
];

const guides = [
    { name: "Cultural Tours", description: "Explore India's rich heritage" },
    { name: "Adventure Trips", description: "Trekking, rafting, and more" },
    { name: "Food Walks", description: "Taste authentic local cuisine" }
];

// Populate cards
function createCards(containerId, items) {
    const container = document.getElementById(containerId);
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${item.name}</h3><p>${item.description}</p>`;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createCards('destinations-container', destinations);
    createCards('hotels-container', hotels);
    createCards('guides-container', guides);
});

function showAlert() {
    alert('Thank you for your interest! Contact us at info@exploreindia.com');
}