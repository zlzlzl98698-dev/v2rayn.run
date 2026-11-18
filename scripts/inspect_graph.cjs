const fs = require('fs');
const html = fs.readFileSync('dist/airport/index.html', 'utf8');
const schemas = html.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
const str = schemas[1];
const parsed = JSON.parse(str);
console.log(JSON.stringify(parsed['@graph'], null, 2));

console.log('\n--- Checking Article pages schema ---');
const artHtml = fs.readFileSync('dist/articles/clash-verge-rev-complete-guide/index.html', 'utf8');
const artSchemas = artHtml.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
artSchemas.forEach((s, idx) => {
  const t = s.replace(/<script type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '');
  const p = JSON.parse(t);
  console.log(`Article Schema ${idx}:`, p['@type'] || (p['@graph'] ? 'Graph (' + p['@graph'].map(g => g['@type']).join(',') + ')' : 'Other'));
});
