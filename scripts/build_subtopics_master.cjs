const fs = require('fs');
const path = require('path');
const { micromark } = require('micromark');
const { gfm, gfmHtml } = require('micromark-extension-gfm');

function countChineseCharacters(text) {
  const matches = text.match(/[\u4e00-\u9fa5]/g);
  return matches ? matches.length : 0;
}

function mdToHtml(md) {
  let html = micromark(md, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()]
  });

  // Responsive Table wrapping
  html = html.replace(/<table>/g, '<div class="overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm"><table class="w-full text-left text-sm border-collapse">');
  html = html.replace(/<\/table>/g, '</table></div>');
  html = html.replace(/<thead>/g, '<thead class="bg-slate-50 text-slate-800">');
  html = html.replace(/<th>/g, '<th class="p-3.5 font-bold border-b border-slate-200 whitespace-nowrap text-xs sm:text-sm">');
  html = html.replace(/<td>/g, '<td class="p-3.5 border-b border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed">');

  // Headings
  html = html.replace(/<h3>/g, '<h3 class="text-xl font-bold text-slate-900 mt-8 mb-3 flex items-center gap-2">');
  html = html.replace(/<h4>/g, '<h4 class="text-base font-bold text-slate-800 mt-5 mb-2">');

  // Paragraphs
  html = html.replace(/<p>/g, '<p class="text-slate-600 leading-relaxed mb-4">');

  // Lists
  html = html.replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 text-slate-600 my-4 pl-2">');
  html = html.replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 text-slate-600 my-4 pl-2">');

  // Pre & Code: Match any attributes on code tag to prevent tag imbalance
  html = html.replace(/<pre><code([^>]*)>/g, '<div class="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto my-4"><pre><code$1>');
  html = html.replace(/<\/code><\/pre>/g, '</code></pre></div>');

  // Inline Code
  html = html.replace(/<code>/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-brand-600 font-mono text-xs">');

  // Blockquotes
  html = html.replace(/<blockquote>/g, '<blockquote class="border-l-4 border-brand-500 pl-4 py-2 my-4 bg-brand-50/50 rounded-r-xl text-slate-700 italic">');

  // Bold
  html = html.replace(/<strong>/g, '<strong class="font-bold text-slate-900">');

  return html;
}

const subtopicFiles = [
  'free_nodes.cjs',
  'warning.cjs',
  'faq.cjs',
  'risk_intel.cjs',
  'node_check.cjs',
  'subscription_issues.cjs',
  'beginner.cjs'
];

const results = [];

subtopicFiles.forEach(subFile => {
  const modPath = path.join(__dirname, 'subtopics_data', subFile);
  const data = require(modPath);
  console.log(`\n========================================`);
  console.log(`Processing subtopic: ${data.slug} (${data.meta.title})`);

  // Build rendered HTML blocks
  const htmlBlocks = {};
  const rawBlocks = {
    answerFirst: data.answerFirst,
    table1: data.table1,
    chap1: data.chap1 || '',
    chap2: data.chap2 || '',
    chap3: data.chap3 || '',
    chap4: data.chap4 || '',
    chap5: data.chap5 || '',
    chap6: data.chap6 || ''
  };

  let subtopicChineseChars = 0;

  for (const k in rawBlocks) {
    if (!rawBlocks[k]) continue;
    subtopicChineseChars += countChineseCharacters(rawBlocks[k]);
    const rendered = mdToHtml(rawBlocks[k]);
    const opens = (rendered.match(/<div[\s>]/g) || []).length;
    const closes = (rendered.match(/<\/div>/g) || []).length;
    if (opens !== closes) {
      throw new Error(`CRITICAL TAG IMBALANCE in subtopic ${data.slug} block "${k}": ${opens} opens vs ${closes} closes!`);
    }
    htmlBlocks[k] = rendered;
  }

  // Add decision tree chars & faqs chars
  if (data.decisionTree) {
    data.decisionTree.forEach(d => {
      subtopicChineseChars += countChineseCharacters(d.title + d.steps.join(''));
    });
  }
  if (data.faqs) {
    data.faqs.forEach(f => {
      subtopicChineseChars += countChineseCharacters(f.question + f.answer);
    });
  }

  // Save json data for this subtopic
  const jsonPath = `src/data/subtopic_${data.slug}.json`;
  fs.writeFileSync(jsonPath, JSON.stringify(htmlBlocks, null, 2), 'utf8');
  console.log(`Saved ${jsonPath}`);

  // Build decision tree HTML inside Astro
  const decisionTreeSections = (data.decisionTree || []).map((b, idx) => {
    const colors = ['emerald', 'sky', 'amber', 'purple', 'rose'];
    const col = colors[idx % colors.length];
    return `
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-${col}-400 text-base mb-2">${b.title}</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                ${b.steps.map(s => `<li>${s}</li>`).join('\n                ')}
              </ol>
            </div>`;
  }).join('\n');

  // Astro template for this subtopic
  const astroContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumb from '../../components/common/Breadcrumb.astro';
import BrandCard from '../../components/cards/BrandCard.astro';
import BrandAffiliateCTA from '../../components/review/BrandAffiliateCTA.astro';
import FAQSection from '../../components/common/FAQSection.astro';
import { getFeaturedBrands, getTopBrands, brands } from '../../data/brands';
import contentData from '../../data/subtopic_${data.slug}.json';

const featuredBrand = getFeaturedBrands()[0] || brands[0]; // 光速云
const topBrands = getTopBrands(3);

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: '${data.meta.headline}',
  description: '${data.meta.description}',
  author: {
    '@type': 'Organization',
    name: 'v2rayn指南测评实验室',
    url: 'https://v2rayn.run/'
  },
  publisher: {
    '@type': 'Organization',
    name: 'v2rayn指南',
    logo: {
      '@type': 'ImageObject',
      url: 'https://v2rayn.run/favicon.webp'
    }
  },
  datePublished: '${data.meta.datePublished}',
  dateModified: '${data.meta.dateModified}',
  mainEntityOfPage: '${data.meta.canonical}'
};
---

<BaseLayout
  title="${data.meta.title}"
  description="${data.meta.description}"
  canonical="${data.meta.canonical}"
  schema={pageSchema}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Breadcrumb -->
    <Breadcrumb
      items={[
        { name: '资源与情报', href: '/resources/' },
        { name: '${data.meta.headline.split('：')[0]}' }
      ]}
    />

    <!-- Hero Header -->
    <header class="mt-4 mb-10 max-w-4xl">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3">
        <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
        资源与情报 专项实测指南 // 2026权威版
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        ${data.meta.headline}
      </h1>
      <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
        ${data.meta.description}
      </p>
    </header>

    <!-- Two-Column Main Layout: 8 cols content + 4 cols sticky sidebar -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      
      <!-- Left Column: Core Technical Content (8 cols) -->
      <div class="lg:col-span-8 space-y-12">

        <!-- Answer-First Summary Box -->
        <section id="answer-first" class="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-amber-500/20">
              ⚡
            </div>
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900">
                核心结论速览：Answer-First 核心直接结论与避坑要点
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-0.5">面向实际选型、排障与防坑的第一响应行动指引</p>
            </div>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed text-sm" set:html={contentData.answerFirst} />

          <div class="mt-6 pt-5 border-t border-amber-200/60">
            <h3 class="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
              核心参数与横向对比速查表
            </h3>
            <div set:html={contentData.table1} />
          </div>
        </section>

        <!-- Chapter 1 -->
        ${data.chap1 ? `
        <section id="chap-1" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={contentData.chap1} />
        </section>` : ''}

        <!-- Chapter 2 -->
        ${data.chap2 ? `
        <section id="chap-2" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={contentData.chap2} />
        </section>` : ''}

        <!-- Chapter 3 -->
        ${data.chap3 ? `
        <section id="chap-3" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={contentData.chap3} />
        </section>` : ''}

        <!-- Chapter 4 -->
        ${data.chap4 ? `
        <section id="chap-4" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={contentData.chap4} />
        </section>` : ''}

        <!-- Chapter 5 -->
        ${data.chap5 ? `
        <section id="chap-5" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={contentData.chap5} />
        </section>` : ''}

        <!-- Chapter 6 -->
        ${data.chap6 ? `
        <section id="chap-6" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={contentData.chap6} />
        </section>` : ''}

        <!-- Decision Tree Section -->
        <section id="decision-tree" class="bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div class="border-b border-slate-800 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block mb-1">DECISION MATRIX // ACTION PATHS</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              用户决策分支与最佳实操路线图
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">根据具体需求与网络症状，直接沿对应分支执行最优策略</p>
          </div>

          <div class="space-y-6 text-xs sm:text-sm font-mono leading-relaxed">
            ${decisionTreeSections}
          </div>
        </section>

        <!-- Exhaustive FAQ Section -->
        <section id="faq-section" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <FAQSection
            title="${data.meta.headline.split('：')[0]} 常见高频疑问权威解答 (FAQ)"
            headingLevel="h2"
            items={${JSON.stringify(data.faqs, null, 14).trim()}}
          />
        </section>

        <!-- Chapter Verified Backups (Affiliate CTA) -->
        <section id="verified-backups" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">VERIFIED PROVIDERS // DISASTER RECOVERY</span>
            <h2 class="text-2xl font-bold text-slate-900">
              测评实验室实测推荐高可用备用方案
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">经本站测评实验室连续 90 天网络稳定性跟踪，线路参数与真实带宽经事实审计</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <BrandCard brand={featuredBrand} />
            <BrandCard brand={topBrands[1] || topBrands[0]} />
          </div>

          <!-- Primary Brand Compliant Affiliate CTA -->
          <BrandAffiliateCTA
            brand={featuredBrand}
            customText="高可用备用专线首选：光速云（IEPL企业级双专线架构，年付折合¥8/月，提供一次性247GB斯诺克不过期永久包）"
          />

          <div class="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 space-y-1">
            <p><strong>合规与客观中立声明</strong>：本站部分链接包含推广推荐参数（Affiliate Links），用户通过链接注册可能为本站带来维护佣金，但绝不影响用户实付价格。评测结论基于真实采集数据，不因商业合作伪造测速排名。</p>
            <p>数据核准基准日：2026-11-18。网络工具仅用于跨境合法商务、科研与技术学习，请严格遵守当地法律法规。</p>
          </div>
        </section>

      </div>

      <!-- Right Column: Sticky Table of Contents & Navigation (4 cols) -->
      <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
        
        <!-- Sticky Table of Contents -->
        <div class="bg-white rounded-2xl border border-surface-border p-6 shadow-sm">
          <h3 class="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <svg class="w-4 h-4 text-brand-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
            <span>本页目录导航</span>
          </h3>

          <nav class="space-y-1.5 text-xs text-slate-600 font-medium">
            <a href="#answer-first" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 核心结论与横向对比表
            </a>
            ${data.chap1 ? `<a href="#chap-1" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">&bull; 第一部分：技术生态与背景</a>` : ''}
            ${data.chap2 ? `<a href="#chap-2" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">&bull; 第二部分：关键机理与攻防</a>` : ''}
            ${data.chap3 ? `<a href="#chap-3" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">&bull; 第三部分：实操方案与避坑</a>` : ''}
            ${data.chap4 ? `<a href="#chap-4" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">&bull; 第四部分：进阶工具与配置</a>` : ''}
            ${data.chap5 ? `<a href="#chap-5" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">&bull; 第五部分：环境审计与自查</a>` : ''}
            ${data.chap6 ? `<a href="#chap-6" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">&bull; 第六部分：抗风险容灾架构</a>` : ''}
            <a href="#decision-tree" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 用户决策分支路线图
            </a>
            <a href="#faq-section" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 常见高频疑问解答 (FAQ)
            </a>
            <a href="#verified-backups" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 实测高可用备用方案推荐
            </a>
          </nav>
        </div>

        <!-- Return to Resources Portal -->
        <div class="bg-gradient-to-br from-brand-50 to-indigo-50/50 rounded-2xl border border-brand-100 p-6 shadow-sm text-xs">
          <span class="font-bold text-brand-700 uppercase tracking-wider block mb-1">
            一级主题总门户
          </span>
          <h4 class="text-base font-bold text-slate-900 mb-2">资源与情报专著级知识库</h4>
          <p class="text-slate-600 leading-relaxed mb-4">
            查阅 1.3 万字专著级情报全景：跑路预警机制、订阅拉取全状态码自查、真实延时测速与合规底线。
          </p>
          <a
            href="/resources/"
            class="block w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-center shadow-md shadow-brand-500/20 transition-all"
          >
            返回资源与情报总览 &rarr;
          </a>
        </div>

        <!-- 31 Brands Database Fast Access -->
        <div class="bg-white rounded-2xl border border-surface-border p-5 shadow-sm text-xs">
          <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-1.5">
            <span class="w-1.5 h-4 bg-brand-600 rounded-full"></span>
            31家机场参数筛选库
          </h4>
          <p class="text-slate-500 leading-relaxed mb-3">
            已对全网 31 家主流服务商的线路、价格、优惠码与解锁状态完成事实审计，支持即时过滤。
          </p>
          <a
            href="/brands/"
            class="block w-full py-2.5 rounded-lg border border-slate-200 hover:border-brand-500 hover:text-brand-600 text-slate-700 font-semibold text-center transition-all"
          >
            打开品牌参数筛选器 &rarr;
          </a>
        </div>

      </aside>

    </div>
  </div>
</BaseLayout>
`;

  fs.writeFileSync(data.file, astroContent, 'utf8');
  console.log(`Successfully written ${data.file}`);
  console.log(`Estimated Substantive Chinese Characters: ${subtopicChineseChars}`);

  results.push({
    slug: data.slug,
    file: data.file,
    chars: subtopicChineseChars
  });
});

console.log(`\n========================================`);
console.log(`All 7 subtopics generated!`);
results.forEach(r => {
  console.log(`- ${r.slug}: ~${r.chars} pure Chinese characters -> ${r.file}`);
});
