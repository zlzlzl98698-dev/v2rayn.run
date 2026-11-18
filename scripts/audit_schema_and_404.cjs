const fs = require('fs');

// 1. Inspect Schema in airport/index.html
const html = fs.readFileSync('dist/airport/index.html', 'utf8');
const schemas = html.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
schemas.forEach((s, idx) => {
  const str = s.replace(/<script type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '');
  const parsed = JSON.parse(str);
  console.log(`Schema ${idx}: keys=${Object.keys(parsed).join(',')}, @type=${parsed['@type']}`);
});

// 2. Check 404 robots tag
const h404 = fs.readFileSync('dist/404.html', 'utf8');
const m404 = h404.match(/<meta name=["']robots["'][^>]*>/i);
console.log('404 robots tag:', m404 ? m404[0] : 'NONE');

// 3. Find the page with 18-character description
function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = require('path').join(dir, file);
    if (fs.statSync(full).isDirectory()) results = results.concat(getAllHtmlFiles(full));
    else if (file.endsWith('.html')) results.push(full);
  });
  return results;
}
const files = getAllHtmlFiles('dist');
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const dm = c.match(/<meta name=["']description["'] content=["']([^"']+)["']/i);
  if (dm && dm[1].length < 35) {
    console.log('Short description (<35 chars):', f.replace(/\\/g, '/'), '->', dm[1].length, dm[1]);
  }
});

// 4. Check XML sitemap for 404 or non-existent URLs
const sm = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const locs = sm.match(/<loc>[^<]+<\/loc>/g).map(l => l.replace(/<\/?loc>/g, ''));
console.log('\nChecking all sitemap URLs in dist:');
let missingInDist = 0;
locs.forEach(url => {
  let rel = url.replace('https://v2rayn.run/', '');
  let expectedFile = rel === '' ? 'dist/index.html' : `dist/${rel}index.html`;
  if (!fs.existsSync(expectedFile)) {
    console.log('Sitemap URL file missing:', url, expectedFile);
    missingInDist++;
  }
});
console.log('Sitemap missing URLs count:', missingInDist);

// 5. Check if 404 is in sitemap
const has404InSitemap = locs.some(u => u.includes('404'));
console.log('Is 404 in sitemap?', has404InSitemap);
