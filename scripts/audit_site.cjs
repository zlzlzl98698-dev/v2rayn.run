const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles('dist');
console.log(`Found ${htmlFiles.length} HTML files in dist/`);

const report = {
  totalFiles: htmlFiles.length,
  canonicalIssues: [],
  emptyAnchorTags: [],
  internalDeadLinks: [],
  externalLinks: [],
  sponsoredLinksWithoutNofollow: [],
  trackingScripts: [],
  schemaValidations: [],
  metaIssues: [],
  wordCounts: [],
  thinContentPages: [],
  answerFirstPages: 0,
  tableCountPages: 0,
  faqPages: 0,
  leakedInfo: []
};

// Map existing files to normalized paths for dead link checking
const existingPaths = new Set();
htmlFiles.forEach(f => {
  let rel = path.relative('dist', f).replace(/\\/g, '/');
  if (rel.endsWith('index.html')) {
    rel = rel.replace(/index\.html$/, '');
  }
  existingPaths.add('/' + rel);
  if (rel !== '') {
    existingPaths.add('/' + rel.replace(/\/$/, ''));
  }
});
existingPaths.add('/');
// Assets in dist
function addAssets(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'pagefind') addAssets(full);
    } else {
      const rel = '/' + path.relative('dist', full).replace(/\\/g, '/');
      existingPaths.add(rel);
    }
  });
}
addAssets('dist');

const titles = new Map();
const descriptions = new Map();

htmlFiles.forEach(filePath => {
  const html = fs.readFileSync(filePath, 'utf8');
  let relPath = '/' + path.relative('dist', filePath).replace(/\\/g, '/');
  if (relPath.endsWith('index.html')) relPath = relPath.replace(/index\.html$/, '');

  // 1. Canonical check
  const canonicalMatch = html.match(/<link rel=["']canonical["'] href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    report.canonicalIssues.push({ path: relPath, issue: 'Missing canonical' });
  } else {
    const canUrl = canonicalMatch[1];
    if (!canUrl.startsWith('https://v2rayn.run')) {
      report.canonicalIssues.push({ path: relPath, issue: 'Non-production domain or non-https: ' + canUrl });
    }
  }

  // 2. Title & Description check
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const descMatch = html.match(/<meta name=["']description["'] content=["']([^"']+)["']/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const desc = descMatch ? descMatch[1].trim() : '';

  if (!title) {
    report.metaIssues.push({ path: relPath, issue: 'Missing title' });
  } else {
    if (titles.has(title)) {
      titles.get(title).push(relPath);
    } else {
      titles.set(title, [relPath]);
    }
  }

  if (!desc) {
    report.metaIssues.push({ path: relPath, issue: 'Missing description' });
  } else {
    if (descriptions.has(desc)) {
      descriptions.get(desc).push(relPath);
    } else {
      descriptions.set(desc, [relPath]);
    }
  }

  // 3. Links check
  // Empty a tags or js href
  const aTags = html.match(/<a\b[^>]*>/gi) || [];
  aTags.forEach(tag => {
    const hrefMatch = tag.match(/href=["']([^"']*)["']/i);
    if (!hrefMatch || !hrefMatch[1] || hrefMatch[1].trim() === '#' || hrefMatch[1].trim() === 'javascript:void(0)') {
      report.emptyAnchorTags.push({ path: relPath, tag });
    } else {
      const href = hrefMatch[1].trim();
      if (href.startsWith('http://') || href.startsWith('https://')) {
        // External link
        const isInternalHost = href.startsWith('https://v2rayn.run');
        if (!isInternalHost) {
          const relAttrMatch = tag.match(/rel=["']([^"']+)["']/i);
          const relAttr = relAttrMatch ? relAttrMatch[1] : '';
          const isSponsored = href.includes('aff') || href.includes('channel=') || href.includes('register') || href.includes('guangsu') || href.includes('muguang') || href.includes('feimao');
          report.externalLinks.push({ path: relPath, href, rel: relAttr });
          if (isSponsored) {
            if (!relAttr.includes('nofollow') || !relAttr.includes('sponsored')) {
              report.sponsoredLinksWithoutNofollow.push({ path: relPath, href, tag, rel: relAttr });
            }
          }
        }
      } else if (href.startsWith('/') && !href.startsWith('//')) {
        // Internal link
        const cleanHref = href.split('#')[0].split('?')[0];
        if (cleanHref && !existingPaths.has(cleanHref) && !existingPaths.has(cleanHref + '/')) {
          report.internalDeadLinks.push({ path: relPath, href: cleanHref });
        }
      }
    }
  });

  // 4. Tracking scripts & fingerprinting
  if (html.includes('google-analytics.com') || html.includes('gtag') || html.includes('G-') || html.includes('UA-')) {
    const gMatches = html.match(/(G-[A-Za-z0-9]+|UA-[0-9-]+)/g) || [];
    report.trackingScripts.push({ path: relPath, type: 'Google Analytics', ids: gMatches });
  }
  if (html.includes('hm.baidu.com')) {
    report.trackingScripts.push({ path: relPath, type: 'Baidu Analytics' });
  }
  if (html.includes('pagead2.googlesyndication.com')) {
    report.trackingScripts.push({ path: relPath, type: 'Google AdSense' });
  }

  // 5. Leak checks (internal IP, local paths like C:\Users)
  if (html.includes('C:\\Users') || html.includes('C:/Users') || html.includes('192.168.') || html.includes('10.0.') || html.includes('127.0.0.1')) {
    // Check if it's within article text explaining tutorials or actual leak
    const lines = html.split('\n');
    lines.forEach((l, idx) => {
      if ((l.includes('C:\\Users') || l.includes('C:/Users')) && !l.includes('PowerShell') && !l.includes('cmd')) {
        report.leakedInfo.push({ path: relPath, line: idx + 1, content: l.slice(0, 100) });
      }
    });
  }

  // 6. Schema JSON-LD validation
  const jsonLdMatches = html.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
  jsonLdMatches.forEach(tag => {
    const jsonStr = tag.replace(/<script type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '');
    try {
      const parsed = JSON.parse(jsonStr);
      report.schemaValidations.push({ path: relPath, valid: true, type: parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Unknown') });
    } catch (e) {
      report.schemaValidations.push({ path: relPath, valid: false, error: e.message });
    }
  });

  // 7. Word Count & Content Thinness
  // Extract text inside <main> or <article>
  const mainMatch = html.match(/<(main|article)\b[^>]*>([\s\S]*?)<\/\1>/i);
  const textContent = (mainMatch ? mainMatch[2] : html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
  const pureChinese = (textContent.match(/[\u4e00-\u9fa5]/g) || []).length;
  report.wordCounts.push({ path: relPath, pureChinese });
  if (pureChinese < 1000 && !relPath.includes('search') && !relPath.includes('404')) {
    report.thinContentPages.push({ path: relPath, pureChinese });
  }

  // 8. GEO / AEO elements
  if (html.includes('bg-brand-50/60') || html.includes('核心速览') || html.includes('Answer-First') || html.includes('结论速览') || html.includes('本页核心速查') || html.includes('本页核心导读')) {
    report.answerFirstPages++;
  }
  if (html.includes('<table')) {
    report.tableCountPages++;
  }
  if (html.includes('<details') || html.includes('faq-item')) {
    report.faqPages++;
  }
});

// Duplicates summary
const dupTitles = Array.from(titles.entries()).filter(([t, paths]) => paths.length > 1);
const dupDesc = Array.from(descriptions.entries()).filter(([d, paths]) => paths.length > 1);

console.log('=== AUDIT RESULTS SUMMARY ===');
console.log('Total HTML pages audited:', report.totalFiles);
console.log('Canonical issues:', report.canonicalIssues.length);
console.log('Duplicate titles:', dupTitles.length);
console.log('Duplicate descriptions:', dupDesc.length);
console.log('Empty anchor tags:', report.emptyAnchorTags.length);
console.log('Internal dead links:', report.internalDeadLinks.length);
console.log('Total external links:', report.externalLinks.length);
console.log('Sponsored/Aff links without nofollow:', report.sponsoredLinksWithoutNofollow.length);
console.log('Tracking scripts found:', report.trackingScripts.length);
console.log('Schema validations count:', report.schemaValidations.length);
const invalidSchemas = report.schemaValidations.filter(s => !s.valid);
console.log('Invalid schemas:', invalidSchemas.length);
console.log('Thin content pages (<1000 pure Chinese):', report.thinContentPages.length);
console.log('Pages with Answer-First boxes:', report.answerFirstPages);
console.log('Pages with tables:', report.tableCountPages);
console.log('Pages with FAQ details:', report.faqPages);
console.log('Leaked info items:', report.leakedInfo.length);

fs.writeFileSync('audit_output.json', JSON.stringify({
  summary: {
    totalFiles: report.totalFiles,
    canonicalIssuesCount: report.canonicalIssues.length,
    duplicateTitlesCount: dupTitles.length,
    duplicateDescriptionsCount: dupDesc.length,
    emptyAnchorTagsCount: report.emptyAnchorTags.length,
    internalDeadLinksCount: report.internalDeadLinks.length,
    externalLinksCount: report.externalLinks.length,
    sponsoredWithoutNofollowCount: report.sponsoredLinksWithoutNofollow.length,
    trackingScriptsCount: report.trackingScripts.length,
    schemaCount: report.schemaValidations.length,
    invalidSchemaCount: invalidSchemas.length,
    thinContentCount: report.thinContentPages.length,
    answerFirstPages: report.answerFirstPages,
    tableCountPages: report.tableCountPages,
    faqPages: report.faqPages,
    leakedInfoCount: report.leakedInfo.length
  },
  dupTitles,
  dupDesc,
  emptyAnchorTags: report.emptyAnchorTags.slice(0, 20),
  internalDeadLinks: report.internalDeadLinks.slice(0, 20),
  sponsoredLinksWithoutNofollow: report.sponsoredLinksWithoutNofollow,
  thinContentPages: report.thinContentPages,
  leakedInfo: report.leakedInfo
}, null, 2), 'utf8');
