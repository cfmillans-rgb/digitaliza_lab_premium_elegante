// TEMPORAL: captura la portada de cada diseño de muestra listado en src/_data/demos.json
// y la guarda como .webp de 799x506 (el tamaño de las tarjetas). Lo ejecuta
// .github/workflows/capturas-demos.yml; ambos archivos se borran antes de unir la rama a main.
// Uso: node capturas-demos.cjs <ruta a demos.json> <carpeta de salida>
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');

const [demosPath, outDir] = process.argv.slice(2);
if (!demosPath || !outDir) {
  console.error('Uso: node capturas-demos.cjs <demos.json> <carpeta de salida>');
  process.exit(1);
}
const demos = JSON.parse(fs.readFileSync(demosPath, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });

// Oculta el aviso "Diseño de muestra" (la tarjeta ya lo muestra) y deja visibles
// los elementos que aparecen con animación al hacer scroll.
const CSS = `
  [data-dl-muestra] { display: none !important; }
  [data-aos] { opacity: 1 !important; transform: none !important; }
  *, *::before, *::after { transition-duration: 0s !important; transition-delay: 0s !important; animation-duration: 0s !important; animation-delay: 0s !important; caret-color: transparent !important; }
`;

(async () => {
  const browser = await chromium.launch();
  const reporte = [];
  for (const d of demos) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 810 }, deviceScaleFactor: 1, locale: 'es-CL' });
    const page = await context.newPage();
    const errores = [];
    page.on('pageerror', (e) => errores.push('pageerror: ' + (e.message || e)));
    page.on('console', (m) => { if (m.type() === 'error') errores.push('console: ' + m.text()); });
    page.on('requestfailed', (r) => errores.push('requestfailed: ' + r.url()));
    page.on('dialog', (dlg) => dlg.dismiss().catch(() => {}));
    let status = null;
    try {
      const resp = await page.goto(d.url, { waitUntil: 'networkidle', timeout: 90000 });
      status = resp ? resp.status() : null;
    } catch (e) {
      errores.push('goto: ' + e.message);
    }
    await page.addStyleTag({ content: CSS }).catch((e) => errores.push('style: ' + e.message));
    // Un scroll corto y de vuelta arriba activa los efectos que esperan el scroll.
    await page.evaluate(async () => {
      window.scrollTo(0, 700);
      await new Promise((r) => setTimeout(r, 600));
      window.scrollTo(0, 0);
    }).catch(() => {});
    await page.waitForTimeout(4000);
    const info = await page.evaluate(() => ({
      titulo: document.title,
      robots: (document.querySelector('meta[name="robots"]') || {}).content || null,
      aviso: !!document.querySelector('[data-dl-muestra]'),
      imagenesRotas: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src).slice(0, 5),
    })).catch((e) => ({ error: e.message }));
    const png = await page.screenshot({ type: 'png' });
    const out = path.join(outDir, d.imagen);
    await sharp(png).resize(799, 506, { fit: 'cover', position: 'top' }).webp({ quality: 82 }).toFile(out);
    reporte.push({ clave: d.clave, url: d.url, status, ...info, bytes: fs.statSync(out).size, errores: errores.slice(0, 10) });
    console.log(d.clave, status, out);
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(outDir, 'reporte.json'), JSON.stringify(reporte, null, 2) + '\n');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
