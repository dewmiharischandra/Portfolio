// ===== Responsive Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('primary-navigation');

function toggleMenu() {
  const isOpen = navMenu.getAttribute('data-state') === 'open';
  navMenu.setAttribute('data-state', isOpen ? 'closed' : 'open');
  navToggle.setAttribute('aria-expanded', String(!isOpen));
}
navToggle.addEventListener('click', toggleMenu);

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.setAttribute('data-state', 'closed');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Header shadow + active link on scroll
const header = document.querySelector('.site-header');
const links = document.querySelectorAll('.nav-link');
const sections = ['home','about','projects','skills','contact'].map(id => document.getElementById(id));

window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 4 ? 'var(--shadow-soft)' : 'none';
  const y = window.scrollY + 110;
  let current = 'home';
  sections.forEach(sec => { if (sec && y >= sec.offsetTop) current = sec.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
});

// Scroll-down button
document.getElementById('scrollDown')?.addEventListener('click', () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
});

// Reveal sections on scroll
const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal-section").forEach(sec => {
  sectionObserver.observe(sec);
});



// Reveal cards inside projects
const cardObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach(el => cardObserver.observe(el));

// Project card animation on scroll
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1
    });
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
    

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form dummy UX
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks! Your message was captured (demo form).');
  e.target.reset();
});
