// ================= HERO SLIDER WITH VIDEO FIRST =================
const slides = document.querySelectorAll('.hero .slide');
let currentSlide = 0;
let sliderInterval;

// Fonts for magical/bold headers
const heroFonts = [
  'Georgia, serif',
  'Palatino, serif',
  'Garamond, serif',
  'Tahoma, sans-serif',
  'Verdana, sans-serif',
  'Courier New, monospace',
  'Lucida Console, monospace'
];

// Function to handle video play/pause
function handleVideo(slide, active) {
  const video = slide.querySelector('video');
  if (!video) return;
  if (active) {
    video.currentTime = 0;
    video.play().catch(()=>{});
  } else {
    video.pause();
  }
}

// Show a specific slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    const content = slide.querySelector('.slide-content');
    if (i === index) {
      slide.classList.add('active');
      handleVideo(slide, true);
      if (content) {
        setTimeout(() => {
          content.style.opacity = 1;
          content.style.transform = 'translateY(0)';
          // Random bold/magical font for header
          const header = content.querySelector('h2');
          if (header) header.style.fontFamily = heroFonts[Math.floor(Math.random() * heroFonts.length)];
        }, 200);
      }
    } else {
      slide.classList.remove('active');
      handleVideo(slide, false);
      if (content) {
        content.style.opacity = 0;
        content.style.transform = 'translateY(20px)';
      }
    }
  });
  currentSlide = index;
}

// Go to next slide
function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

// Start automatic slider
function startSlider() {
  sliderInterval = setInterval(nextSlide, 5000);
}

// Stop automatic slider
function stopSlider() {
  clearInterval(sliderInterval);
}

// ================= BUTTON SHAKE =================
function shakeHeroButtons() {
  document.querySelectorAll('.hero .btn-3d').forEach(btn => {
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 600);
  });
}
// Shake every 60 seconds
setInterval(shakeHeroButtons, 60000);

// ================= INIT SLIDER =================
if (slides.length > 0) {
  const firstVideo = slides[0].querySelector('video');
  if (firstVideo) {
    firstVideo.muted = true;
    firstVideo.play().catch(()=>{});
    firstVideo.addEventListener('ended', () => {
      showSlide(1); // Start with first image slide after video
      startSlider();
    });
  } else {
    // No video, start normal slider
    showSlide(0);
    startSlider();
  }
}

// Pause on hover for premium UX
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mouseenter', stopSlider);
  hero.addEventListener('mouseleave', startSlider);
}

// ================= HAMBURGER MENU =================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Close menu when link clicked (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});