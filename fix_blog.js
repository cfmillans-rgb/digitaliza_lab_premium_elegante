const fs = require('fs');

let content = fs.readFileSync('blog.html', 'utf8');

// 1. Convert WhatsApp links
content = content.replace('href="#" data-source="footer_social" class="js-wa-link', 'href="https://wa.me/56982867164" data-source="footer_social" class="js-wa-link');
content = content.replace('href="#" data-source="footer_link" class="js-wa-link', 'href="https://wa.me/56982867164" data-source="footer_link" class="js-wa-link');

// 2. Add aos.js
content = content.replace('<script defer>', '<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>\\n  <script defer>');

// 3. Fix main to section and remove orphan main close
content = content.replace('<main class="py-20 sm:py-28">', '<section class="py-20 sm:py-28">');
content = content.replace('</section>\\n  </main>', '</section>');
// Sometimes there might be carriage returns
content = content.replace('</section>\\r\\n  </main>', '</section>');

// 4. Fix footer comment
content = content.replace('         FOOTER\\n  ============================================ -->', '<!-- ============================================\\n       FOOTER\\n  ============================================ -->');
content = content.replace('         FOOTER\\r\\n  ============================================ -->', '<!-- ============================================\\n       FOOTER\\n  ============================================ -->');

// 5. Fix script (Navbar, Mobile Menu, Current Year)
const scriptFix = `
      // Nav scroll
      const nav = document.getElementById('mainNav');
      if (nav) window.addEventListener('scroll', () => nav.classList.toggle('nav-scrolled', window.scrollY > 40), {passive:true});

      // Mobile Menu
      const menuToggle = document.getElementById('menuToggle');
      const mobileMenu = document.getElementById('mobileMenu');
      if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
          const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
          menuToggle.setAttribute('aria-expanded', !isExpanded);
          mobileMenu.classList.toggle('hidden');
        });
      }

      // Current Year
      const currentYear = document.getElementById('currentYear');
      if (currentYear) currentYear.textContent = new Date().getFullYear();
`;

// Just find the block and replace
let startIdx = content.indexOf('// Nav scroll');
let endIdx = content.indexOf('// Cursor');
if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + scriptFix + '      ' + content.substring(endIdx);
}

// 6. Add IDs to articles
let articles = [
    { target: '<h2 class="font-display text-2xl sm:text-3xl font-light text-white mb-3">Lo que realmente importa en un sitio web en Chile en 2025</h2>', id: 'diseno-web-chile' },
    { target: '<h2 class="font-display text-2xl sm:text-3xl font-light text-white mb-3">Anatomía de una landing page que convierte en el mercado chileno</h2>', id: 'landing-page-chile' },
    { target: '<h2 class="font-display text-2xl sm:text-3xl font-light text-white mb-3">Webs para sectores que exigen autoridad desde el primer clic</h2>', id: 'sectores' },
    { target: '<h2 class="font-display text-2xl sm:text-3xl font-light text-white mb-3">Ciberseguridad para PyMEs: Protege los datos de tus clientes</h2>', id: 'ciberseguridad' },
    { target: '<h2 class="font-display text-2xl sm:text-3xl font-light text-white mb-3">Certificados SSL: Por qué son obligatorios en 2025</h2>', id: 'ssl' },
    { target: '<h2 class="font-display text-2xl sm:text-3xl font-light text-white mb-3">Cómo mitigamos ataques DDoS y bots maliciosos</h2>', id: 'ddos' },
    { target: '<h2 class="font-display text-2xl sm:text-3xl font-light text-white mb-3">La importancia del Uptime: Por qué tu web no puede caerse</h2>', id: 'uptime' },
    { target: '<h2 class="font-display text-2xl sm:text-3xl font-light text-white mb-3">Hosting Local vs Internacional: ¿Dónde alojar tu web?</h2>', id: 'hosting' }
];

articles.forEach(a => {
    const titleIndex = content.indexOf(a.target);
    if (titleIndex !== -1) {
        const lastArticlePos = content.lastIndexOf('<article', titleIndex);
        if (lastArticlePos !== -1) {
            content = content.substring(0, lastArticlePos) + '<article id="' + a.id + '"' + content.substring(lastArticlePos + 8);
        }
    }
});

fs.writeFileSync('blog.html', content);
console.log("blog.html fixed");
