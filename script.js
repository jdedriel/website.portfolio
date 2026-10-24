// Mobile menu

const btn = document.querySelector('.menu-btn');
const links = document.getElementById('links');

btn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});

links.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', false);
  }
});

// Footer year

document.getElementById('year').textContent =
  new Date().getFullYear();

// Cursor glow (mouse only, skipped for reduced motion)

const glow = document.querySelector('.cursor-glow');

const canHover =
  window.matchMedia('(hover:hover)').matches;

const reduce =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

if (glow && canHover && !reduce) {

  let tx = 0;
  let ty = 0;

  let x = 0;
  let y = 0;

  window.addEventListener('pointermove', e => {

    tx = e.clientX;
    ty = e.clientY;

    glow.classList.add('on');

    const card =
      e.target.closest &&
      e.target.closest('.glass');

    if (card) {

      const r = card.getBoundingClientRect();

      card.style.setProperty(
        '--mx',
        (e.clientX - r.left) + 'px'
      );

      card.style.setProperty(
        '--my',
        (e.clientY - r.top) + 'px'
      );

    }

  });

  document.addEventListener(
    'pointerleave',
    () => glow.classList.remove('on')
  );

  (function loop() {

    x += (tx - x) * 0.12;
    y += (ty - y) * 0.12;

    glow.style.transform =
      `translate(${x}px, ${y}px)`;

    requestAnimationFrame(loop);

  })();

}