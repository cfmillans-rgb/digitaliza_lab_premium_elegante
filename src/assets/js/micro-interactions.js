document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------------
     1. Scroll Reveal (Intersection Observer)
  ------------------------------------------------------------- */
  const revealElements = document.querySelectorAll("[data-reveal]");
  
  if (!prefersReducedMotion && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: "0px 0px -10% 0px", // Trigger slightly before it comes fully into view
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // If reduced motion is preferred, reveal everything immediately
    revealElements.forEach(el => el.classList.add("is-revealed"));
  }

  /* -------------------------------------------------------------
     2. Mouse Tracking Spotlight
  ------------------------------------------------------------- */
  const spotlightCards = document.querySelectorAll(".spotlight-card");
  
  if (!prefersReducedMotion && spotlightCards.length > 0) {
    spotlightCards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }

  /* -------------------------------------------------------------
     3. Light Parallax
  ------------------------------------------------------------- */
  const parallaxLayers = document.querySelectorAll(".parallax-layer");
  
  if (!prefersReducedMotion && parallaxLayers.length > 0) {
    let ticking = false;
    
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute("data-speed") || 0.2;
            const yPos = -(scrollY * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
          });
          
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
});
