const fs = require('fs');
const path = require('path');

const imgPath = path.join(__dirname, '../src/assets/profile.png');
const outPath = path.join(__dirname, '../public/favicon.svg');

const imgBase64 = fs.readFileSync(imgPath).toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="circle-clip">
      <circle cx="50" cy="50" r="48"/>
    </clipPath>
  </defs>
  <circle cx="50" cy="50" r="50" fill="#1a1107"/>
  <image
    href="data:image/png;base64,${imgBase64}"
    x="2" y="2" width="96" height="96"
    clip-path="url(#circle-clip)"
    preserveAspectRatio="xMidYMid slice"
  />
  <circle cx="50" cy="50" r="48" fill="none" stroke="#b48332" stroke-width="3"/>
</svg>`;

fs.writeFileSync(outPath, svg, 'utf8');
console.log('favicon.svg created! Size:', Math.round(svg.length / 1024), 'KB');
