/* WhyArt – main.js: mobile nav, gallery lightbox, static mailto forms */
document.addEventListener('DOMContentLoaded', () => {
  /* --- Mobile nav toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '×' : '☰';
    });
  }

  /* --- Gallery lightbox --- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCap = document.getElementById('lb-cap');
  const galleryLinks = Array.from(document.querySelectorAll('[data-gallery]'));
  let current = -1;

  if (lb && galleryLinks.length) {
    const open = (i) => {
      current = i;
      const a = galleryLinks[i];
      lbImg.src = a.getAttribute('href');
      lbCap.textContent = a.getAttribute('data-cap') || '';
      lb.classList.add('open');
    };
    galleryLinks.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); open(i); }));
    lb.querySelector('.lb-close').addEventListener('click', () => lb.classList.remove('open'));
    lb.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); open((current - 1 + galleryLinks.length) % galleryLinks.length); });
    lb.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); open((current + 1) % galleryLinks.length); });
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') lb.classList.remove('open');
      if (e.key === 'ArrowRight') open((current + 1) % galleryLinks.length);
      if (e.key === 'ArrowLeft') open((current - 1 + galleryLinks.length) % galleryLinks.length);
    });
  }

  /* --- Static contact/anmeldung forms -> mailto (no backend) --- */
  const forms = document.querySelectorAll('form[data-mailto]');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const to = form.getAttribute('data-mailto');
      const subject = encodeURIComponent(form.getAttribute('data-subject') || 'Nachricht');
      const parts = [];
      form.querySelectorAll('input, textarea').forEach((f) => {
        if (f.value && f.getAttribute('name')) parts.push(f.getAttribute('name') + ': ' + f.value);
      });
      const body = encodeURIComponent(parts.join('\n\n'));
      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
    });
  });
});
