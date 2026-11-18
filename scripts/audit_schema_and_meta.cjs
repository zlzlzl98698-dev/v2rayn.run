const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) results = results.concat(getAllHtmlFiles(full));
    else if (file.endsWith('.html')) results.push(full);
  });
  return results;
}

const files = getAllHtmlFiles('dist');
const sampleCanonical = [];
const schemaTypes = {};
const metaLengths = [];
const externalLinkAudit = [];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  let r = '/' + path.relative('dist', f).replace(/\\/g, '/');
  if (r.endsWith('index.html')) r = r.replace(/index\.html$/, '');

  // 1. Canonical
  const c = html.match(/<link rel=["']canonical["'] href=["']([^"']+)["']/i);
  if (c) {
    sampleCanonical.push({ path: r, canonical: c[1] });
  }

  // 2. Schema
  const schemas = html.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
  schemas.forEach(s => {
    const str = s.replace(/<script type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '');
    try {
      const parsed = JSON.parse(str);
      const t = parsed['@type'] || 'Unknown';
      schemaTypes[t] = (schemaTypes[t] || 0) + 1;
    } catch(e) {}
  });

  // 3. Meta length & keyword stuffing
  const tm = html.match(/<title>([^<]+)<\/title>/i);
  const dm = html.match(/<meta name=["']description["'] content=["']([^"']+)["']/i);
  if (tm && dm) {
    const t = tm[1].trim();
    const d = dm[1].trim();
    metaLengths.push({
      path: r,
      title: t,
      titleLen: t.length,
      desc: d,
      descLen: d.length
    });
  }

  // 4. External links
  const aTags = html.match(/<a\b[^>]*>/gi) || [];
  aTags.forEach(tag => {
    const hm = tag.match(/href=["']([^"']+)["']/i);
    if (hm && (hm[1].startsWith('http://') || hm[1].startsWith('https://'))) {
      if (!hm[1].startsWith('https://v2rayn.run')) {
        const rm = tag.match(/rel=["']([^"']+)["']/i);
        const rel = rm ? rm[1] : '';
        externalLinkAudit.push({ page: r, href: hm[1], rel, tag });
      }
    }
  });
});

console.log('--- 1. CANONICAL SAMPLES (10 pages) ---');
sampleCanonical.slice(0, 10).forEach(c => console.log(c.path, '=>', c.canonical));

console.log('\n--- 2. SCHEMA TYPES DISTRIBUTION ---');
console.log(JSON.stringify(schemaTypes, null, 2));

console.log('\n--- 3. META LENGTHS STATS ---');
const tLens = metaLengths.map(m => m.titleLen);
const dLens = metaLengths.map(m => m.descLen);
console.log('Title length min/avg/max:', Math.min(...tLens), (tLens.reduce((a,b)=>a+b,0)/tLens.length).toFixed(1), Math.max(...tLens));
console.log('Desc length min/avg/max:', Math.min(...dLens), (dLens.reduce((a,b)=>a+b,0)/dLens.length).toFixed(1), Math.max(...dLens));

console.log('\n--- 4. EXTERNAL COMMERCIAL LINKS AUDIT ---');
const affLinks = externalLinkAudit.filter(l => l.href.includes('aff') || l.href.includes('register') || l.href.includes('channel=') || l.href.includes('guangsu') || l.href.includes('muguang') || l.href.includes('feimao'));
console.log('Total commercial outbound links:', affLinks.length);
const unflagged = affLinks.filter(l => !l.rel.includes('nofollow') || !l.rel.includes('sponsored'));
console.log('Unflagged commercial links:', unflagged.length);
if (unflagged.length > 0) {
  console.log('Unflagged sample:', unflagged.slice(0, 5));
}
