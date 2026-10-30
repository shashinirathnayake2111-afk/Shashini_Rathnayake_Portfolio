const fs = require('fs');
const filePath = 'c:/Users/SHASIHINI MALSHA/My_Portfolio/src/components/styles/LightMode.css';

let c = fs.readFileSync(filePath, 'utf8');
c = c.replace(/\r\n/g, '\n');

// Find and remove the ::after block + update comment
const start = c.indexOf('/* Warm ivory overlay on top of image for readability */');
const end   = c.indexOf('/* All hero content must sit above the');

if (start !== -1 && end !== -1) {
  const before = c.slice(0, start);
  const after  = c.slice(end).replace(
    '/* All hero content must sit above the ::before/::after layers */',
    '/* All hero content must sit above the ::before layer - image shown clean */'
  );
  c = before + after;
  fs.writeFileSync(filePath, c, 'utf8');
  console.log('Done! ::after overlay removed.');
} else {
  console.log('start:', start, 'end:', end);
  // fallback: just remove ::after rule by searching for it
  const afterStart = c.indexOf('\nbody.light-mode .hero-section::after {');
  if (afterStart !== -1) {
    const afterEnd = c.indexOf('\n}', afterStart) + 2;
    c = c.slice(0, afterStart) + c.slice(afterEnd);
    fs.writeFileSync(filePath, c, 'utf8');
    console.log('Fallback: removed ::after rule block.');
  } else {
    console.log('Could not find ::after block.');
  }
}

