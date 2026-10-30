const fs = require('fs');
const path = require('path');

const imgPath = path.join(__dirname, '../src/assets/profile.png');
const outPath = path.join(__dirname, '../public/favicon.svg');

const imgBase64 = fs.readFileSync(imgPath).toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
  <defs>
    <clipPath id="circle-clip">
      <circle cx="48" cy="48" r="46"/>
    </clipPath>
  </defs>
  <!--
    Image params:
    - x="-14" width="124" → zoom in 30% horizontally, centered
    - y="6"  height="124" → starts 6px from top → small gap above head
    - xMidYMin slice      → top of photo shown first (face/head at top)
  -->
  <image
    href="data:image/png;base64,${imgBase64}"
    x="-14" y="6" width="124" height="124"
    clip-path="url(#circle-clip)"
    preserveAspectRatio="xMidYMin slice"
  />
  <!-- Gold border -->
  <circle cx="48" cy="48" r="45" fill="none" stroke="#c9973a" stroke-width="3.5"/>
</svg>`;

fs.writeFileSync(outPath, svg, 'utf8');
console.log('favicon.svg created! Size:', Math.round(svg.length / 1024), 'KB');

