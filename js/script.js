// ================= HERO SLIDER =================
let slides = document.querySelectorAll('.hero .slide');
let currentSlide = 0;

// Initialize slides
slides.forEach((slide, index) => {
  if (index === 0) slide.classList.add('active');
  let content = slide.querySelector('.slide-content');
  if (content) {
    content.style.opacity = index === 0 ? 1 : 0;
    content.style.transform = index === 0 ? 'translateY(0)' : 'translateY(20px)';
  }
});

// Function to show next slide
function nextSlide() {
  let currentContent = slides[currentSlide].querySelector('.slide-content');
  if (currentContent) {
    currentContent.style.opacity = 0;
    currentContent.style.transform = 'translateY(20px)';
  }

  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');

  let nextContent = slides[currentSlide].querySelector('.slide-content');
  if (nextContent) {
    setTimeout(() => {
      nextContent.style.opacity = 1;
      nextContent.style.transform = 'translateY(0)';
      // Animate header font styles randomly for magical effect
      const fonts = ['Georgia', 'Palatino', 'Garamond', 'Tahoma', 'Verdana', 'Courier New', 'Lucida Console'];
      const header = nextContent.querySelector('h2');
      if (header) {
        header.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
      }
    }, 200);
  }
}

// Slide interval every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// ================= SLIDE BUTTON SHAKE =================
let shakeButtons = document.querySelectorAll('.hero .slide .btn');

function shakeSlideButtons() {
  shakeButtons.forEach(btn => {
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 600);
  });
}

// Shake buttons every 3 seconds
setInterval(shakeSlideButtons, 3000);

// ================= SMOOTH SCROLL FOR CTA LINKS =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ================= FORM SUBMISSION =================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your message or prayer request has been submitted.');
    form.reset();
  });
});

// ================= HAMBURGER MENU (MOBILE) =================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger bars
  hamburger.classList.toggle('active');
});