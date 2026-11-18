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

const existing = new Set();
const files = getAllHtmlFiles('dist');
files.forEach(f => {
  let r = '/' + path.relative('dist', f).replace(/\\/g, '/');
  if (r.endsWith('index.html')) r = r.replace(/index\.html$/, '');
  existing.add(r);
  if (r !== '') existing.add(r.replace(/\/$/, ''));
});

// Assets
function addAssets(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'pagefind') addAssets(full);
    } else {
      const rel = '/' + path.relative('dist', full).replace(/\\/g, '/');
      existing.add(rel);
    }
  });
}
addAssets('dist');

const deadLinks = [];
const trackingDetails = [];
const leakedDetails = [];
const thinPages = [];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  let r = '/' + path.relative('dist', f).replace(/\\/g, '/');
  if (r.endsWith('index.html')) r = r.replace(/index\.html$/, '');

  // Dead links
  const tags = html.match(/<a\b[^>]*>/gi) || [];
  tags.forEach(t => {
    const m = t.match(/href=["']([^"']*)["']/i);
    if (m && m[1].startsWith('/') && !m[1].startsWith('//')) {
      const clean = m[1].split('#')[0].split('?')[0];
      if (clean && !existing.has(clean) && !existing.has(clean + '/')) {
        deadLinks.push({ from: r, to: clean, tag: t });
      }
    }
  });

  // Tracking
  const trackMatches = html.match(/(gtag|google-analytics|hm\.baidu|pagead2)/gi);
  if (trackMatches) {
    trackingDetails.push({ page: r, matches: trackMatches });
  }

  // Leaked
  if (html.includes('C:\\Users') || html.includes('C:/Users')) {
    html.split('\n').forEach((l, idx) => {
      if (l.includes('C:\\Users') || l.includes('C:/Users')) {
        leakedDetails.push({ page: r, line: idx + 1, text: l.trim().slice(0, 120) });
      }
    });
  }

  // Pure Chinese in body
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const textContent = (bodyMatch ? bodyMatch[1] : html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ');
  const ch = (textContent.match(/[\u4e00-\u9fa5]/g) || []).length;
  if (ch < 1500) {
    thinPages.push({ page: r, count: ch });
  }
});

console.log('--- ALL DEAD LINKS ---');
const deadMap = {};
deadLinks.forEach(d => {
  if (!deadMap[d.to]) deadMap[d.to] = [];
  deadMap[d.to].push(d.from);
});
console.log(JSON.stringify(deadMap, null, 2));

console.log('--- TRACKING SCRIPTS DETAILS ---');
console.log(JSON.stringify(trackingDetails, null, 2));

console.log('--- LEAKED INFO DETAILS ---');
console.log(JSON.stringify(leakedDetails, null, 2));

console.log('--- THIN PAGES (<1500 pure Chinese chars) ---');
console.log(JSON.stringify(thinPages, null, 2));
