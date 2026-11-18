const fs = require('fs');
const content = fs.readFileSync('src/components/common/Header.astro', 'utf8');
const links = content.match(/<a\b[^>]*href=["'][^"']+["'][^>]*>/gi) || [];
console.log('Total a tags in Header.astro:', links.length);
console.log('Sample links (first 8):\n', links.slice(0, 8).join('\n'));
