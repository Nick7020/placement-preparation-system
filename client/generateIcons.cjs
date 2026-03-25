const sharp = require('sharp');
const path = require('path');

const svgBuffer = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#1a3c6e"/>
  <text x="256" y="320" font-size="280" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold">P</text>
</svg>
`);

async function generateIcons() {
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(__dirname, 'public', 'pwa-192x192.png'));
  console.log('pwa-192x192.png created ✅');

  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(__dirname, 'public', 'pwa-512x512.png'));
  console.log('pwa-512x512.png created ✅');

  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));
  console.log('apple-touch-icon.png created ✅');
}

generateIcons().catch(console.error);
