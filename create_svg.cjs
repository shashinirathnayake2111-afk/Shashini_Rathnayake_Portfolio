const fs = require('fs');
let svg = fs.readFileSync('src/assets/profile-sketch.svg', 'utf8');

// Replace filled paths with strokes
svg = svg.replace(/fill="#000000"/g, 'fill="none"');
svg = svg.replace(/stroke="none"/g, 'stroke="currentColor" strokeWidth="6" className="sketch-path"');

// Remove XML and DOCTYPE tags
svg = svg.replace(/<\?xml[^>]+>/g, '');
svg = svg.replace(/<!DOCTYPE[^>]+>/g, '');
svg = svg.replace(/xmlns="[^"]+"/g, '');

// Convert hyphenated SVG attributes to camelCase for React
svg = svg.replace(/([a-z]+)-([a-z]+)=/g, (m, p1, p2) => p1 + p2.charAt(0).toUpperCase() + p2.slice(1) + '=');
// Fix preserveAspectRatio specifically
svg = svg.replace(/preserveAspectRatio=/g, 'preserveAspectRatio=');

// Add vectorEffect so stroke doesn't scale weirdly
svg = svg.replace(/<path /g, '<path vectorEffect="non-scaling-stroke" ');

const jsx = `import React from 'react';

const ProfileSketch = ({ className }) => (
  <div className={className}>
    ${svg}
  </div>
);

export default ProfileSketch;`;

fs.writeFileSync('src/components/ProfileSketch.jsx', jsx);
console.log('ProfileSketch.jsx created successfully!');
