const fs = require('fs');
let content = fs.readFileSync('blog.html', 'utf8');

let count = 0;
const ids = ['diseno-web-chile', 'landing-page-chile', 'sectores', 'ciberseguridad', 'ssl', 'ddos', 'uptime', 'hosting'];

content = content.replace(/<article class="seo-guide-card" data-reveal="fade-up">/g, (match) => {
    if (count < ids.length) {
        let replacement = `<article id="${ids[count]}" class="seo-guide-card" data-reveal="fade-up">`;
        count++;
        return replacement;
    }
    return match;
});

fs.writeFileSync('blog.html', content);
console.log('Fixed IDs');
