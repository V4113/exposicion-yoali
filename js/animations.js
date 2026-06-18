(function () {
  "use strict";

  function setDirection(slides, direction) {
    // La direcci&oacute;n permite que la animaci&oacute;n cambie si se avanza o retrocede.
    slides.forEach((slide) => {
      slide.classList.toggle("reverse", direction < 0);
    });
  }

  window.YoaliAnimations = {
    setDirection,
  };
})();
