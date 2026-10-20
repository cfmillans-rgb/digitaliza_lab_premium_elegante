/* ============================================================
   Digitaliza Lab — Consentimiento de cookies (Ley N° 21.719)

   Tres categorías, igual que la Política de Privacidad (punto 7):
   - Necesarias: siempre activas (solo guardan esta decisión).
   - Analítica: Google Analytics 4. Solo se carga si se autoriza.
   - Publicidad: Pixel de Meta. Solo se carga si se autoriza.

   Hasta que la persona decide, NINGÚN script de Google o Meta se
   descarga ni se ejecuta. La decisión se guarda en localStorage y
   se puede cambiar desde el enlace "Configurar cookies" del footer
   (cualquier elemento con el atributo data-cookie-settings).
   ============================================================ */
(function () {
  'use strict';

  var GA_ID = 'G-76SK4B9GS2';
  var PIXEL_ID = '1057340010310894';
  var STORAGE_KEY = 'dl_consent_v1';
  var root = document.documentElement;
  var privacyHref = (location.pathname.indexOf('/blog/') !== -1 ? '../' : '') + 'privacidad.html';

  /* ---------- Almacenamiento de la decisión ---------- */
  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var c = JSON.parse(raw);
      if (typeof c.analytics !== 'boolean' || typeof c.marketing !== 'boolean') return null;
      return c;
    } catch (e) { return null; }
  }
  function saveConsent(analytics, marketing) {
    var c = { analytics: !!analytics, marketing: !!marketing, ts: new Date().toISOString(), v: 1 };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch (e) { /* modo privado: vale para esta visita */ }
    return c;
  }

  /* ---------- Carga de herramientas (solo tras consentimiento) ---------- */
  var gaLoaded = false, pixelLoaded = false;

  function loadAnalytics() {
    if (gaLoaded) return; gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function loadPixel() {
    if (pixelLoaded) return; pixelLoaded = true;
    /* Snippet oficial de Meta, sin <noscript> (ese dispararía sin consentimiento) */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function apply(c) {
    if (c.analytics) loadAnalytics();
    if (c.marketing) loadPixel();
  }

  /* Al retirar un permiso ya dado: borrar sus cookies y recargar para descargar los scripts */
  function clearCookies(prefixes) {
    var host = location.hostname;
    var domains = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
    document.cookie.split(';').forEach(function (part) {
      var name = part.split('=')[0].trim();
      if (!prefixes.some(function (p) { return name.indexOf(p) === 0; })) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function decide(analytics, marketing) {
    var prev = readConsent();
    var c = saveConsent(analytics, marketing);
    hideBanner();
    var revokedGA = prev && prev.analytics && !c.analytics;
    var revokedPixel = prev && prev.marketing && !c.marketing;
    if (revokedGA) clearCookies(['_ga']);
    if (revokedPixel) clearCookies(['_fbp', '_fbc']);
    if ((revokedGA && gaLoaded) || (revokedPixel && pixelLoaded)) { location.reload(); return; }
    apply(c);
  }

  /* ---------- Interfaz ---------- */
  var CSS = '' +
    '#dl-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:10000;max-width:560px;margin:0 auto;' +
    'background:rgba(10,10,10,.97);border:1px solid rgba(255,138,66,.25);border-radius:20px;color:#e5e7eb;' +
    'font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;font-size:14px;line-height:1.55;' +
    'box-shadow:0 30px 60px -20px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04) inset;padding:20px 22px;' +
    '-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)}' +
    '#dl-consent[hidden]{display:none}' +
    '#dl-consent h2{margin:0 0 6px;font-size:16px;font-weight:600;color:#fff;letter-spacing:-.01em}' +
    '#dl-consent p{margin:0;color:#b6bcc6}' +
    '#dl-consent a{color:#ff8a42;text-decoration:underline;text-underline-offset:2px}' +
    '#dl-consent .dlc-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}' +
    '#dl-consent button{font:inherit;font-weight:600;font-size:14px;cursor:pointer;border-radius:999px;padding:10px 18px;' +
    'border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.04);color:#fff;transition:background .2s,border-color .2s}' +
    '#dl-consent button:hover{border-color:rgba(255,138,66,.6);background:rgba(255,138,66,.1)}' +
    '#dl-consent button.dlc-primary{background:#ff8a42;border-color:#ff8a42;color:#0a0a0a}' +
    '#dl-consent button.dlc-primary:hover{background:#ff9a5c}' +
    '#dl-consent button.dlc-link{background:none;border-color:transparent;color:#b6bcc6;text-decoration:underline;padding:10px 6px}' +
    '#dl-consent button:focus-visible,#dl-consent input:focus-visible{outline:2px solid #ff8a42;outline-offset:3px}' +
    '#dl-consent .dlc-prefs{margin-top:14px;border-top:1px solid rgba(255,255,255,.08);padding-top:6px}' +
    '#dl-consent .dlc-row{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06)}' +
    '#dl-consent .dlc-row:last-child{border-bottom:0}' +
    '#dl-consent .dlc-row input{margin-top:3px;width:18px;height:18px;accent-color:#ff8a42;flex-shrink:0}' +
    '#dl-consent .dlc-row strong{color:#fff;font-weight:600;display:block}' +
    '#dl-consent .dlc-row span{color:#9ca3af;font-size:13px}' +
    '@media (max-width:480px){#dl-consent{left:10px;right:10px;bottom:10px;padding:18px}#dl-consent .dlc-actions button{flex:1 1 auto}}';

  var banner, prefsPanel, chkA, chkM;

  function build() {
    if (banner) return;
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    banner = document.createElement('div');
    banner.id = 'dl-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'dlc-title');
    banner.setAttribute('aria-describedby', 'dlc-desc');
    banner.hidden = true;
    banner.innerHTML =
      '<h2 id="dlc-title">Tu privacidad, tu decisión</h2>' +
      '<p id="dlc-desc">Usamos Google Analytics para entender cómo se usa el sitio y el Pixel de Meta para medir nuestros anuncios. ' +
      'Solo se activan si nos autorizas. Más detalles en la <a href="' + privacyHref + '">Política de privacidad</a>.</p>' +
      '<div class="dlc-prefs" hidden>' +
        '<div class="dlc-row"><input type="checkbox" checked disabled id="dlc-n"><label for="dlc-n"><strong>Necesarias</strong><span>Siempre activas. Solo recuerdan esta decisión.</span></label></div>' +
        '<div class="dlc-row"><input type="checkbox" id="dlc-a"><label for="dlc-a"><strong>Analítica</strong><span>Google Analytics 4: visitas y secciones leídas.</span></label></div>' +
        '<div class="dlc-row"><input type="checkbox" id="dlc-m"><label for="dlc-m"><strong>Publicidad</strong><span>Pixel de Meta: medición de anuncios en Facebook e Instagram.</span></label></div>' +
      '</div>' +
      '<div class="dlc-actions">' +
        '<button type="button" data-dlc="reject">Rechazar</button>' +
        '<button type="button" class="dlc-primary" data-dlc="accept">Aceptar</button>' +
        '<button type="button" class="dlc-link" data-dlc="config" aria-expanded="false">Configurar</button>' +
        '<button type="button" class="dlc-primary" data-dlc="save" hidden>Guardar preferencias</button>' +
      '</div>';
    document.body.appendChild(banner);

    prefsPanel = banner.querySelector('.dlc-prefs');
    chkA = banner.querySelector('#dlc-a');
    chkM = banner.querySelector('#dlc-m');

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-dlc]');
      if (!btn) return;
      var action = btn.getAttribute('data-dlc');
      if (action === 'accept') decide(true, true);
      else if (action === 'reject') decide(false, false);
      else if (action === 'save') decide(chkA.checked, chkM.checked);
      else if (action === 'config') showPrefs(true);
    });
  }

  function showPrefs(open) {
    prefsPanel.hidden = !open;
    banner.querySelector('[data-dlc="save"]').hidden = !open;
    banner.querySelector('[data-dlc="accept"]').hidden = open;
    var cfg = banner.querySelector('[data-dlc="config"]');
    cfg.hidden = open;
    cfg.setAttribute('aria-expanded', String(open));
    if (open) chkA.focus();
  }

  function showBanner(withPrefs) {
    build();
    var c = readConsent();
    chkA.checked = !!(c && c.analytics);
    chkM.checked = !!(c && c.marketing);
    showPrefs(!!withPrefs);
    banner.hidden = false;
    root.classList.add('dl-consent-open');
  }
  function hideBanner() {
    if (banner) banner.hidden = true;
    root.classList.remove('dl-consent-open');
  }

  /* API pública mínima */
  window.dlConsent = {
    open: function () { showBanner(true); },
    get: readConsent
  };

  /* Enlaces "Configurar cookies" */
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (!el) return;
    e.preventDefault();
    showBanner(true);
  });

  /* ---------- Inicio ---------- */
  function init() {
    var c = readConsent();
    if (c) apply(c);
    else showBanner(false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
