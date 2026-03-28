/* ============================================================
   Digitaliza Lab — script.js
   Navbar scroll · Reveal on scroll · WhatsApp links · Footer year
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     CONFIGURACIÓN CENTRAL — edita solo aquí
  ---------------------------------------------------------- */
  const WA_NUMBER  = '56982867164';          // sin + ni espacios
  const WA_DEFAULT = 'Hola Digitaliza Lab, quisiera información sobre el servicio de landing page.';

  /* ----------------------------------------------------------
     1. NAVBAR — clase .scrolled al hacer scroll
  ---------------------------------------------------------- */
  const navbar = document.getElementById('navbarPrincipal');

  function toggleNavbar () {
    if (!navbar) return;
    const topbarH = document.querySelector('.topbar')?.offsetHeight ?? 0;
    if (window.scrollY > topbarH + 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', toggleNavbar, { passive: true });
  toggleNavbar(); // estado inicial

  /* ----------------------------------------------------------
     2. REVEAL-UP — IntersectionObserver
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    /* Fallback sin soporte */
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ----------------------------------------------------------
     3. WHATSAPP LINKS — genera href dinámicamente
  ---------------------------------------------------------- */
  document.querySelectorAll('.js-wa-link').forEach((el) => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const msg = encodeURIComponent(
        this.dataset.message || WA_DEFAULT
      );
      window.open(
        `https://wa.me/${WA_NUMBER}?text=${msg}`,
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  /* ----------------------------------------------------------
     4. FORMULARIO — compone mensaje y abre WhatsApp
  ---------------------------------------------------------- */
  const form = document.getElementById('whatsappForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombre   = (document.getElementById('nombreCliente')?.value   || '').trim();
      const rubro    = (document.getElementById('rubroCliente')?.value     || '').trim();
      const contacto = (document.getElementById('contactoCliente')?.value  || '').trim();

      if (!nombre || !contacto) {
        if (feedback) {
          feedback.textContent = 'Por favor completa al menos tu nombre y un medio de contacto.';
        }
        return;
      }

      const lines = [
        `Hola Digitaliza Lab, me pongo en contacto desde el sitio web.`,
        ``,
        `Nombre: ${nombre}`,
        rubro    ? `Profesión / Rubro: ${rubro}` : null,
        `Contacto: ${contacto}`,
        ``,
        `Quisiera más información sobre el servicio de landing page.`,
      ]
        .filter((l) => l !== null)
        .join('\n');

      const msg = encodeURIComponent(lines);
      window.open(
        `https://wa.me/${WA_NUMBER}?text=${msg}`,
        '_blank',
        'noopener,noreferrer'
      );

      if (feedback) {
        feedback.textContent = 'Abriendo WhatsApp… si no se abre, escríbenos directamente al +56 9 8286 7164.';
      }
    });
  }

  /* ----------------------------------------------------------
     5. AÑO ACTUAL en el footer
  ---------------------------------------------------------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
function setupNavbar() {
  const navbar = document.getElementById('navbarPrincipal');
  const topbar = document.querySelector('.topbar');
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
      if (topbar) topbar.classList.add('hide');
    } else {
      navbar.classList.remove('scrolled');
      if (topbar) topbar.classList.remove('hide');
    }
  };

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}