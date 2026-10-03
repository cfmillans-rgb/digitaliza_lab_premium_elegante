const fs = require('fs');

// We will replace the footer links section in index.html, blog.html, and blog/*.html

function updateFooter(filePath, isNested) {
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Pattern to replace for index.html and blog.html
  // Currently they have:
  // <a href="terminos.html" class="text-mist/70 hover:text-white transition">Términos</a>
  // <a href="privacidad.html" class="text-mist/70 hover:text-white transition">Privacidad</a>
  
  const prefix = isNested ? '../' : '';
  
  const oldFooterLinks = /<div class="flex items-center gap-4">\s*<a href="[^"]*terminos\.html"[^>]*>Términos<\/a>\s*<a href="[^"]*privacidad\.html"[^>]*>Privacidad<\/a>/;
  
  const newFooterLinks = `<div class="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <a href="${prefix}terminos.html" class="text-mist/70 hover:text-white transition">Términos</a>
          <a href="${prefix}privacidad.html" class="text-mist/70 hover:text-white transition">Privacidad</a>
          <a href="${prefix}entrega-y-reembolso.html" class="text-mist/70 hover:text-white transition">Entrega y Reembolso</a>
          <a href="${prefix}datos-empresa.html" class="text-mist/70 hover:text-white transition">Datos de la empresa</a>`;

  if (oldFooterLinks.test(html)) {
    html = html.replace(oldFooterLinks, newFooterLinks);
    fs.writeFileSync(filePath, html);
    console.log('Updated ' + filePath);
  } else {
    console.log('Footer pattern not found in ' + filePath);
  }
}

updateFooter('index.html', false);
updateFooter('blog.html', false);

// The blog individual files don't have these links yet, their footer is:
// <footer style="border-top: 1px solid rgba(255,255,255,0.05); padding: 2rem 1.5rem; text-align: center;">
//   <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #52525b; letter-spacing: 0.1em;">© <script>document.write(new Date().getFullYear())</script> Digitaliza Lab · Todos los derechos reservados</p>
// </footer>

function updateBlogPosts() {
  const dir = 'blog/';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  
  for (const file of files) {
    let filePath = dir + file;
    let html = fs.readFileSync(filePath, 'utf8');
    
    const oldFooter = /<footer style="border-top: 1px solid rgba\(255,255,255,0\.05\); padding: 2rem 1\.5rem; text-align: center;">[\s\S]*?<\/footer>/;
    
    const newFooter = `<footer style="border-top: 1px solid rgba(255,255,255,0.05); padding: 3rem 1.5rem; text-align: center;">
    <div style="max-width: 48rem; margin: 0 auto;">
      <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2rem; font-size: 0.9rem;">
        <a href="../terminos.html" style="color: #9ca3af; text-decoration: none;">Términos y condiciones</a>
        <a href="../privacidad.html" style="color: #9ca3af; text-decoration: none;">Política de privacidad</a>
        <a href="../entrega-y-reembolso.html" style="color: #9ca3af; text-decoration: none;">Entrega y reembolso</a>
        <a href="../datos-empresa.html" style="color: #9ca3af; text-decoration: none;">Datos de la empresa</a>
      </div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #52525b; letter-spacing: 0.1em; margin-bottom: 0.5rem;">© <script>document.write(new Date().getFullYear())</script> DIGITALIZA LAB SPA · RUT 78.517.255-8</p>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #52525b; letter-spacing: 0.05em;">Antonio Bellet 193 Of 1210, Providencia, Santiago, Chile</p>
    </div>
  </footer>`;

    if (oldFooter.test(html)) {
      html = html.replace(oldFooter, newFooter);
      fs.writeFileSync(filePath, html);
      console.log('Updated ' + filePath);
    }
  }
}

updateBlogPosts();
