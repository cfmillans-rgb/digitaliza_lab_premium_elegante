const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(process.env.USERPROFILE, 'Downloads');

const icons = {
  garantia: `<svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#ff8a42" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>`,
  proyectos: `<svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#ff8a42" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line></svg>`,
  proceso: `<svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#ff8a42" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 18h6"></path><path d="M9 10h6"></path></svg>`,
  valores: `<svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#ff8a42" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><circle cx="7" cy="7" r="1.5" fill="#ff8a42" stroke="none"></circle></svg>`
};

async function generate() {
  for (const [name, svgString] of Object.entries(icons)) {
    const svgBuffer = Buffer.from(svgString);
    
    await sharp({
      create: {
        width: 1080,
        height: 1920,
        channels: 4,
        background: { r: 10, g: 10, b: 10, alpha: 1 } // #0a0a0a
      }
    })
    .composite([
      { input: svgBuffer, gravity: 'center' }
    ])
    .png()
    .toFile(path.join(outDir, `digitaliza_cover_perfect_${name}.png`));
    
    console.log(`Generated: digitaliza_cover_perfect_${name}.png`);
  }
}

generate().catch(console.error);
