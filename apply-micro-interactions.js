const fs = require('fs');
const path = require('path');

const files = ['index.html', 'blog.html'];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Add the JS script before </body> if not present
  if (!content.includes('micro-interactions.js')) {
    content = content.replace(/<\/body>/, '  <script src="assets/js/micro-interactions.js" defer></script>\n</body>');
  }

  // Find buttons that have bg-amber-glow or similar interactive styles and add btn-interactive
  // Simple regex to match some common buttons
  content = content.replace(/(class="[^"]*?(bg-amber-glow|btn|rounded-full)[^"]*?")/g, (match) => {
    if (!match.includes('btn-interactive') && match.includes('px-') && match.includes('py-')) {
      return match.replace(/class="/, 'class="btn-interactive ');
    }
    return match;
  });

  // Add spotlight-card to specific sections
  // Pricing card
  content = content.replace(/(class="[^"]*border border-white\/10[^"]*rounded-[^"]*)/g, (match) => {
    if (!match.includes('spotlight-card') && !match.includes('nav')) {
      return match.replace(/class="/, 'class="spotlight-card ');
    }
    return match;
  });

  // Parallax layer on the big glow blur elements
  content = content.replace(/(class="[^"]*bg-amber-glow\/10 blur-\[100px\][^"]*")/g, (match) => {
    if (!match.includes('parallax-layer')) {
      // replace class="... with class="parallax-layer ... and add data-speed
      return match.replace(/class="/, 'data-speed="0.3" class="parallax-layer ');
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Applied classes to ${file}`);
});
