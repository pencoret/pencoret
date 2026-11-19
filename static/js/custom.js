document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".featured-slider");

  sliders.forEach(function (slider) {
    const slides = slider.querySelectorAll(".featured-slide");
    if (slides.length <= 1) return;

    const speed = parseInt(slider.getAttribute("data-speed"), 10) || 4000;
    let current = 0;
    let timer;

    function nextSlide() {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }

    function startSlider() {
      timer = setInterval(nextSlide, speed);
    }

    slider.addEventListener("mouseenter", () => clearInterval(timer));
    slider.addEventListener("mouseleave", startSlider);
    startSlider();
  });
});
