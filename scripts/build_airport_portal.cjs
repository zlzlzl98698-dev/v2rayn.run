const fs = require('fs');
const path = require('path');
const { micromark } = require('micromark');
const { gfm, gfmHtml } = require('micromark-extension-gfm');
const baseChapters = require('./airport_monograph_text.cjs');
const extraChapters = require('./airport_monograph_text_extra.cjs');
const ch8_10 = require('./airport_monograph_text_ch8_10.cjs');
const airportFaqs = require('../src/data/airport_faqs.json');

function countChineseCharacters(text) {
  const matches = text.match(/[\u4e00-\u9fa5]/g);
  return matches ? matches.length : 0;
}

function mdToHtml(md) {
  let html = micromark(md, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()]
  });

  // Responsive Table wrapping with strict inline styles
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

const textBlocks = {};

textBlocks.answerFirst = baseChapters.answerFirst;
textBlocks.table1Overview = baseChapters.table1Overview;
textBlocks.chap1Content = baseChapters.chap1Content + '\n' + extraChapters.chap1_extra;
textBlocks.chap2Content = baseChapters.chap2Content + '\n' + extraChapters.chap2_extra;
textBlocks.chap3Content = baseChapters.chap3Content + '\n' + extraChapters.chap3_extra;
textBlocks.chap4Content = baseChapters.chap4Content + '\n' + extraChapters.chap4_extra;
textBlocks.chap5Content = baseChapters.chap5Content + '\n' + extraChapters.chap5_extra;
textBlocks.chap6Content = baseChapters.chap6Content + '\n' + extraChapters.chap6_extra + '\n' + ch8_10.chap6_extra2;
textBlocks.chap7Content = baseChapters.chap7Content + '\n' + extraChapters.chap7_extra;
textBlocks.chap8Content = ch8_10.chap8Content;
textBlocks.chap10Content = ch8_10.chap10Content;

let pureChineseCount = 0;
for (const k in textBlocks) {
  pureChineseCount += countChineseCharacters(textBlocks[k]);
}
console.log('Pure Chinese characters in Airport portal text blocks:', pureChineseCount);

// Convert each block to styled HTML and verify tag balance
const htmlBlocks = {};
for (const k in textBlocks) {
  const html = mdToHtml(textBlocks[k]);
  const opens = (html.match(/<div[\s>]/g) || []).length;
  const closes = (html.match(/<\/div>/g) || []).length;
  if (opens !== closes) {
    throw new Error(`CRITICAL TAG IMBALANCE in block "${k}": ${opens} opens vs ${closes} closes!`);
  }
  htmlBlocks[k] = html;
}
console.log('All Airport HTML blocks passed strict opening/closing tag balance validation!');

// Write json data
fs.writeFileSync('src/data/airport_content.json', JSON.stringify(htmlBlocks, null, 2), 'utf8');
console.log('Saved src/data/airport_content.json');

// Construct src/pages/airport/index.astro
const astroTemplate = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumb from '../../components/common/Breadcrumb.astro';
import BrandCard from '../../components/cards/BrandCard.astro';
import BrandAffiliateCTA from '../../components/review/BrandAffiliateCTA.astro';
import FAQSection from '../../components/common/FAQSection.astro';
import { getFeaturedBrands, getTopBrands, brands } from '../../data/brands';
import { navigationData } from '../../data/navigation';
import airportContent from '../../data/airport_content.json';
import airportFaqs from '../../data/airport_faqs.json';

const featuredBrand = getFeaturedBrands()[0] || brands[0]; // 光速云
const topBrands = getTopBrands(3);

const airportNav = navigationData.find(n => n.id === 'airport');
const subtopics = airportNav ? airportNav.items : [];

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: '机场推荐与网络代理全景指南：2026 专线架构、测速压测与避坑指南专著',
  description: 'v2rayn指南测评实验室权威出品：深度解析2026年商业机场物理链路架构、IEPL纯内网专线 vs 公网中转、晚高峰4K吞吐压测标准、流媒体与AI平台解锁矩阵、全场景选型决策树与31家品牌综合测评。',
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
  datePublished: '2026-10-18T08:00:00+08:00',
  dateModified: '2026-11-18T21:10:00+08:00',
  mainEntityOfPage: 'https://v2rayn.run/airport/'
};
---

<BaseLayout
  title="机场推荐与网络代理全景专著：2026 高速稳定节点与避坑全指南 | v2rayn指南"
  description="v2rayn指南测评实验室权威出品：深入剖析IEPL内网专线与公网中转拓扑差异、晚高峰4K/8K真实测速标准、流媒体/ChatGPT解锁矩阵、防跑路资金安全与全场景决策选型指南。"
  canonical="https://v2rayn.run/airport/"
  schema={pageSchema}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Breadcrumb -->
    <Breadcrumb items={[{ name: '机场推荐' }]} />

    <!-- Hero Header -->
    <header class="mt-4 mb-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-4">
        <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
        一级主题门户 // 专著级知识库
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        机场推荐与网络代理专著
      </h1>
      <p class="mt-4 text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
        系统解析 2026 年商业机场底层物理链路、晚高峰真实压测吞吐、流媒体与 AI 原生解锁矩阵、防跑路资金模型与全场景用户落地选型指引。
      </p>
    </header>

    <!-- Two-Column Main Layout: 8 cols content + 4 cols sticky sidebar -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      
      <!-- Left Column: Core Rich Technical Content (8 cols) -->
      <div class="lg:col-span-8 space-y-12">

        <!-- Answer-First Executive Summary Box -->
        <section id="answer-first" class="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-amber-500/20">
              ⚡
            </div>
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900">
                核心结论速览：2026 商业机场选型 30 秒速决决策法则
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-0.5">破除虚标节点数量与低价跑路营销谎言，提供真实可信的第一响应决策指引</p>
            </div>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed text-sm" set:html={airportContent.answerFirst} />

          <div class="mt-6 pt-5 border-t border-amber-200/60">
            <h3 class="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
              主流机场全维度横向技术指标与测试实测对比表
            </h3>
            <div set:html={airportContent.table1Overview} />
          </div>
        </section>

        <!-- Topic Matrix Section (7 Subtopics) -->
        <section id="topic-matrix" class="bg-slate-50 rounded-3xl border border-surface-border p-6 sm:p-8">
          <div class="border-b border-slate-200 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">TOPIC MATRIX // 7 SUBTOPICS</span>
            <h2 class="text-2xl font-bold text-slate-900">
              机场推荐 核心专题矩阵（7个二级专题）
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">涵盖综合推荐、排行天梯、性价比筛选、稳定专线、便宜备用、免费节点过渡与科学上网基础</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subtopics.map(t => (
              <a
                href={t.href}
                class="group flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-surface-border hover:border-brand-500 hover:shadow-md transition-all duration-200"
              >
                <div class="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  &rarr;
                </div>
                <div>
                  <h3 class="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {t.title}
                  </h3>
                  <p class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <!-- Chapter 1: Evolution of Protocols & Commercial Clusters -->
        <section id="airport-evolution-protocols" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 01 // PROTOCOL EVOLUTION</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第一章：科学上网技术演进全史与现代商业机场集群架构
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={airportContent.chap1Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/airport/guide/" class="text-brand-600 hover:underline">&bull; 科学上网原理全解</a>
              <a href="/clash/meta/" class="text-brand-600 hover:underline">&bull; Mihomo(Meta) 内核特性解析</a>
              <a href="/comparisons/v2ray-vs-clash/" class="text-brand-600 hover:underline">&bull; V2Ray vs Clash 架构对比</a>
            </div>
          </div>
        </section>

        <!-- Chapter 2: Physical Network Topology & Undersea Cables -->
        <section id="physical-transit-iepl" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 02 // PHYSICAL INFRASTRUCTURE</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第二章：物理链路拓扑大起底：公网中转 vs BGP入口 vs IEPL/IPLC 纯内网专线
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={airportContent.chap2Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/airport/stable/" class="text-brand-600 hover:underline">&bull; 稳定专线机场推荐</a>
              <a href="/comparisons/iepl-vs-iplc-vs-bgp-explained/" class="text-brand-600 hover:underline">&bull; IEPL vs IPLC vs BGP 底层光纤解析</a>
            </div>
          </div>
        </section>

        <!-- Chapter 3: Industry Dark Patterns & Runaway Forensics -->
        <section id="industry-dark-patterns" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 03 // INDUSTRY PITFALLS & FORENSICS</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第三章：机场行业黑幕、跑路前兆深度取证与五大危险信号识别
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={airportContent.chap3Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/resources/warning/" class="text-brand-600 hover:underline">&bull; 机场跑路预警系统</a>
              <a href="/resources/risk-intel/" class="text-brand-600 hover:underline">&bull; 风险情报与倒闭追踪</a>
            </div>
          </div>
        </section>

        <!-- Chapter 4: Stress Testing & 24H Automated Monitoring -->
        <section id="peak-stress-testing" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 04 // STRESS BENCHMARKING</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第四章：晚高峰 4K/8K 压测标准、链路诊断与 24 小时自动化监控实战
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={airportContent.chap4Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/airport/ranking/" class="text-brand-600 hover:underline">&bull; 机场测速与质量天梯排行</a>
              <a href="/resources/node-check/" class="text-brand-600 hover:underline">&bull; 节点连通率与真延迟检测</a>
            </div>
          </div>
        </section>

        <!-- Chapter 5: Residential IP & Media/AI Unlock Defense -->
        <section id="residential-ip-media-unlock" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 05 // IP REPUTATION & UNLOCK</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第五章：原生住宅 IP vs 机房广播 IP：流媒体与生产力 AI 解锁深度矩阵
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={airportContent.chap5Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/airport/recommend/" class="text-brand-600 hover:underline">&bull; 优质流媒体解锁机场精选</a>
              <a href="/vpn/comparison/" class="text-brand-600 hover:underline">&bull; 专线代理与传统VPN性能对比</a>
            </div>
          </div>
        </section>

        <!-- Chapter 6: Billing Models, TCO & Consumer Protection -->
        <section id="cost-models-tco" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 06 // COST EFFICIENCY & TCO</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第六章：机场套餐计费模型、三年 TCO 量化数学公式与充值续费应急避坑
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={airportContent.chap6Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/airport/cost-effective/" class="text-brand-600 hover:underline">&bull; 高性价比机场推荐</a>
              <a href="/airport/cheap/" class="text-brand-600 hover:underline">&bull; 便宜低价平民机场甄选</a>
              <a href="/airport/free/" class="text-brand-600 hover:underline">&bull; 免费节点与白嫖风险</a>
            </div>
          </div>
        </section>

        <!-- Chapter 7: Disaster Recovery HA & Subscription Plugins -->
        <section id="disaster-recovery-ha" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 07 // HIGH AVAILABILITY & CONFIG</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第七章：双机场跨服务商容灾互备、订阅清洗与自动化规则插件实战
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={airportContent.chap7Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/clash/verge-subscription/" class="text-brand-600 hover:underline">&bull; Clash 订阅导入与配置</a>
              <a href="/resources/subscription-issues/" class="text-brand-600 hover:underline">&bull; 订阅无法拉取与故障排查</a>
            </div>
          </div>
        </section>

        <!-- Chapter 8: Decision Tree Section -->
        <section id="decision-tree-path" class="bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div class="border-b border-slate-800 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block mb-1">DECISION LOGIC // ACTION PATHS</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              第八章：五大核心使用场景决策树与落地执行路径
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">根据具体网络业务与设备场景，直接沿对应分支执行最高性价比策略</p>
          </div>

          <div class="prose prose-invert max-w-none text-slate-300 leading-relaxed" set:html={airportContent.chap8Content} />
        </section>

        <!-- Chapter 9: 12 FAQs -->
        <section id="faq">
          <FAQSection
            title="第九章：机场选型、使用与风控 12 大高频疑问与边界案例深度 FAQ"
            headingLevel="h2"
            items={airportFaqs}
          />
        </section>

        <!-- Chapter 10: Verified Providers & Feature Guangsu Cloud -->
        <section id="verified-providers" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 10 // VERIFIED BENCHMARKS</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第十章：严选服务商评测矩阵与光速云专属评测与配置建议
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">经实验室长期压测与稳定性实证的高标准商业机场推荐</p>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed mb-6" set:html={airportContent.chap10Content} />

          <!-- Affiliate CTA: 光速云 -->
          <div class="mt-8">
            <BrandAffiliateCTA
              brand={featuredBrand}
              customText="光速云作为实验室多季度实测的高分服务商，标配企业级 IEPL 纯内网专线与多地 BGP 动态入口，晚高峰 4K 极速秒开、不卡顿、不失联。支持月付与 24 小时退款保障，非常适合追求极致稳定与省心的用户。"
            />
          </div>
        </section>

      </div>

      <!-- Right Column: Sticky Navigation & Brand Matrix (4 cols) -->
      <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
        
        <!-- Table of Contents Card -->
        <div class="bg-white rounded-2xl border border-surface-border p-5 shadow-sm">
          <h3 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>本专著内容快速索引</span>
            <span class="text-brand-600 font-bold">10 大核心篇章</span>
          </h3>
          <nav class="space-y-1.5 text-xs">
            <a href="#answer-first" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors font-medium">
              &bull; 核心结论与 30 秒速决指南
            </a>
            <a href="#topic-matrix" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors font-medium">
              &bull; 7 大核心二级专题矩阵
            </a>
            <a href="#airport-evolution-protocols" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors">
              01. 科学上网协议演进与现代集群
            </a>
            <a href="#physical-transit-iepl" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors">
              02. 物理链路拓扑与 IEPL 内网专线
            </a>
            <a href="#industry-dark-patterns" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors">
              03. 行业黑幕与跑路前兆深度取证
            </a>
            <a href="#peak-stress-testing" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors">
              04. 晚高峰压测与 24H 自动化监控
            </a>
            <a href="#residential-ip-media-unlock" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors">
              05. 原生住宅 IP 与流媒体/AI 解锁
            </a>
            <a href="#cost-models-tco" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors">
              06. 计费模型、三年 TCO 与充值避坑
            </a>
            <a href="#disaster-recovery-ha" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors">
              07. 跨服务商双专线容灾互备实战
            </a>
            <a href="#decision-tree-path" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors font-semibold text-sky-600">
              08. 五大核心场景决策树与落地图
            </a>
            <a href="#faq" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors font-medium">
              09. 12 大高频疑问与边界案例 FAQ
            </a>
            <a href="#verified-providers" class="block py-1 px-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors font-semibold text-emerald-600">
              10. 严选评测矩阵与光速云专属评测
            </a>
          </nav>
        </div>

        <!-- 7 Subtopics Direct Access -->
        <div class="bg-slate-50 rounded-2xl border border-surface-border p-5">
          <h3 class="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-3">
            机场推荐 7 大二级子专题
          </h3>
          <div class="space-y-2">
            {subtopics.map(sub => (
              <a
                href={sub.href}
                class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/60 hover:border-brand-400 hover:shadow-xs transition-all text-xs"
              >
                <span class="font-bold text-slate-800">{sub.title}</span>
                <span class="text-slate-400 text-xxs font-mono">&rarr;</span>
              </a>
            ))}
          </div>
        </div>

        <!-- 31 Brands Database Fast Access -->
        <div class="bg-white rounded-2xl border border-surface-border p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              全收录服务商库（31家品牌）
            </h3>
            <span class="text-xxs px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 font-bold">全网实测</span>
          </div>
          <div class="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
            {brands.map(b => (
              <a
                href={\`/reviews/\${b.id}/\`}
                class="p-2 rounded-lg border border-slate-100 hover:border-brand-300 hover:bg-brand-50/50 transition-colors text-xs text-slate-700 truncate block font-medium"
              >
                {b.name}
              </a>
            ))}
          </div>
        </div>

      </aside>

    </div>
  </div>
</BaseLayout>
`;

fs.writeFileSync('src/pages/airport/index.astro', astroTemplate, 'utf8');
console.log('Successfully wrote src/pages/airport/index.astro');
