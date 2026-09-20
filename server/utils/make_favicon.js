import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the image as base64
const imgPath = path.join(__dirname, '../../images/mypimg.jpeg');
const data = fs.readFileSync(imgPath).toString('base64');

// Create an SVG with circle clip path embedding the base64 image
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
  <defs>
    <clipPath id="c">
      <circle cx="50" cy="50" r="50"/>
    </clipPath>
  </defs>
  <image href="data:image/jpeg;base64,${data}" width="100" height="100" clip-path="url(#c)"/>
</svg>`;

const outPath = path.join(__dirname, '../../client/public/favicon.svg');
fs.writeFileSync(outPath, svg);
console.log('Circular SVG favicon created! Size:', Math.round(svg.length / 1024), 'KB');
