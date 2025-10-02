const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

showSlide(currentSlide);

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
      dots[i].classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 7000);

// Click on dots to jump to a slide
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  });
});
