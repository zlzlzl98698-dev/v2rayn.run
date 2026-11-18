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
const imageIssues = [];
let faqMatchCount = 0;
let faqMismatchCount = 0;
const ogIssues = [];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  let r = '/' + path.relative('dist', f).replace(/\\/g, '/');
  if (r.endsWith('index.html')) r = r.replace(/index\.html$/, '');

  // 1. Image alt check
  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  imgTags.forEach(tag => {
    const altMatch = tag.match(/alt=["']([^"']*)["']/i);
    if (!altMatch || altMatch[1].trim() === '') {
      imageIssues.push({ page: r, tag });
    }
  });

  // 2. Open Graph check
  const ogTitle = html.match(/<meta property=["']og:title["'] content=["']([^"']+)["']/i);
  const ogDesc = html.match(/<meta property=["']og:description["'] content=["']([^"']+)["']/i);
  const ogUrl = html.match(/<meta property=["']og:url["'] content=["']([^"']+)["']/i);
  const ogImage = html.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i);

  if (!ogTitle || !ogDesc || !ogUrl || !ogImage) {
    ogIssues.push({ page: r, missing: { ogTitle: !ogTitle, ogDesc: !ogDesc, ogUrl: !ogUrl, ogImage: !ogImage } });
  }

  // 3. FAQ Schema consistency
  const faqSchemaMatch = html.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  if (faqSchemaMatch) {
    faqSchemaMatch.forEach(sm => {
      if (sm.includes('FAQPage')) {
        const jsonStr = sm.replace(/<script type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '');
        try {
          const faqData = JSON.parse(jsonStr);
          if (faqData.mainEntity && Array.isArray(faqData.mainEntity)) {
            faqData.mainEntity.forEach(item => {
              const q = item.name;
              // Check if q appears in the visible html text
              if (html.includes(q)) {
                faqMatchCount++;
              } else {
                faqMismatchCount++;
              }
            });
          }
        } catch(e) {}
      }
    });
  }
});

console.log('--- 1. IMAGE ALT AUDIT ---');
console.log('Total images without alt:', imageIssues.length);
if (imageIssues.length > 0) {
  console.log('Sample missing alt images (first 5):', imageIssues.slice(0, 5));
}

console.log('\n--- 2. OPEN GRAPH AUDIT ---');
console.log('Total pages with missing OG tags:', ogIssues.length);

console.log('\n--- 3. FAQ SCHEMA CONSISTENCY ---');
console.log('FAQ questions verified in visible HTML:', faqMatchCount);
console.log('FAQ questions NOT found in visible HTML:', faqMismatchCount);

// 4. Inspect .htaccess
console.log('\n--- 4. HTACCESS AUDIT ---');
if (fs.existsSync('dist/.htaccess')) {
  const htaccess = fs.readFileSync('dist/.htaccess', 'utf8');
  console.log('HTACCESS lines:', htaccess.split('\n').length);
  console.log('Has mod_rewrite?', htaccess.includes('RewriteEngine On'));
  console.log('Has mod_deflate (gzip)?', htaccess.includes('mod_deflate'));
  console.log('Has Security headers?', htaccess.includes('X-Content-Type-Options'));
  console.log('Has 404 ErrorDocument?', htaccess.includes('ErrorDocument 404'));
} else {
  console.log('dist/.htaccess NOT FOUND');
}
