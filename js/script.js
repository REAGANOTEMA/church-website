document.addEventListener("DOMContentLoaded", () => {
  // ================= HERO SLIDER =================
  const slides = document.querySelectorAll(".hero .slide");
  let currentSlide = 0;
  let sliderInterval;

  // Fonts for magical/bold headers
  const heroFonts = [
    "Georgia, serif",
    "Palatino, serif",
    "Garamond, serif",
    "Tahoma, sans-serif",
    "Verdana, sans-serif",
    "Courier New, monospace",
    "Lucida Console, monospace"
  ];

  // Animate content (headers & paragraphs)
  function animateContent(slide) {
    if (!slide) return;
    const content = slide.querySelector(".slide-content");
    if (!content) return;
    content.style.opacity = 1;
    content.style.transform = "translateY(0)";

    const header = content.querySelector("h2");
    if (header) header.style.fontFamily = heroFonts[Math.floor(Math.random() * heroFonts.length)];
  }

  // Show a specific slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      const content = slide.querySelector(".slide-content");
      const video = slide.querySelector("video");

      if (i === index) {
        slide.classList.add("active");
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
          video.loop = true;
        }
        animateContent(slide);
      } else {
        slide.classList.remove("active");
        if (video) video.pause();
        if (content) {
          content.style.opacity = 0;
          content.style.transform = "translateY(20px)";
        }
      }
    });
    currentSlide = index;
  }

  // Next slide function
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  // Start/Stop automatic slider
  function startSlider() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, 5000); // 5 seconds per slide
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  // Initialize hero slider
  if (slides.length > 0) {
    const firstVideo = slides[0].querySelector("video");
    showSlide(0);

    if (firstVideo) {
      firstVideo.muted = true;
      firstVideo.play().catch(() => {});
      firstVideo.loop = true; // ensure seamless repeat
    }

    startSlider();
  }

  // Pause hero on hover
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mouseenter", stopSlider);
    hero.addEventListener("mouseleave", startSlider);
  }

  // ================= BUTTON SHAKE =================
  function shakeHeroButtons() {
    document.querySelectorAll(".hero .btn").forEach(btn => {
      btn.classList.add("shake");
      setTimeout(() => btn.classList.remove("shake"), 600);
    });
  }
  setInterval(shakeHeroButtons, 60000); // shake every 60 seconds

  // ================= HAMBURGER MENU =================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("active");
      });
    });
  }

  // ================= SMOOTH SCROLL =================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
});