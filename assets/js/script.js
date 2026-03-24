const WHATSAPP_NUMBER = '56982867164';

document.addEventListener('DOMContentLoaded', () => {
  setupRevealAnimations();
  setupCounters();
  setupWhatsAppLinks();
  setupWhatsAppForm();
  setCurrentYear();
});

function setupRevealAnimations() {
  const items = document.querySelectorAll('.reveal-up');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -24px 0px'
  });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 22}ms`;
    observer.observe(item);
  });
}

function setupCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length || !('IntersectionObserver' in window)) return;

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target || 0);
    const duration = 900;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = String(value);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = String(target);
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

function setupWhatsAppLinks() {
  const links = document.querySelectorAll('.js-wa-link');
  links.forEach((link) => {
    const message = link.dataset.message || 'Hola Digitaliza Lab, quiero cotizar mi landing.';
    link.href = buildWhatsAppUrl(message);
  });
}

function setupWhatsAppForm() {
  const form = document.getElementById('whatsappForm');
  const feedback = document.getElementById('formFeedback');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombreCliente')?.value.trim();
    const telefono = document.getElementById('telefonoCliente')?.value.trim();
    const rubro = document.getElementById('rubroCliente')?.value.trim();
    const mensaje = document.getElementById('mensajeCliente')?.value.trim();

    if (!nombre || !telefono || !rubro || !mensaje) {
      if (feedback) feedback.textContent = 'Completa todos los campos para abrir la cotización por WhatsApp.';
      return;
    }

    const fullMessage = `Hola Digitaliza Lab, quiero cotizar una landing.%0A%0A*Nombre:* ${encodeURIComponent(nombre)}%0A*WhatsApp:* ${encodeURIComponent(telefono)}%0A*Rubro:* ${encodeURIComponent(rubro)}%0A*Proyecto:* ${encodeURIComponent(mensaje)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${fullMessage}`, '_blank', 'noopener');
    if (feedback) feedback.textContent = 'Listo. Abrimos tu cotización en WhatsApp.';
    form.reset();
  });
}

function setCurrentYear() {
  const currentYear = document.getElementById('currentYear');
  if (currentYear) currentYear.textContent = new Date().getFullYear();
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
