const { micromark } = require('micromark');
const { gfm, gfmHtml } = require('micromark-extension-gfm');

function test(md) {
  let html = micromark(md, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()]
  });
  console.log('Raw:', html);
  
  html = html.replace(/<pre><code([^>]*)>/g, '<div class="pre-box"><pre><code$1>');
  html = html.replace(/<\/code><\/pre>/g, '</code></pre></div>');
  
  const opens = (html.match(/<div[\s>]/g) || []).length;
  const closes = (html.match(/<\/div>/g) || []).length;
  console.log('Opens:', opens, 'Closes:', closes);
}

test('```text\nhello\n```\n');
