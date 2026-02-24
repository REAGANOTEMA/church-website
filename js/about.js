// ================= HERO SLIDER =================
const slides = document.querySelectorAll('.hero .slide');
let currentSlide = 0;
let sliderInterval;

// Fonts for magical header effect
const magicalFonts = [
  'Georgia', 'Palatino', 'Garamond', 'Playfair Display', 'Cinzel', 'Cormorant Garamond', 'Times New Roman'
];

// Show slide function
function showSlide(index) {
  slides.forEach((slide, i) => {
    const content = slide.querySelector('.slide-content');

    if (i === index) {
      slide.classList.add('active');

      // Animate content
      if (content) {
        setTimeout(() => {
          content.style.opacity = 1;
          content.style.transform = 'translate(-50%, -50%)';

          // Magical header font change
          const header = content.querySelector('h2');
          if (header) {
            header.style.fontFamily = magicalFonts[Math.floor(Math.random() * magicalFonts.length)];
          }
        }, 200);
      }
    } else {
      slide.classList.remove('active');
      if (content) {
        content.style.opacity = 0;
        content.style.transform = 'translate(-50%, -60%)';
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

// Start slider
function startSlider() {
  sliderInterval = setInterval(nextSlide, 5000);
}

// Stop slider
function stopSlider() {
  clearInterval(sliderInterval);
}

// Initialize slider
if (slides.length > 0) {
  showSlide(0);
  startSlider();

  // Pause on hover
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', stopSlider);
    hero.addEventListener('mouseleave', startSlider);
  }
}

// ================= BUTTON SHAKE =================
function shakeButtons() {
  document.querySelectorAll('.hero .btn').forEach(btn => {
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 600);
  });
}
// Shake every 60 seconds
setInterval(shakeButtons, 60000);

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ================= FORM SUBMISSION =================
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your message or prayer request has been submitted.');
    form.reset();
  });
});

// ================= HAMBURGER MENU =================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close menu when link clicked (mobile UX)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}