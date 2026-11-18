const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcAvatar = 'C:/Users/Pro User/.gemini/antigravity/brain/2068a25f-cc56-49b7-90e4-214d9981d013/.user_uploaded/media_1794996138340_afe66134.webp';

async function generateFavicons() {
  const metadata = await sharp(srcAvatar).metadata();
  console.log('Avatar metadata:', metadata);

  // Ensure public/ and public/images/ exist
  if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true });
  if (!fs.existsSync('public/images')) fs.mkdirSync('public/images', { recursive: true });

  // 1. Write public/favicon.webp
  await sharp(srcAvatar).resize(128, 128).webp({ quality: 95 }).toFile('public/favicon.webp');
  console.log('Saved public/favicon.webp');

  // 2. Write public/images/avatar.webp
  await sharp(srcAvatar).resize(256, 256).webp({ quality: 95 }).toFile('public/images/avatar.webp');
  console.log('Saved public/images/avatar.webp');

  // 3. Write public/favicon.png
  await sharp(srcAvatar).resize(64, 64).png().toFile('public/favicon.png');
  console.log('Saved public/favicon.png');

  // 4. Write public/favicon.ico
  const png32 = await sharp(srcAvatar).resize(32, 32).png().toBuffer();
  fs.writeFileSync('public/favicon.ico', png32);
  console.log('Saved public/favicon.ico');

  // 5. Write public/favicon.svg (embedded data URI with rounded rect)
  const b64 = (await sharp(srcAvatar).resize(128, 128).png().toBuffer()).toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <clipPath id="rounded">
      <rect width="128" height="128" rx="28" ry="28" />
    </clipPath>
  </defs>
  <image href="data:image/png;base64,${b64}" width="128" height="128" clip-path="url(#rounded)" />
</svg>
`;
  fs.writeFileSync('public/favicon.svg', svgContent, 'utf8');
  console.log('Saved public/favicon.svg');
}

generateFavicons()
  .then(() => console.log('All favicons successfully generated!'))
  .catch(err => {
    console.error('Error generating favicons:', err);
    process.exit(1);
  });
