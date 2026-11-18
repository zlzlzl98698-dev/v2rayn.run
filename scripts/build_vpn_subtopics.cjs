const fs = require('fs');
const path = require('path');
const { micromark } = require('micromark');
const { gfm, gfmHtml } = require('micromark-extension-gfm');
const { navigationData } = require('../src/data/navigation.ts');

function countChineseCharacters(text) {
  const matches = text.match(/[\u4e00-\u9fa5]/g);
  return matches ? matches.length : 0;
}

function mdToHtml(md) {
  let html = micromark(md, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()]
  });

  // Responsive Table wrapping with explicit inline style guarantees
  html = html.replace(/<table>/g, '<div class="table-responsive-wrapper overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm" style="overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch;"><table class="w-full text-left text-sm border-collapse" style="min-width: 680px;">');
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

  // Inline Code with break-all
  html = html.replace(/<code>/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-brand-600 font-mono text-xs break-all">');

  // Alerts
  html = html.replace(/<blockquote>\s*<p>\[!CAUTION\]/g, '<blockquote class="border-l-4 border-rose-500 pl-4 py-2 my-4 bg-rose-50/70 rounded-r-xl text-rose-900 text-sm"><p class="font-bold text-rose-700 mb-1">⚠️ 高危警告与安全红线</p><p>');
  html = html.replace(/<blockquote>\s*<p>\[!WARNING\]/g, '<blockquote class="border-l-4 border-amber-500 pl-4 py-2 my-4 bg-amber-50/70 rounded-r-xl text-amber-900 text-sm"><p class="font-bold text-amber-700 mb-1">⚠️ 注意与避坑提示</p><p>');
  html = html.replace(/<blockquote>\s*<p>\[!IMPORTANT\]/g, '<blockquote class="border-l-4 border-brand-500 pl-4 py-2 my-4 bg-brand-50/70 rounded-r-xl text-brand-900 text-sm"><p class="font-bold text-brand-700 mb-1">ℹ️ 核心要点</p><p>');
  // Blockquotes
  html = html.replace(/<blockquote>/g, '<blockquote class="border-l-4 border-brand-500 pl-4 py-2 my-4 bg-brand-50/50 rounded-r-xl text-slate-700 italic">');

  // Bold
  html = html.replace(/<strong>/g, '<strong class="font-bold text-slate-900">');

  return html;
}

const subtopicFiles = [
  'recommend.cjs',
  'free.cjs',
  'mobile.cjs',
  'reviews.cjs',
  'accelerator.cjs',
  'comparison.cjs',
  'best.cjs'
];

const vpnNav = navigationData.find(n => n.id === 'vpn');
const allSubtopics = vpnNav ? vpnNav.items : [];

let totalChineseAllSubtopics = 0;
const results = [];

subtopicFiles.forEach(file => {
  const filePath = path.join(__dirname, 'vpn_subtopics_data', file);
  const data = require(filePath);

  console.log(`\n================ Processing: ${data.slug} (${data.meta.headline}) ================`);

  // Parse HTML blocks
  const htmlBlocks = {};
  htmlBlocks.answerFirst = mdToHtml(data.answerFirst);
  htmlBlocks.table1 = mdToHtml(data.table1);
  if (data.chap1) htmlBlocks.chap1 = mdToHtml(data.chap1);
  if (data.chap2) htmlBlocks.chap2 = mdToHtml(data.chap2);
  if (data.chap3) htmlBlocks.chap3 = mdToHtml(data.chap3);
  if (data.chap4) htmlBlocks.chap4 = mdToHtml(data.chap4);
  htmlBlocks.faqs = data.faqs;

  // Tag balance validation for each HTML block
  for (const k in htmlBlocks) {
    if (k === 'faqs') continue;
    const html = htmlBlocks[k];
    const opens = (html.match(/<div[\s>]/g) || []).length;
    const closes = (html.match(/<\/div>/g) || []).length;
    if (opens !== closes) {
      throw new Error(`CRITICAL TAG IMBALANCE in subtopic ${data.slug} block ${k}: ${opens} opens vs ${closes} closes!`);
    }
  }

  // Save parsed content JSON
  const jsonPath = path.join('src', 'data', 'vpn_subtopics', `${data.slug}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(htmlBlocks, null, 2), 'utf8');
  console.log(`Saved ${jsonPath}`);

  // Count Pure Chinese characters
  let textToCount = data.answerFirst + '\n' + data.table1;
  if (data.chap1) textToCount += '\n' + data.chap1;
  if (data.chap2) textToCount += '\n' + data.chap2;
  if (data.chap3) textToCount += '\n' + data.chap3;
  if (data.chap4) textToCount += '\n' + data.chap4;
  if (data.decisionTree) {
    data.decisionTree.forEach(d => {
      textToCount += '\n' + d.title + '\n' + d.steps.join('\n');
    });
  }
  data.faqs.forEach(f => {
    textToCount += '\n' + f.question + '\n' + f.answer;
  });
  const subtopicPureChinese = countChineseCharacters(textToCount);
  totalChineseAllSubtopics += subtopicPureChinese;
  console.log(`Subtopic "${data.slug}" Pure Chinese Characters: ${subtopicPureChinese}`);
  results.push({ slug: data.slug, count: subtopicPureChinese });

  // Generate Decision Tree HTML
  const decisionTreeSections = (data.decisionTree || []).map((b, idx) => {
    const colors = ['emerald', 'sky', 'amber', 'purple', 'rose'];
    const c = colors[idx % colors.length];
    return `
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-${c}-400 text-base mb-2">${b.title}</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                ${b.steps.map(s => `<li>${s}</li>`).join('\n                ')}
              </ol>
            </div>`;
  }).join('\n');

  // Related sibling subtopics (filter out current subtopic)
  const siblingSubtopics = allSubtopics.filter(s => !s.href.includes(`/${data.slug}/`));
  const relatedSubtopicsHTML = siblingSubtopics.map(r => `
            <a href="${r.href}" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; ${r.title} 指南
            </a>`).join('');

  // Astro Template
  const astroTemplate = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumb from '../../components/common/Breadcrumb.astro';
import BrandCard from '../../components/cards/BrandCard.astro';
import BrandAffiliateCTA from '../../components/review/BrandAffiliateCTA.astro';
import FAQSection from '../../components/common/FAQSection.astro';
import { brands, getFeaturedBrands, getTopBrands } from '../../data/brands';
import contentData from '../../data/vpn_subtopics/${data.slug}.json';

const featuredBrand = getFeaturedBrands()[0] || brands[0]; // 光速云
const topBrands = getTopBrands(3);

const topicSchema = {
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
  schema={topicSchema}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Breadcrumb -->
    <Breadcrumb
      items={[
        { name: 'VPN 与加速器', href: '/vpn/' },
        { name: '${data.meta.headline.split('：')[0]}' }
      ]}
    />

    <!-- Header Section -->
    <header class="my-6 max-w-4xl">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
          VPN 与加速器 // 深度专题
        </span>
        <span class="text-xs text-slate-400">&bull;</span>
        <span class="text-xs text-emerald-600 font-semibold">2026 深度实测</span>
      </div>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
        ${data.meta.headline}
      </h1>
      <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
        ${data.meta.description}
      </p>
    </header>

    <!-- Main Content & Layout (8 cols + 4 cols sidebar) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      
      <!-- Left Content (8 cols) -->
      <div class="lg:col-span-8 space-y-10">
        
        <!-- Answer-First Box -->
        <section id="answer-first" class="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-amber-500/20">
              ⚡
            </div>
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900">
                核心结论速览：Answer-First 核心直接结论与实战避坑
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-0.5">面向实际选型、深度配置与排障的第一响应行动指引</p>
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

        <!-- Decision Tree Section -->
        <section id="decision-tree" class="bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div class="border-b border-slate-800 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block mb-1">DECISION MATRIX // ACTION PATHS</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              用户决策分支与最佳实操路线图
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">根据具体需求与网络环境，直接沿对应分支执行最优策略</p>
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
            items={contentData.faqs}
          />
        </section>

        <!-- Chapter Verified Backups (Affiliate CTA) -->
        <section id="verified-backups" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">VERIFIED PROVIDERS // DISASTER RECOVERY</span>
            <h2 class="text-2xl font-bold text-slate-900">
              测评实验室实测推荐高可用配置方案
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
            customText="${data.recommendedBrandCustomText}"
          />

          <div class="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 space-y-1">
            <p><strong>合规与客观中立声明</strong>：本站部分链接包含推广推荐参数（Affiliate Links），用户通过链接注册可能为本站带来维护佣金，但绝不影响用户实付价格。评测结论基于真实采集数据，不因商业合作伪造测速排名。</p>
            <p>数据核准基准日：2026-11-18。网络工具仅用于跨境合法商务、科研与技术学习，请严格遵守当地法律法规。</p>
          </div>
        </section>

      </div>

      <!-- Right Sidebar (4 cols) -->
      <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
        
        <!-- Parent Topic Portal Direct Link -->
        <div class="bg-white rounded-2xl border border-surface-border p-6 shadow-sm">
          <span class="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
            一级主题门户
          </span>
          <h4 class="text-base font-bold text-slate-900 mb-2">
            VPN 与加速器 综合知识库
          </h4>
          <p class="text-xs text-slate-500 leading-relaxed mb-4">
            返回 VPN 与加速器一级门户，查看 10 大系统化专著章节、DPI 原理与 31 家品牌总览。
          </p>
          <a
            href="/vpn/"
            class="block w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-center text-xs shadow-sm transition-colors"
          >
            &larr; 返回 VPN 与加速器 门户
          </a>
        </div>

        <!-- Sibling Subtopics Navigation -->
        <div class="bg-white rounded-2xl border border-surface-border p-6 shadow-sm">
          <h4 class="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="w-1.5 h-4 bg-brand-600 rounded-full"></span>
            VPN 与加速器 关联精选专题
          </h4>
          <div class="space-y-1.5 text-xs">
            ${relatedSubtopicsHTML}
          </div>
        </div>

        <!-- 31 Brands Database Fast Access -->
        <div class="bg-gradient-to-br from-brand-50 to-blue-50/50 rounded-2xl border border-brand-100 p-5 shadow-sm text-xs">
          <span class="font-bold text-brand-700 uppercase tracking-wider block mb-1">
            客观数据库索引中心
          </span>
          <p class="text-slate-600 leading-relaxed mb-3">
            想按协议、客户端或特定价格自由组合筛选？访问本站 31 家机场品牌实时数据库。
          </p>
          <a
            href="/brands/"
            class="block w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-center shadow-sm transition-colors"
          >
            打开品牌参数筛选器 &rarr;
          </a>
        </div>

      </aside>

    </div>
  </div>
</BaseLayout>
`;

  fs.writeFileSync(data.file, astroTemplate, 'utf8');
  console.log(`Generated Astro page: ${data.file}`);
});

console.log('\n================ ALL VPN SUBTOPICS PROCESSED ================');
console.log('Results breakdown:');
results.forEach(r => console.log(`- ${r.slug}: ${r.count} pure Chinese characters`));
console.log(`GRAND TOTAL Pure Chinese Characters across 7 VPN Subtopics: ${totalChineseAllSubtopics}`);
