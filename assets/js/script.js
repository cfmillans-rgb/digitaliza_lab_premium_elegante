const NAVBAR = document.querySelector('.navbar');
const CURRENT_YEAR = document.getElementById('currentYear');
const COUNTERS = document.querySelectorAll('.counter');
const FORM = document.getElementById('whatsappForm');
const FEEDBACK = document.getElementById('formFeedback');
const REVEAL_ITEMS = document.querySelectorAll('.reveal-up');
const WHATSAPP_LINKS = document.querySelectorAll('.js-wa-link');

// Ajusta este número por el WhatsApp real del negocio.
const DIGITALIZA_WHATSAPP = '56900000000';
const DEFAULT_WHATSAPP_MESSAGE = 'Hola Digitaliza Lab, quiero cotizar mi landing.';

document.body.classList.add('js-ready');

const buildWhatsAppUrl = (message = DEFAULT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${DIGITALIZA_WHATSAPP}?text=${encodeURIComponent(message)}`;

if (NAVBAR) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 16) {
      NAVBAR.classList.add('scrolled');
    } else {
      NAVBAR.classList.remove('scrolled');
    }
  });
}

if (CURRENT_YEAR) {
  CURRENT_YEAR.textContent = new Date().getFullYear();
}

WHATSAPP_LINKS.forEach((link) => {
  const message = link.dataset.message || DEFAULT_WHATSAPP_MESSAGE;
  link.setAttribute('href', buildWhatsAppUrl(message));
});

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.target || 0);
    const duration = 1200;
    const startTime = performance.now();

    const animateCounter = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      counter.textContent = Math.floor(progress * target);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      } else {
        counter.textContent = target;
      }
    };

    requestAnimationFrame(animateCounter);
    observer.unobserve(counter);
  });
}, { threshold: 0.5 });

COUNTERS.forEach((counter) => counterObserver.observe(counter));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14 });

REVEAL_ITEMS.forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${Math.min(index * 50, 250)}ms`);
  revealObserver.observe(item);
});

const markInvalid = (field, invalid) => {
  field.classList.toggle('is-invalid', invalid);
};

const cleanValue = (value) => value.trim();

if (FORM) {
  const fields = Array.from(FORM.querySelectorAll('.form-control'));

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (cleanValue(field.value) !== '') {
        markInvalid(field, false);
        if (FEEDBACK) FEEDBACK.textContent = '';
      }
    });
  });

  FORM.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombreCliente');
    const telefono = document.getElementById('telefonoCliente');
    const rubro = document.getElementById('rubroCliente');
    const mensaje = document.getElementById('mensajeCliente');

    const requiredFields = [nombre, telefono, rubro, mensaje];
    let hasErrors = false;

    requiredFields.forEach((field) => {
      const invalid = cleanValue(field.value) === '';
      markInvalid(field, invalid);
      if (invalid) hasErrors = true;
    });

    if (hasErrors) {
      if (FEEDBACK) {
        FEEDBACK.textContent = 'Completa todos los campos para abrir tu cotización por WhatsApp.';
      }
      return;
    }

    if (FEEDBACK) FEEDBACK.textContent = '';

    const texto = `Hola Digitaliza Lab 👋
Mi nombre es ${cleanValue(nombre.value)}.
Mi WhatsApp es ${cleanValue(telefono.value)}.
Mi negocio es de ${cleanValue(rubro.value)}.
Quiero cotizar una landing porque: ${cleanValue(mensaje.value)}`;

    window.open(buildWhatsAppUrl(texto), '_blank', 'noopener');

    if (FEEDBACK) {
      FEEDBACK.textContent = 'Abrimos tu WhatsApp con el mensaje listo. Si no lo ves, revisa si tu navegador bloqueó la ventana.';
    }

    FORM.reset();
    
  });
}
