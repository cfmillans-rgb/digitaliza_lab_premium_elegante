const fs = require('fs');

function fixSVGs(file) {
  let content = fs.readFileSync(file, 'utf8');
  // Find all <svg ...> tags.
  content = content.replace(/<svg\b([^>]*)>/gi, (match, attrs) => {
    if (!attrs.includes('aria-hidden')) {
      return `<svg aria-hidden="true"${attrs}>`;
    }
    return match;
  });
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed SVGs in', file);
}

fixSVGs('index.html');
fixSVGs('blog.html');
