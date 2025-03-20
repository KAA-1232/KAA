document.addEventListener("DOMContentLoaded", function () {
  const navContainer = document.getElementById("nav-container");
  const navScrollable = navContainer.querySelector(".nav-scrollable");
  let scrollAmount = 0.2;
  let autoScrollInterval;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  const interval = 20;
  let autoScrolling = true;
  const scrollInstruction = navContainer.querySelector(".scroll-instruction");

  function hideInstruction() {
    scrollInstruction.style.display = "none";
  }

  function startAutoScroll() {
    if (!autoScrolling) return;
    autoScrollInterval = setInterval(function () {
      navScrollable.scrollLeft += scrollAmount;
      if (
        navScrollable.scrollLeft >=
          navScrollable.scrollWidth - navScrollable.clientWidth ||
        navScrollable.scrollLeft <= 0
      ) {
        stopAutoScroll();
      }
    }, interval);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  startAutoScroll();

  navScrollable.addEventListener("touchstart", function (e) {
    stopAutoScroll();
    isDragging = true;
    startX = e.touches[0].clientX;
    scrollLeft = navScrollable.scrollLeft;
    hideInstruction(); // Скрываем инструкцию
  });

  navScrollable.addEventListener("touchmove", function (e) {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const walk = (x - startX) * 1;
    navScrollable.scrollLeft = scrollLeft - walk;
  });

  navScrollable.addEventListener("touchend", function (e) {
    isDragging = false;
    if (
      navScrollable.scrollLeft >=
        navScrollable.scrollWidth - navScrollable.clientWidth ||
      navScrollable.scrollLeft <= 0
    ) {
      stopAutoScroll();
    } else {
      startAutoScroll();
      autoScrolling = true;
    }
  });

  navScrollable.addEventListener("mousedown", function (e) {
    stopAutoScroll();
    isDragging = true;
    startX = e.clientX;
    scrollLeft = navScrollable.scrollLeft;
    hideInstruction(); // Скрываем инструкцию
  });

  navScrollable.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX) * 1;
    navScrollable.scrollLeft = scrollLeft - walk;
  });

  navScrollable.addEventListener("mouseup", function () {
    isDragging = false;
    if (
      navScrollable.scrollLeft >=
        navScrollable.scrollWidth - navScrollable.clientWidth ||
      navScrollable.scrollLeft <= 0
    ) {
      stopAutoScroll();
    } else {
      startAutoScroll();
      autoScrolling = true;
    }
  });

  navScrollable.addEventListener("mouseleave", function () {
    isDragging = false;
    if (
      navScrollable.scrollLeft >=
        navScrollable.scrollWidth - navScrollable.clientWidth ||
      navScrollable.scrollLeft <= 0
    ) {
      stopAutoScroll();
    } else {
      startAutoScroll();
      autoScrolling = true;
    }
  });

  navScrollable.addEventListener("wheel", function (e) {
    e.preventDefault();
    stopAutoScroll();
    scrollAmount = e.deltaY > 0 ? 0.2 : -0.2;
    autoScrolling = false;
    hideInstruction(); // Скрываем инструкцию
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".portfolio-carousel");
  const track = document.querySelector(".portfolio-track");
  const dragInstruction = document.querySelector(".drag-instruction");
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  function hideInstruction() {
    if (dragInstruction) {
      dragInstruction.style.display = "none";
      localStorage.setItem("portfolio-drag-instruction-shown", "true");
    }
  }

  if (dragInstruction) {
    if (!localStorage.getItem("portfolio-drag-instruction-shown")) {
      dragInstruction.style.display = "block";
    }
  }

  // Обработчики событий для мыши
  if (carousel) {
    carousel.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.classList.add("dragging");
      hideInstruction();
    });

    carousel.addEventListener("mouseleave", () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    });

    carousel.addEventListener("mouseup", () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    });

    carousel.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

  // Обработчики событий для касания (тачскрин)
  if (carousel) {
    carousel.addEventListener("touchstart", (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      hideInstruction();
    });

    carousel.addEventListener("touchend", () => {
      isDragging = false;
    });

    carousel.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

  // ===  Обработчик колесика мыши  ===
  if (carousel) {
    carousel.addEventListener("wheel", function (e) {
      // Проверяем ширину экрана
      if (window.innerWidth < 900) {
        e.preventDefault(); // Предотвращаем вертикальную прокрутку
        carousel.scrollLeft += e.deltaY; // Горизонтальная прокрутка
      }
    });
  }
});
