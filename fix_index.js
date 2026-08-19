const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Price
content = content.replace('"text": "Te avisamos con anticipación antes del vencimiento. La renovación del hosting y dominio tiene un valor de $50.000 anual', '"text": "Te avisamos con anticipación antes del vencimiento. La renovación del hosting y dominio tiene un valor de $49.990 anual');

// 2. Anchor
content = content.replace('<a href="#incluye" class="btn-interactive inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent text-white font-medium text-sm px-8 py-4 transition-colors hover:bg-white/5">', '<a href="#servicios" class="btn-interactive inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent text-white font-medium text-sm px-8 py-4 transition-colors hover:bg-white/5">');

// 3. Orphan section
const lines = content.split('\n');
const orphanIndex = lines.findIndex((l, i) => i > 1395 && i < 1410 && l.trim() === '</section>' && lines[i-3].includes('</section>'));
if (orphanIndex !== -1) {
    lines.splice(orphanIndex, 1);
}
content = lines.join('\n');

// 4. Move blog preview
const startTag = '<!-- ============================================\r\n     BLOG PREVIEW\r\n============================================ -->';
const startTag2 = '<!-- ============================================\n     BLOG PREVIEW\n============================================ -->';

let startIndex = content.indexOf(startTag);
if (startIndex === -1) startIndex = content.indexOf(startTag2);

if (startIndex !== -1) {
    let searchContent = content.substring(startIndex);
    let endIndex = searchContent.indexOf('</section>');
    if (endIndex !== -1) {
        let block = searchContent.substring(0, endIndex + 10);
        content = content.replace(block, '');
        
        let mainEnd = content.indexOf('</main>');
        if (mainEnd !== -1) {
            content = content.substring(0, mainEnd) + block + '\n\n  ' + content.substring(mainEnd);
        }
    }
}

fs.writeFileSync('index.html', content);
console.log("index.html fixed");
