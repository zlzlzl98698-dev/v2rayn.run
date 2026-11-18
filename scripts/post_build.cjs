const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== [POST-BUILD] Starting SEO & Sitemap post-processing ===');

// 1. Ensure dist/sitemap.xml exists by copying sitemap-index.xml (or sitemap-0.xml)
if (fs.existsSync('dist/sitemap-index.xml')) {
  fs.copyFileSync('dist/sitemap-index.xml', 'dist/sitemap.xml');
  console.log('✓ Created dist/sitemap.xml (alias to sitemap-index.xml)');
} else if (fs.existsSync('dist/sitemap-0.xml')) {
  fs.copyFileSync('dist/sitemap-0.xml', 'dist/sitemap.xml');
  console.log('✓ Created dist/sitemap.xml (copied from sitemap-0.xml)');
}

// 2. Run the automated site audit
console.log('\n=== [POST-BUILD] Running site audit ===');
try {
  require('./audit_site.cjs');
  console.log('✓ Post-build audit passed cleanly!');
} catch (err) {
  console.error('✗ Post-build audit error:', err);
  process.exit(1);
}
