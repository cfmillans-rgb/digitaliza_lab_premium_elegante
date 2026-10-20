// Configuración de Eleventy — ver README.md para la guía de edición.
module.exports = function (eleventyConfig) {
  // Archivos que se copian tal cual al sitio publicado
  eleventyConfig.addPassthroughCopy({ 'src/assets/img': 'assets/img' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/js/micro-interactions.js': 'assets/js/micro-interactions.js' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/css': 'assets/css' }); // generado por Tailwind (npm run build:css)
  ['CNAME', 'favicon.svg', 'logo.png', 'robots.txt', 'sitemap.xml'].forEach((f) => eleventyConfig.addPassthroughCopy({ ['src/' + f]: f }));
  eleventyConfig.ignores.add('src/styles/**');
  eleventyConfig.ignores.add('README.md');

  // Precios: 99990 -> "$99.990"
  const clp = (n) => '$' + Math.round(Number(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  eleventyConfig.addFilter('clp', clp);
  // Precio neto -> total con IVA (redondeo hacia abajo, como en las boletas)
  eleventyConfig.addFilter('conIva', (n, iva = 0.19) => Math.floor(Number(n) * (1 + iva)));
  // Fecha ISO -> "19 de octubre de 2026"
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  eleventyConfig.addFilter('fechaLarga', (iso) => { const [y, m, d] = String(iso).slice(0, 10).split('-'); return `${parseInt(d)} de ${meses[parseInt(m) - 1]} de ${y}`; });
  eleventyConfig.addFilter('palabras', (html) => String(html).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);
  eleventyConfig.addFilter('minutos', (n) => Math.max(3, Math.ceil(n / 200)));
  // Índice del artículo: lista de {id, texto} a partir de los <h2 id="...">
  eleventyConfig.addFilter('indice', (html) => [...String(html).matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map((m) => ({ id: m[1], texto: m[2] })));
  // Datos estructurados (JSON-LD) de un artículo
  eleventyConfig.addFilter('articuloLd', (a, empresa) => JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: empresa.url + '/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: empresa.url + '/blog.html' },
        { '@type': 'ListItem', position: 3, name: a.h1, item: a.url } ] },
      { '@type': 'BlogPosting', headline: a.h1, description: a.description,
        datePublished: a.published, dateModified: a.modified, inLanguage: 'es-CL', wordCount: a.palabras,
        image: empresa.url + '/assets/img/og-image.png',
        author: { '@type': 'Organization', name: 'Equipo ' + empresa.nombre, url: empresa.url + '/' },
        publisher: { '@type': 'Organization', name: empresa.nombre, url: empresa.url + '/', logo: { '@type': 'ImageObject', url: empresa.url + '/assets/img/logo-512.png' } },
        mainEntityOfPage: a.url } ] }, null, 2));
  eleventyConfig.addFilter('json', (v) => JSON.stringify(v, null, 2));

  // Mantener las URLs actuales: src/blog/x.html -> /blog/x.html (sin carpetas "bonitas")
  eleventyConfig.addGlobalData('permalink', () => (data) => `${data.page.filePathStem}.${data.page.outputFileExtension}`);

  return {
    dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['html', 'njk', 'md'],
  };
};
