const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const headerMatch = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/i);
if (headerMatch) {
  const links = headerMatch[1].match(/<a\b[^>]*href=["'][^"']+["'][^>]*>/gi) || [];
  console.log('Total a tags rendered in header on dist/index.html:', links.length);
  console.log('Sample links:\n', links.slice(0, 8).join('\n'));
}
