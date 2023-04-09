document.addEventListener('DOMContentLoaded', () => {
  const scrollItems = document.querySelectorAll('.qualities');

  const scrollAnimation = () => {
    let windowCenter = (window.innerHeight / 3) + window.scrollY;
    console.log(windowCenter);
    scrollItems.forEach(el => {
      let scrollOffset = el.offsetTop + (el.offsetHeight / 3);
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
