// Navbar scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'translateY(6.5px) rotate(45deg)' : '';
  spans[1].style.opacity  = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'translateY(-6.5px) rotate(-45deg)' : '';
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Scroll-triggered fade-up animations
const fadeEls = document.querySelectorAll(
  '.card, .cia-card, .service-card, .testimonial, .stat-item, .about-content, .about-image-wrap, .difference-content, .difference-list-wrap, .comparison-table, .section-header'
);
fadeEls.forEach((el, i) => {
  el.classList.add('fade-up');
  if (i % 3 === 1) el.classList.add('fade-up-delay-1');
  if (i % 3 === 2) el.classList.add('fade-up-delay-2');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// Form submission — posts to Netlify Forms
document.getElementById('applyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const data = new URLSearchParams(new FormData(form)).toString();
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
    });
    btn.textContent = 'Application Submitted ✓';
    btn.style.background = '#2a7a5c';
    form.querySelectorAll('input, select, textarea').forEach(f => {
      f.disabled = true;
      f.style.opacity = '0.5';
    });
  } catch {
    btn.textContent = 'Submit Your Application';
    btn.disabled = false;
  }
});

// Smooth active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navItems.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--gold-light)'
      : '';
  });
}, { passive: true });
