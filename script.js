/* =========================================================
   Portfolio interactions: typing role, nav, scroll reveal
   ========================================================= */

// ---------- footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- typing effect on the hero role ----------
(function typeRoles() {
  const target = document.getElementById('typed');
  if (!target) return;

  const roles = [
    'Java Developer',
    'Spring Boot Developer',
    'REST API Engineer',
    'React.js Front End Developer'
  ];

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { target.textContent = roles[0]; return; }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = roles[roleIndex];
    target.textContent = word.slice(0, charIndex);

    if (!deleting && charIndex < word.length) {
      charIndex++;
      setTimeout(tick, 70);
    } else if (!deleting) {
      deleting = true;
      setTimeout(tick, 1600);
    } else if (charIndex > 0) {
      charIndex--;
      setTimeout(tick, 35);
    } else {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(tick, 260);
    }
  }

  tick();
})();

// ---------- mobile menu ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.querySelector('i').className = open ? 'bx bx-x' : 'bx bx-menu';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.querySelector('i').className = 'bx bx-menu';
  });
});

// ---------- back to top ----------
// The anchor alone does nothing once the URL hash is already #home, which
// happens as soon as the visitor has used the Home link, so scroll by hand.
const toTop = document.querySelector('.to-top');

if (toTop) {
  toTop.addEventListener('click', event => {
    event.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
}

// ---------- scroll reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
  revealObserver.observe(el);
});

// ---------- active nav link while scrolling ----------
const sections = [...document.querySelectorAll('section[id]')];
const navAnchors = [...navLinks.querySelectorAll('a')];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));

// ---------- spotlight cards ----------
// A light follows the pointer across each glass card and a glowing line
// runs around its edge. Works with a mouse and with touch.
(function spotlightCards() {
  const cards = [...document.querySelectorAll('.glass:not(.nav):not(.foot-inner)')];
  if (!cards.length) return;

  cards.forEach(card => {
    card.classList.add('spot');
    const ring = document.createElement('i');
    ring.className = 'ring';
    ring.setAttribute('aria-hidden', 'true');
    card.prepend(ring);
  });

  let frame = null;
  let pending = null;

  function paint() {
    frame = null;
    if (!pending) return;
    const { card, x, y } = pending;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    pending = null;
  }

  function track(event) {
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    pending = {
      card,
      x: Math.round(event.clientX - box.left),
      y: Math.round(event.clientY - box.top)
    };
    if (frame === null) frame = requestAnimationFrame(paint);
  }

  cards.forEach(card => {
    let fadeOut = null;

    const light = event => {
      clearTimeout(fadeOut);
      card.classList.add('lit');
      track(event);
    };

    const dim = () => {
      card.classList.remove('lit');
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    };

    card.addEventListener('pointerenter', light);
    card.addEventListener('pointermove', light);
    card.addEventListener('pointerleave', dim);

    // on a phone the light lingers for a moment after the finger lifts
    card.addEventListener('pointerup', pointerEvent => {
      if (pointerEvent.pointerType === 'mouse') return;
      clearTimeout(fadeOut);
      fadeOut = setTimeout(dim, 900);
    });
    card.addEventListener('pointercancel', dim);
  });
})();
