const fs = require('fs');

const astro = fs.readFileSync('src/pages/resources/index.astro', 'utf8');
const lines = astro.split('\n');

let depth = 0;
lines.forEach((l, idx) => {
  const opens = (l.match(/<div[\s>]/g) || []).length;
  const closes = (l.match(/<\/div>/g) || []).length;
  depth += (opens - closes);
  if (l.includes('col-span-8') || l.includes('col-span-4') || l.includes('scam-and-risk') || l.includes('free-nodes') || l.includes('aside')) {
    console.log('Astro Line ' + (idx+1) + ' (depth ' + depth + '): ' + l.trim().slice(0, 60));
  }
});
console.log('Final Astro div depth:', depth);

const json = JSON.parse(fs.readFileSync('src/data/resources_content.json', 'utf8'));
for (const k in json) {
  const val = json[k];
  const opens = (val.match(/<div[\s>]/g) || []).length;
  const closes = (val.match(/<\/div>/g) || []).length;
  console.log('JSON block ' + k + ': opens=' + opens + ', closes=' + closes);
}
