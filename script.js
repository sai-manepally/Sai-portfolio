// Mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll spy
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (scrollY >= sec.offsetTop - 120) current = sec.id; });
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
});

// Progress bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  progressBar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
});

// Cursor glow
const glow = document.getElementById('cursorGlow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.opacity = '1';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', () => glow.style.opacity = '0');
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.15 });
fadeEls.forEach(el => fadeObserver.observe(el));

// Skill bars
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

// Contact form
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Thanks for reaching out! I'll get back to you soon.");
  this.reset();
});

// Typing effect
const roles = ["Software Development Engineer in Test", "Test Automation Architect", "Mobile & API Testing Expert"];
const typedEl = document.getElementById('typedText');
let roleIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// Stats counter
document.querySelectorAll('.counter').forEach(counter => {
  const target = +counter.dataset.target;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let count = 0;
        const step = target / 40;
        const update = () => {
          count += step;
          if (count < target) { counter.textContent = Math.ceil(count); requestAnimationFrame(update); }
          else counter.textContent = target;
        };
        update();
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(counter);
});

// Particle network background
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5
  }));
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,45,60,0.6)'; ctx.fill();
    });
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255,45,60,${1 - dist / 120})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      });
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
  window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

// Magnetic buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0,0)');
});