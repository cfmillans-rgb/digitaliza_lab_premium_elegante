# Instrucciones para agentes de IA (Antigravity, Gemini, Claude, Cursor…)

Este repositorio es el sitio **digitalizalab.cl**. Se genera con **Eleventy** + **Tailwind CSS** y se publica solo con GitHub Actions al hacer push a `main`.

## Reglas importantes

1. **Edita solo dentro de `src/`.** La carpeta `_site/` es el resultado de la compilación: no la edites ni la subas (está en `.gitignore`).
2. **No escribas datos de la empresa ni precios a mano.** Están centralizados:
   - `src/_data/empresa.json` → razón social, RUT, dirección, correo, WhatsApp, horario, IDs de Google Analytics y Meta.
   - `src/_data/precios.json` → precios **netos** (sin IVA) de landing, pack de ajustes y renovación.
   En las páginas se usan así: `{{ empresa.rut }}`, `{{ precios.landing | clp }}` (→ `$99.990`) y `{{ precios.landing | conIva | clp }}` (→ `$118.988`).
3. **Los precios publicados deben mostrar el IVA** (Ley 19.496, art. 30): usa `+ IVA` junto al neto y el total con `conIva`.
4. **No agregues scripts de Google Analytics, Meta Pixel u otros rastreadores directamente en las páginas.** Se cargan solo con consentimiento desde `src/consent.js.njk` (Ley 21.719). Si necesitas otra herramienta de medición, agrégala ahí, en la categoría que corresponda.
5. **Mantén las URLs.** Cada archivo `src/x.html` se publica como `/x.html` y `src/blog/x.html` como `/blog/x.html`. No cambies nombres de archivo sin agregar una redirección.
6. **Los textos deben coincidir con los Términos y Condiciones** (`src/terminos.html`, `src/entrega-y-reembolso.html`): plazos, correcciones, garantía y precios. Si cambias uno, revisa el otro.
7. **Diseños de muestra ≠ clientes.** En el portafolio, la sección "Trabajos reales" solo lleva clientes con permiso. Los demos van en "Diseños de muestra" y deben decir que no son clientes.
8. **Sintaxis de plantillas:** las páginas se procesan con Nunjucks. Si necesitas escribir `{{`, `{%` o `{#` literalmente (por ejemplo en CSS o JS), envuélvelo en `{% raw %}…{% endraw %}`.

## Estructura

```
src/
  _data/            datos compartidos (empresa.json, precios.json, articulos.json…)
  _includes/
    layouts/articulo.njk     plantilla de los artículos del blog (formato nuevo)
    partials/               piezas repetidas: pies de página, menú, banner de cookies, estilos
  index.html        página principal
  blog.html         índice del blog
  blog/             artículos
  pagina-web-psicologos.html   página por rubro
  terminos.html, privacidad.html, entrega-y-reembolso.html, datos-empresa.html
  consent.js.njk    banner de cookies (se publica como /assets/js/consent.js)
  assets/img, assets/js     archivos que se copian tal cual
  styles/tailwind.css       estilos fuente de Tailwind
  sitemap.xml, robots.txt, CNAME
eleventy.config.js  configuración y filtros (clp, conIva, fechaLarga…)
tailwind.config.js / tailwind-blog.config.js
```

## Cómo agregar un artículo al blog

1. Copia `src/blog/landing-page-chile.html` con un nombre nuevo, por ejemplo `src/blog/mi-articulo.html`.
2. Cambia la ficha de arriba (entre `---`): `title`, `description`, `h1`, `crumb`, `kicker`, `published`, `modified`, `lead`, `related` y `sources`.
3. Escribe el contenido en HTML. Usa `<h2 id="algo">` para las secciones: el índice se arma solo.
4. Agrega el título en `src/_data/articulos.json`, la tarjeta en `src/blog.html` y la URL en `src/sitemap.xml`.
5. Cita fuentes reales para cada cifra. No inventes estadísticas.

## Comandos

- `npm install` — instala dependencias (una vez).
- `npm start` — compila y abre una vista previa en http://localhost:8080 que se actualiza al guardar.
- `npm run build` — compila todo en `_site/` (lo mismo que hace GitHub al publicar).

Antes de hacer push, ejecuta `npm run build` y confirma que termina sin errores.
