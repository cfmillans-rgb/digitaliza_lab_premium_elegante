// TEMPORAL: herramientas para revisar los diseños de muestra desde GitHub Actions.
// Se borra (junto con el flujo .github/workflows/capturas-demos.yml) antes de unir la rama a main.
//
//   node demos.cjs revisar  <demos.json> <carpeta>   recorre cada demo completa y reporta lo roto
//   node demos.cjs fotos    <fotos.json> <carpeta>   descarga fotos candidatas y arma hojas de contacto
//   node demos.cjs capturas <demos.json> <carpeta>   captura la portada de cada demo (799x506, .webp)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');

const [modo, entrada, salida] = process.argv.slice(2);
if (!modo || !entrada || !salida) {
  console.error('Uso: node demos.cjs <revisar|fotos|capturas> <entrada.json> <carpeta>');
  process.exit(1);
}
fs.mkdirSync(salida, { recursive: true });
const leer = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const guardar = (nombre, datos) => fs.writeFileSync(path.join(salida, nombre), JSON.stringify(datos, null, 2) + '\n');
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const TELEFONO = /\+?56[\s.-]?[29][\s.-]?\d{4}[\s.-]?\d{4}/g;

// Registra si la página intenta leer la ubicación.
const SCRIPT_GEO = () => {
  window.__geo = 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition = () => { window.__geo++; };
    navigator.geolocation.watchPosition = () => { window.__geo++; return 0; };
  }
};

async function revisar(demos) {
  const browser = await chromium.launch();
  const reporte = [];
  for (const d of demos) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 810 }, locale: 'es-CL' });
    await context.addInitScript(SCRIPT_GEO);
    const page = await context.newPage();
    const fallas = new Set();
    const consola = [];
    page.on('requestfailed', (r) => fallas.add(`falló: ${r.url()}`));
    page.on('response', (r) => { if (r.status() >= 400) fallas.add(`${r.status()}: ${r.url()}`); });
    page.on('console', (m) => { if (m.type() === 'error') consola.push(m.text().slice(0, 300)); });
    page.on('pageerror', (e) => consola.push('pageerror: ' + String(e.message || e).slice(0, 300)));
    page.on('dialog', (dlg) => dlg.dismiss().catch(() => {}));
    let status = null;
    try {
      const resp = await page.goto(d.url, { waitUntil: 'networkidle', timeout: 90000 });
      status = resp ? resp.status() : null;
    } catch (e) { consola.push('goto: ' + e.message); }
    // Recorre la página completa para que carguen las imágenes diferidas.
    await page.evaluate(async () => {
      const paso = 500;
      for (let y = 0; y < document.documentElement.scrollHeight; y += paso) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
    }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await esperar(2500);
    // Si existe el botón que antes pedía la ubicación (Grúas Titán), se prueba.
    const boton = await page.$('#btnWhatsapp');
    if (boton) { await boton.click({ force: true }).catch(() => {}); await esperar(800); }
    const info = await page.evaluate((reTel) => {
      const re = new RegExp(reTel, 'g');
      const texto = document.body ? document.body.innerText : '';
      const enlaces = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
      return {
        titulo: document.title,
        robots: (document.querySelector('meta[name="robots"]') || {}).content || null,
        aviso: (document.querySelector('[data-dl-muestra]') || {}).innerText || null,
        telefonosEnTexto: texto.match(re) || [],
        telefonosEnEnlaces: enlaces.filter((h) => /^(tel:|https?:\/\/(wa\.me|api\.whatsapp\.com))/i.test(h) && /\d{8,}/.test(h.replace(/[\s.()-]/g, ''))),
        correos: [...new Set((texto.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) || []).concat(enlaces.filter((h) => h.startsWith('mailto:'))))],
        imagenesRotas: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
        imagenesSinCargar: [...document.images].filter((i) => !i.complete).map((i) => i.currentSrc || i.src),
        geo: window.__geo,
        alto: document.documentElement.scrollHeight,
      };
    }, TELEFONO.source).catch((e) => ({ error: e.message }));
    reporte.push({ clave: d.clave, url: d.url, status, ...info, fallas: [...fallas], consola: consola.slice(0, 15) });
    console.log('revisada', d.clave, status);
    await context.close();
  }
  await browser.close();
  guardar('reporte.json', reporte);
}

async function capturas(demos) {
  const CSS = '[data-dl-muestra]{display:none!important}[data-aos]{opacity:1!important;transform:none!important}';
  const browser = await chromium.launch();
  const reporte = [];
  for (const d of demos) {
    // Con "movimiento reducido" las animaciones de entrada quedan en su estado final.
    const context = await browser.newContext({ viewport: { width: 1280, height: 810 }, deviceScaleFactor: 1, locale: 'es-CL', reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('dialog', (dlg) => dlg.dismiss().catch(() => {}));
    let status = null;
    try {
      const resp = await page.goto(d.url, { waitUntil: 'networkidle', timeout: 90000 });
      status = resp ? resp.status() : null;
    } catch (e) { console.log('goto', d.clave, e.message); }
    await page.addStyleTag({ content: CSS }).catch(() => {});
    await esperar(6000);
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
    await esperar(500);
    const png = await page.screenshot({ type: 'png' });
    const out = path.join(salida, d.imagen);
    await sharp(png).resize(799, 506, { fit: 'cover', position: 'top' }).webp({ quality: 82 }).toFile(out);
    reporte.push({ clave: d.clave, status, bytes: fs.statSync(out).size });
    console.log('capturada', d.clave, status);
    await context.close();
  }
  await browser.close();
  guardar('capturas.json', reporte);
}

// Página completa (para revisar fotos y recortes): .webp de 640 px de ancho.
async function completas(lista) {
  const browser = await chromium.launch();
  for (const d of lista) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 810 }, locale: 'es-CL', reducedMotion: 'reduce' });
    const page = await context.newPage();
    try { await page.goto(d.url, { waitUntil: 'networkidle', timeout: 90000 }); } catch (e) { console.log('goto', d.clave, e.message); }
    await page.addStyleTag({ content: '[data-dl-muestra]{display:none!important}[data-aos]{opacity:1!important;transform:none!important}' }).catch(() => {});
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 250)); }
      window.scrollTo(0, 0);
    }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await esperar(2000);
    const png = await page.screenshot({ type: 'png', fullPage: true });
    await sharp(png, { limitInputPixels: false }).resize({ width: 640 }).webp({ quality: 70 }).toFile(path.join(salida, `completa-${d.clave}.webp`));
    console.log('completa', d.clave);
    await context.close();
  }
  await browser.close();
}

// fotos.json: { "grupo": [ { "id": "photo-…", "nota": "…" }, … ], … }
async function fotos(grupos) {
  const ANCHO = 320, ALTO = 213, BARRA = 26, COLS = 5;
  const resultado = {};
  for (const [grupo, lista] of Object.entries(grupos)) {
    const piezas = [];
    resultado[grupo] = [];
    for (let i = 0; i < lista.length; i++) {
      const c = lista[i];
      const etiqueta = `${grupo.slice(0, 1).toUpperCase()}${String(i + 1).padStart(2, '0')}`;
      const url = `https://images.unsplash.com/${c.id}?w=640&q=60&auto=format&fit=crop`;
      let img, estado = null, dims = null;
      try {
        const r = await fetch(url);
        estado = r.status;
        if (r.ok) {
          const buf = Buffer.from(await r.arrayBuffer());
          const meta = await sharp(buf).metadata();
          dims = `${meta.width}x${meta.height}`;
          img = await sharp(buf).resize(ANCHO, ALTO, { fit: 'cover' }).png().toBuffer();
        }
      } catch (e) { estado = 'error: ' + e.message; }
      if (!img) img = await sharp({ create: { width: ANCHO, height: ALTO, channels: 3, background: '#b91c1c' } }).png().toBuffer();
      const texto = `${etiqueta}  ${estado}  ${(c.nota || '').slice(0, 28)}`.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      const barra = Buffer.from(`<svg width="${ANCHO}" height="${BARRA}"><rect width="100%" height="100%" fill="#111"/><text x="6" y="18" font-family="DejaVu Sans, sans-serif" font-size="15" fill="#fde047">${texto}</text></svg>`);
      piezas.push({ img, barra });
      resultado[grupo].push({ etiqueta, id: c.id, nota: c.nota || '', estado, dims });
    }
    for (let h = 0; h * 20 < piezas.length; h++) {
      const parte = piezas.slice(h * 20, h * 20 + 20);
      const filas = Math.ceil(parte.length / COLS);
      const comp = [];
      parte.forEach((p, k) => {
        const x = (k % COLS) * (ANCHO + 6), y = Math.floor(k / COLS) * (ALTO + BARRA + 6);
        comp.push({ input: p.barra, left: x, top: y }, { input: p.img, left: x, top: y + BARRA });
      });
      await sharp({ create: { width: COLS * (ANCHO + 6), height: filas * (ALTO + BARRA + 6), channels: 3, background: '#ffffff' } })
        .composite(comp).png().toFile(path.join(salida, `hoja-${grupo}-${h + 1}.png`));
    }
  }
  guardar('fotos.json', resultado);
}

(async () => {
  const datos = leer(entrada);
  if (modo === 'revisar') await revisar(datos);
  else if (modo === 'capturas') await capturas(datos);
  else if (modo === 'fotos') await fotos(datos);
  else if (modo === 'completas') await completas(datos);
  else throw new Error('Modo desconocido: ' + modo);
})().catch((e) => { console.error(e); process.exit(1); });
