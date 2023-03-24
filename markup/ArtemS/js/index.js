const upButton = document.querySelector(".footer-up");

upButton.addEventListener('click', function(){
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});