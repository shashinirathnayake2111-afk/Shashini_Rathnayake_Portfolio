const fs = require('fs');
let f = fs.readFileSync('src/components/ProfileSketch.jsx', 'utf8');

// Add pathLength="1" and className="sketch-path" directly to paths
f = f.replace(/className="sketch-path"/g, '');
f = f.replace(/<path /g, '<path pathLength="1" className="sketch-path" ');

fs.writeFileSync('src/components/ProfileSketch.jsx', f);
console.log('Fixed ProfileSketch paths!');
