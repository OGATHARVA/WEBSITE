/* =========================================================
   ATHARVA BHOSLE – PORTFOLIO JAVASCRIPT
   Features: Custom cursor, Particles, Typing, Scroll reveals,
             Navbar scroll, Stats counter, Skill bars, Form
   ========================================================= */

'use strict';

// ===================== LOADER =====================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    // Trigger hero animations
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
  }, 2200);
});

// ===================== CUSTOM CURSOR =====================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor enlarge on interactive elements
const interactiveEls = document.querySelectorAll('a, button, input, textarea, .skill-card, .about-card, .nav-toggle');
interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    follower.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    follower.classList.remove('active');
  });
});

// ===================== PARTICLE CANVAS =====================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrameId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.2 + 0.4;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.speedY = (Math.random() - 0.5) * 0.35;
    this.opacity = Math.random() * 0.55 + 0.1;
    // One Piece color palette: orange, gold, blue sea
    const colorRoll = Math.random();
    if (colorRoll < 0.45) {
      this.color = `rgba(255,120,0,${this.opacity})`;        // OP orange
    } else if (colorRoll < 0.75) {
      this.color = `rgba(255,215,0,${this.opacity * 0.7})`; // OP gold
    } else {
      this.color = `rgba(26,100,180,${this.opacity})`;       // sea blue
    }
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    if (this.life > this.maxLife || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)
      this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 120);
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();
window.addEventListener('resize', initParticles);

// Draw connecting lines between nearby particles
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 120) * 0.12;
        ctx.strokeStyle = '#ff7800';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animFrameId = requestAnimationFrame(animateParticles);
}
animateParticles();

// ===================== NAVBAR =====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinksList = document.getElementById('navLinks');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNav();
});

navToggle.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  navLinksList.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)',
       spans[1].style.opacity = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)')
    : (spans[0].style.transform = '',
       spans[1].style.opacity = '',
       spans[2].style.transform = '');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) link.classList.add('active');
  });
}

// ===================== TYPING ANIMATION =====================
const texts = [
  'Future King of the Pirates 🏴‍☠️',
  'Electronics Engineer',
  'Anime Enthusiast ⚓',
  'Computer Eng. Student',
  'Nakama of Technology 🌊',
  'Future Innovator ⚡'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;
const typedEl = document.getElementById('typedText');

function typeText() {
  const currentText = texts[textIndex];
  if (isDeleting) {
    typedEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    typedEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 1800; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 300;
  }
  setTimeout(typeText, typingSpeed);
}
setTimeout(typeText, 2400); // Start after loader

// ===================== SCROLL REVEAL =====================
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => {
  // Don't observe hero elements – they're triggered differently
  if (!el.closest('.hero')) revealObserver.observe(el);
});

// ===================== STATS COUNTER =====================
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let current = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// ===================== SKILL BARS =====================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(el => skillObserver.observe(el));

// ===================== CONTACT FORM =====================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = document.getElementById('sendBtn');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Sending…';

  // Simulate sending (no backend – just UX demo)
  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Send Message';
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1500);
});

// ===================== SMOOTH LINK SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===================== PARALLAX ORBs ON MOUSE =====================
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const factor = (i + 1) * 0.5;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ===================== RIPPLE EFFECT ON BUTTONS =====================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      border-radius:50%; background:rgba(255,255,255,0.25);
      transform:scale(0); animation:ripple 0.6s ease; pointer-events:none;
    `;
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// Ripple CSS via JS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

// ===================== GLOWING CARD TILT =====================
document.querySelectorAll('.about-card, .skill-card, .timeline-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===================== PAGE VISIBILITY OPTIMIZATION =====================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animFrameId);
  } else {
    animateParticles();
  }
});

console.log('%c✨ Atharva Bhosle Portfolio', 'font-size:18px; font-weight:bold; background:linear-gradient(135deg,#ff7800,#ffd700); -webkit-background-clip:text; color:transparent;');
console.log('%cBuilt with passion & code 🏴‍☠️', 'color:#ff7800; font-size:13px;');

// ===================== GEAR CYCLE =====================
const gearData = [
  {
    gear: 2,
    src: 'img_gear2.png',
    alt: 'Luffy Gear Second – Steam Mode',
    badge1: '🔴 Steam Mode',
    badge2: '⚡ Gear 2',
    hint: 'Tap to advance!'
  },
  {
    gear: 3,
    src: 'img_gear3.png',
    alt: 'Luffy Gear Third – Giant',
    badge1: '💎 Gigant Mode',
    badge2: '🦴 Gear 3',
    hint: 'Keep going!'
  },
  {
    gear: 4,
    src: 'img_gear4.png',
    alt: 'Luffy Gear Fourth – Boundman',
    badge1: '⚫ Haki Coating',
    badge2: '💥 Gear 4',
    hint: 'Almost there!'
  },
  {
    gear: 5,
    src: 'img_onepiece.png',
    alt: 'Luffy Gear Fifth – Sun God Nika',
    badge1: '👒 Straw Hat Crew',
    badge2: '🌟 Gear 5',
    hint: '🌟 MAX POWER!'
  }
];

let currentGear = 0; // start at Gear 2 (index 0)
let gearHintHidden = false;

const gearFrame = document.getElementById('gearFrame');
const gearImg   = document.getElementById('gearImg');
const gearBadge1 = document.getElementById('gearBadge1');
const gearBadge2 = document.getElementById('gearBadge2');
const gearBurst  = document.getElementById('gearBurst');
const gearHint   = document.getElementById('gearHint');
const gearSteps  = document.querySelectorAll('.gear-step');

function applyGear(index) {
  const data = gearData[index];

  // Burst flash
  gearBurst.classList.remove('boom');
  void gearBurst.offsetWidth; // reflow
  gearBurst.classList.add('boom');

  // Fade out image
  gearImg.classList.add('switching');

  setTimeout(() => {
    gearImg.src = data.src;
    gearImg.alt = data.alt;
    gearImg.classList.remove('switching');
  }, 300);

  // Update badges
  gearBadge1.textContent = data.badge1;
  gearBadge2.textContent = data.badge2;

  // Update frame aura
  gearFrame.setAttribute('data-gear', data.gear);

  // Update progress dots
  gearSteps.forEach((step, i) => {
    step.classList.remove('active', 'done');
    if (i < index)  step.classList.add('done');
    if (i === index) step.classList.add('active');
  });

  // Update hint
  if (!gearHintHidden) gearHint.textContent = `👆 ${data.hint}`;

  // Gear 5 special: hide hint after a bit
  if (data.gear === 5) {
    setTimeout(() => {
      gearHint.classList.add('hide');
      gearHintHidden = true;
    }, 2000);
  }
}

// Initial setup
if (gearFrame) {
  gearFrame.setAttribute('data-gear', 2);
  applyGear(0);

  // Hide hint after 3 clicks
  let tapCount = 0;
  gearFrame.addEventListener('click', () => {
    tapCount++;
    if (tapCount >= 2) {
      gearHint.classList.add('hide');
      gearHintHidden = true;
    }
    currentGear = (currentGear + 1) % gearData.length;
    applyGear(currentGear);
  });

  // Also allow clicking progress dots directly
  gearSteps.forEach((step, i) => {
    step.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGear = i;
      applyGear(currentGear);
    });
  });
}

// ===================== THEME SWITCHER =====================
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themePanel     = document.getElementById('themePanel');
const themeBtns      = document.querySelectorAll('.theme-btn');

// Color palettes for particles per theme
const themeParticleColors = {
  onepiece:  [(0.45, [255,120,0]), (0.75, [255,215,0]), (1, [26,100,180])],
  jjk:       [(0.45, [168,85,247]), (0.75, [0,229,255]), (1, [255,0,122])],
  deathnote: [(0.55, [200,0,0]),   (0.8,  [180,0,0]),   (1, [120,0,0])]
};

function getParticleColorForTheme(theme, opacity) {
  const r = Math.random();
  if (theme === 'jjk') {
    if (r < 0.45) return `rgba(168,85,247,${opacity})`;
    if (r < 0.75) return `rgba(0,229,255,${opacity * 0.8})`;
    return `rgba(255,0,122,${opacity})`;
  }
  if (theme === 'deathnote') {
    if (r < 0.55) return `rgba(200,0,0,${opacity})`;
    if (r < 0.80) return `rgba(255,80,80,${opacity * 0.8})`;
    return `rgba(80,0,0,${opacity})`;
  }
  // onepiece (default)
  if (r < 0.45) return `rgba(255,120,0,${opacity})`;
  if (r < 0.75) return `rgba(255,215,0,${opacity * 0.7})`;
  return `rgba(26,100,180,${opacity})`;
}

function refreshParticleColors(theme) {
  particles.forEach(p => {
    p.color = getParticleColorForTheme(theme, p.opacity);
  });
}

function setTheme(theme) {
  // Apply theme to body
  document.body.setAttribute('data-theme', theme);

  // Update active button
  themeBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
  });

  // Refresh particle colors
  refreshParticleColors(theme);

  // Save preference
  localStorage.setItem('portfolioTheme', theme);

  // Close panel
  themePanel.classList.remove('open');
  themeToggleBtn.classList.remove('open');
}

// Toggle panel open/close
themeToggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  themePanel.classList.toggle('open');
  themeToggleBtn.classList.toggle('open');
});

// Handle theme button clicks
themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setTheme(btn.getAttribute('data-theme'));
  });
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.theme-switcher')) {
    themePanel.classList.remove('open');
    themeToggleBtn.classList.remove('open');
  }
});

// Restore saved theme on load
const savedTheme = localStorage.getItem('portfolioTheme');
if (savedTheme) setTheme(savedTheme);

// ===================== CERTIFICATE LIGHTBOX =====================
const certModal    = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalErr = document.getElementById('certModalErr');

function openCertModal(el) {
  const src = el.getAttribute('data-cert') || el.closest('[data-cert]')?.getAttribute('data-cert');
  if (!src) return;

  // Reset state
  certModalImg.classList.remove('hidden');
  certModalErr.classList.remove('show');
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Try loading certificate image
  certModalImg.onload = () => {
    certModalImg.classList.remove('hidden');
    certModalErr.classList.remove('show');
  };
  certModalImg.onerror = () => {
    // Image not found — show instructions
    certModalImg.classList.add('hidden');
    certModalErr.classList.add('show');

    // Customize message with the expected filename
    const fname = src.split('/').pop();
    certModalErr.innerHTML = `
      📁 <strong>Image not found</strong><br><br>
      To show this certificate, save your image as:<br>
      <code>${fname}</code><br><br>
      inside the <code>certs/</code> folder in your <code>MY WEBSITE</code> folder,<br>
      then refresh the page.
    `;
  };
  certModalImg.src = src;
}

function closeCertModal(e) {
  // Close only if clicking backdrop or close button (not the image itself)
  if (e && e.target === certModalImg) return;
  certModal.classList.remove('open');
  document.body.style.overflow = '';
  certModalImg.src = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCertModal();
});


