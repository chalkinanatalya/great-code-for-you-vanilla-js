document.addEventListener('DOMContentLoaded', () => {
  const scrollItems = document.querySelectorAll('.qualities');

  const scrollAnimation = () => {
    const windowCenter = (window.innerHeight / 3) + window.scrollY;
    scrollItems.forEach((el) => {
      const scrollOffset = el.offsetTop + (el.offsetHeight / 3);
      if (windowCenter >= scrollOffset) {
        el.classList.add('animation-class');
      } else {
        el.classList.remove('animation-class');
      }
    });
  };

  scrollAnimation();
  window.addEventListener('scroll', () => {
    scrollAnimation();
  });
});
