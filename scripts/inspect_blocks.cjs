const fs = require('fs');

const raw = fs.readFileSync('scripts/build_resources_page.cjs', 'utf8');
const blocksStart = raw.indexOf('const contentBlocks = {');
const blocksEnd = raw.indexOf('console.log(\'Constructed modular content blocks.\');');
const blocksCode = raw.slice(blocksStart, blocksEnd);

const sandbox = {};
const fn = new Function('sandbox', blocksCode + '\nsandbox.contentBlocks = contentBlocks;');
fn(sandbox);

const contentBlocks = sandbox.contentBlocks;
console.log('Blocks keys:', Object.keys(contentBlocks));
let total = 0;
for (const k in contentBlocks) {
  const c = (contentBlocks[k].match(/[\u4e00-\u9fa5]/g) || []).length;
  console.log(`${k}: ${c} characters`);
  total += c;
}
console.log('Total pure Chinese characters in blocks:', total);
