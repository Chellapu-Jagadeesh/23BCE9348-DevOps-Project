document.addEventListener("DOMContentLoaded", function () {
    console.log("Tourism Portal Loaded Successfully.");
    const bookingForm = document.querySelector(".booking-form");
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Thank you! Your trip booking request has been submitted successfully.");
        bookingForm.reset();
    });
});