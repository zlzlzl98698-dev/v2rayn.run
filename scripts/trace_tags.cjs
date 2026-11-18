const fs = require('fs');

const astro = fs.readFileSync('src/pages/resources/index.astro', 'utf8');
const lines = astro.split('\n');

let stack = [];
lines.forEach((l, idx) => {
  // find all html tags
  const tagRegex = /<\/?([a-zA-Z0-9]+)(\s+[^>]*)?\/?>/g;
  let match;
  while ((match = tagRegex.exec(l)) !== null) {
    const full = match[0];
    const name = match[1].toLowerCase();
    if (full.endsWith('/>') || ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(name)) {
      continue;
    }
    if (full.startsWith('</')) {
      if (stack.length > 0 && stack[stack.length - 1].name === name) {
        stack.pop();
      } else {
        console.log(`Line ${idx+1}: Unmatched closing </${name}>, stack top is`, stack[stack.length - 1]);
      }
    } else {
      stack.push({ name, line: idx + 1 });
    }
  }
});

console.log('Unclosed tags at end of file:', stack);
