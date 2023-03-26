const upButton = document.querySelector(".footer-up");
const themeSwitch = document.querySelector('.header-switch');

upButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

themeSwitch.addEventListener('click', function (event) {
  document.body.classList.toggle('dark-theme');
  event.currentTarget.classList.toggle('checked');
});