// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Scroll spy - highlight active nav link
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (scrollY >= top) current = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15 });
fadeEls.forEach(el => fadeObserver.observe(el));

// Animate skill bars when visible
const skillFills = document.querySelectorAll('.fill');
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObserver.observe(el));

// Contact form (no backend yet - just confirms submission)
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thanks for reaching out! I\'ll get back to you soon.');
    this.reset();
});
