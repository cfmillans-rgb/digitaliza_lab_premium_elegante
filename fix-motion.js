const fs = require('fs');

function fixMotionSafe(file) {
  let content = fs.readFileSync(file, 'utf8');
  // Replace animate-float-slow with motion-safe:animate-float-slow
  // Replace animate-float-slower with motion-safe:animate-float-slower
  // Replace animate-shimmer with motion-safe:animate-shimmer
  // Replace animate-scale-pulse with motion-safe:animate-scale-pulse
  // But be careful not to replace already prefixed ones
  content = content.replace(/(?<!motion-safe:)animate-(float-slow|float-slower|shimmer|scale-pulse|marquee)/g, 'motion-safe:animate-$1');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed motion-safe in', file);
}

fixMotionSafe('index.html');
fixMotionSafe('blog.html');
