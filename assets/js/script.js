document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "56982867164";

  const navbar = document.getElementById("navbarPrincipal");
  const topbar = document.querySelector(".topbar");
  const menuCollapse = document.getElementById("menuPrincipal");
  const whatsappForm = document.getElementById("whatsappForm");
  const formFeedback = document.getElementById("formFeedback");
  const currentYear = document.getElementById("currentYear");
  const revealItems = document.querySelectorAll(".reveal-up");
  const counters = document.querySelectorAll(".counter");
  const waLinks = document.querySelectorAll(".js-wa-link");

  function getHeaderOffset() {
    const topbarHeight = topbar ? topbar.offsetHeight : 0;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    return topbarHeight + navbarHeight + 18;
  }

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function setWhatsAppLinks() {
    waLinks.forEach((link) => {
      const message =
        link.dataset.message ||
        "Hola Digitaliza Lab, quiero hablar sobre mi proyecto web.";
      link.setAttribute("href", buildWhatsAppUrl(message));
    });
  }

function handleNavbarOnScroll() {
  if (!navbar) return;

  if (window.scrollY > 24) {
    navbar.style.background = "#0b1118";
    navbar.style.boxShadow = "none";
    navbar.style.backdropFilter = "none";
    navbar.style.webkitBackdropFilter = "none";
  } else {
    navbar.style.background = "#0b1118";
    navbar.style.boxShadow = "none";
    navbar.style.backdropFilter = "none";
    navbar.style.webkitBackdropFilter = "none";
  }
}

  function closeMobileMenu() {
    if (!menuCollapse || !window.bootstrap) return;
    const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  }

  function setupSmoothAnchors() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const targetId = anchor.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const offset = getHeaderOffset();
        const targetTop =
          target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });

        closeMobileMenu();
      });
    });
  }

  function setupRevealAnimation() {
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
      observer.observe(item);
    });
  }

  function animateCounter(counter) {
    const target = Number(counter.dataset.target || 0);
    const duration = 900;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      counter.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  function setupCounters() {
    if (!counters.length) return;

    if (!("IntersectionObserver" in window)) {
      counters.forEach((counter) => {
        counter.textContent = counter.dataset.target || "0";
      });
      return;
    }

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  function setupWhatsAppForm() {
    if (!whatsappForm) return;

    whatsappForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nombre = document.getElementById("nombreCliente")?.value.trim();
      const telefono = document.getElementById("telefonoCliente")?.value.trim();
      const rubro = document.getElementById("rubroCliente")?.value.trim();
      const mensaje = document.getElementById("mensajeCliente")?.value.trim();

      if (!nombre || !telefono || !rubro || !mensaje) {
        if (formFeedback) {
          formFeedback.textContent =
            "Por favor completa todos los campos antes de continuar.";
        }
        return;
      }

      const waMessage =
        `Hola Digitaliza Lab, quiero hablar sobre mi proyecto web.%0A%0A` +
        `Nombre: ${nombre}%0A` +
        `WhatsApp: ${telefono}%0A` +
        `Rubro: ${rubro}%0A` +
        `Proyecto: ${mensaje}`;

      if (formFeedback) {
        formFeedback.textContent =
          "Perfecto. Te estamos llevando a WhatsApp para continuar la conversación.";
      }

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`,
        "_blank",
        "noopener,noreferrer"
      );

      whatsappForm.reset();
    });
  }

  function setCurrentYear() {
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }
  }

  setCurrentYear();
  setWhatsAppLinks();
  setupSmoothAnchors();
  setupRevealAnimation();
  setupCounters();
  setupWhatsAppForm();
  handleNavbarOnScroll();

  window.addEventListener("scroll", handleNavbarOnScroll, { passive: true });
  window.addEventListener("resize", handleNavbarOnScroll);
});