const WHATSAPP_NUMBER = '56982867164';

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function setupWhatsAppLinks() {
  document.querySelectorAll('.js-wa-link').forEach((link) => {
    const message = link.dataset.message || 'Hola Digitaliza Lab, quiero cotizar una landing para mi negocio.';
    link.href = buildWhatsAppUrl(message);
  });
}

function setupNavbar() {
  const navbar = document.getElementById('navbarPrincipal');
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal-up');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -12px 0px' });

  items.forEach((item) => observer.observe(item));
}

function setupForm() {
  const form = document.getElementById('whatsappForm');
  const feedback = document.getElementById('formFeedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombreCliente').value.trim();
    const telefono = document.getElementById('telefonoCliente').value.trim();
    const rubro = document.getElementById('rubroCliente').value.trim();
    const mensaje = document.getElementById('mensajeCliente').value.trim();

    if (!nombre || !telefono || !rubro || !mensaje) {
      feedback.textContent = 'Completa todos los campos para abrir el mensaje en WhatsApp.';
      return;
    }

    const text = [
      'Hola Digitaliza Lab, quiero cotizar una landing para mi negocio.',
      '',
      `Nombre: ${nombre}`,
      `WhatsApp: ${telefono}`,
      `Rubro: ${rubro}`,
      `Objetivo: ${mensaje}`,
    ].join('\n');

    feedback.textContent = 'Abriendo WhatsApp...';
    window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
    form.reset();
  });
}

function setCurrentYear() {
  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  setupWhatsAppLinks();
  setupNavbar();
  setupReveal();
  setupForm();
  setCurrentYear();
});
