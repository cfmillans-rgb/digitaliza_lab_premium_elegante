const fs = require('fs');
const path = require('path');

const files = ['index.html', 'blog.html'];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace data-aos with data-reveal
  content = content.replace(/data-aos=/g, 'data-reveal=');
  content = content.replace(/data-aos-delay=/g, 'data-reveal-delay=');

  // Remove AOS CSS
  content = content.replace(/<link rel="preload" href="https:\/\/unpkg\.com\/aos@2\.3\.4\/dist\/aos\.css" as="style" onload="this\.onload=null;this\.rel='stylesheet'">\s*/g, '');
  content = content.replace(/<noscript><link href="https:\/\/unpkg\.com\/aos@2\.3\.4\/dist\/aos\.css" rel="stylesheet"><\/noscript>\s*/g, '');
  
  // Remove AOS JS
  content = content.replace(/<script src="https:\/\/unpkg\.com\/aos@2\.3\.4\/dist\/aos\.js" defer><\/script>\s*/g, '');

  // Remove AOS init
  content = content.replace(/AOS\.init\(\{\s*once:\s*true,\s*offset:\s*50,\s*duration:\s*800,\s*easing:\s*'ease-out-cubic'\s*\}\);\s*/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
