

// year
document.getElementById('year').textContent = new Date().getFullYear();

// mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  })
);

// scroll reveal
const toReveal = document.querySelectorAll('.hero-inner, .about-photo, .about-text, .business-text, .business-photo, .section-head, .carousel, .quotes blockquote, .contact-grid');
toReveal.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
toReveal.forEach(el => io.observe(el));

// carousel
(function () {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;
  const track = root.querySelector('[data-track]');
  const slides = Array.from(track.children);
  const dotsWrap = root.querySelector('[data-dots]');
  let index = 0, timer;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to book ' + (i + 1));
    b.addEventListener('click', () => { go(i); reset(); });
    dotsWrap.appendChild(b);
  });
  const dots = Array.from(dotsWrap.children);

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
  }
  function next() { go(index + 1); }
  function prev() { go(index - 1); }
  function reset() { clearInterval(timer); timer = setInterval(next, 5500); }

  root.querySelector('[data-next]').addEventListener('click', () => { next(); reset(); });
  root.querySelector('[data-prev]').addEventListener('click', () => { prev(); reset(); });

  // swipe
  let startX = null;
  root.querySelector('.car-viewport').addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
  root.querySelector('.car-viewport').addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) (dx < 0 ? next() : prev());
    startX = null; reset();
  });

  root.addEventListener('mouseenter', () => clearInterval(timer));
  root.addEventListener('mouseleave', reset);

  go(0); reset();
})();