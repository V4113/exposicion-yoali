(function () {
  "use strict";

  const contentUrl = "data/content.json";
  // Referencias centrales del DOM; el resto se genera din&aacute;micamente desde JSON.
  const slidesRoot = document.querySelector("#slidesRoot");
  const brand = document.querySelector("#presentationBrand");
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  const progress = document.querySelector("#progress");

  let slides = [];
  let current = 0;
  let touchStartX = 0;

  function updateControls() {
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === slides.length - 1;
    progress.textContent = `${current + 1} / ${slides.length}`;
  }

  function showSlide(index, direction = 1) {
    // Limita el movimiento para evitar pasar antes de la primera o despu&eacute;s de la &uacute;ltima.
    const next = Math.max(0, Math.min(index, slides.length - 1));
    window.YoaliAnimations.setDirection(slides, direction);

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === next);
    });

    current = next;
    updateControls();
  }

  function bindNavigation() {
    prevBtn.addEventListener("click", () => showSlide(current - 1, -1));
    nextBtn.addEventListener("click", () => showSlide(current + 1, 1));

    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        showSlide(current + 1, 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showSlide(current - 1, -1);
      }

      if (event.key === "Home") {
        showSlide(0, -1);
      }

      if (event.key === "End") {
        showSlide(slides.length - 1, 1);
      }
    });

    window.addEventListener("touchstart", (event) => {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });

    window.addEventListener("touchend", (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 55) {
        showSlide(current + (diff > 0 ? 1 : -1), diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  function renderPresentation(content) {
    document.title = content.meta.title;
    brand.textContent = content.meta.brand;
    slidesRoot.replaceChildren(...content.slides.map(window.YoaliSlides.renderSlide));
    slides = Array.from(document.querySelectorAll(".slide"));
    current = 0;
    showSlide(0);
  }

  async function loadContent() {
    // Mantener los textos en JSON permite cambiarlos sin tocar HTML, CSS o JS.
    const response = await fetch(contentUrl);
    if (!response.ok) {
      throw new Error(`No se pudo cargar ${contentUrl}`);
    }
    return response.json();
  }

  async function init() {
    try {
      const content = await loadContent();
      renderPresentation(content);
      bindNavigation();
    } catch (error) {
      slidesRoot.innerHTML = `
        <section class="loading-slide">
          <div>
            <p class="kicker">⚠️ Falta el contenido</p>
            <h1>No se pudo cargar la presentaci&oacute;n</h1>
            <p>Abre este proyecto con un servidor local para permitir la lectura de <strong>data/content.json</strong>.</p>
          </div>
        </section>
      `;
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      progress.textContent = "0 / 0";
      console.error(error);
    }
  }

  init();
})();
