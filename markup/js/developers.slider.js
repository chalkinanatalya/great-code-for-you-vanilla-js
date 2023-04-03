const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');
const sliderSlides = document.querySelectorAll('.slider-slide');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
const sliderDots = document.querySelectorAll('.slider-dot');

let slideIndex = 0;
let slideWidth = sliderSlides[0].clientWidth;

function goToSlide(index) {
  sliderTrack.style.transform = `translateX(-${index * slideWidth}px)`;
  slideIndex = index;
  updateSliderDots();
}

function slidePrev() {
  if (slideIndex === 0) {
    goToSlide(sliderSlides.length - 1);
  } else {
    goToSlide(slideIndex - 1);
  }
}

function slideNext() {
  if (slideIndex === sliderSlides.length - 1) {
    goToSlide(0);
  } else {
    goToSlide(slideIndex + 1);
  }
}

function updateSliderDots() {
  sliderDots.forEach((dot, index) => {
    if (index === slideIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

sliderPrev.addEventListener('click', slidePrev);
sliderNext.addEventListener('click', slideNext);

sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
});

window.addEventListener('resize', () => {
  slideWidth = sliderSlides[0].clientWidth;
  goToSlide(slideIndex);
});

goToSlide(0);