let carousel = document.querySelector('.carousel-images');
let prevButton = document.querySelector('.prev-button');
let nextButton = document.querySelector('.next-button');

let currentIndex = 0;

function updateCarousel() {
    const offset = -currentIndex * 25;
    carousel.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});