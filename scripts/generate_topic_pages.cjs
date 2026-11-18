const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  'src/pages/airport',
  'src/pages/vpn',
  'src/pages/clash',
  'src/pages/resources'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Primary Nav Data
const primaryNavs = [
  {
    id: 'airport',
    title: '机场推荐',
    tagline: '2026年高可用中文机场客观实测与选型中心',
    desc: '从IEPL企业内网专线、流媒体4K解锁到晚高峰低延迟表现，汇聚31家主流机场客观评测与套餐对比。',
    cover: '/images/covers/airport.svg',
    topics: [
      { slug: 'recommend', title: '机场推荐', kw: '机场推荐', desc: '2026年经过实测筛选的高可用综合机场推荐与选择指南' },
      { slug: 'ranking', title: '机场排行', kw: '机场排行', desc: '按专线质量、晚高峰带宽、延迟与流媒体解锁综合评分榜单' },
      { slug: 'cost-effective', title: '性价比机场', kw: '性价比机场', desc: '兼顾专线速度与亲民价格的高性价比机场套餐横向对比' },
      { slug: 'stable', title: '稳定机场', kw: '稳定机场', desc: '主打IEPL/IPLC企业内网专线、敏感期不失联的稳定机场' },
      { slug: 'cheap', title: '便宜机场', kw: '便宜机场', desc: '低至5-10元/月的平民入门与大流量轻量备用机场甄选' },
      { slug: 'free', title: '免费梯子', kw: '免费梯子', desc: '免费科学上网工具现状、白嫖节点风险解析与安全过渡指南' },
      { slug: 'guide', title: '科学上网', kw: '科学上网', desc: '网络协议、基础拓扑、加密原理与合规安全访问常识全景' }
    ]
  },
  {
    id: 'vpn',
    title: 'VPN 与加速器',
    tagline: '商用VPN与跨国网络加速工具客观横向测评',
    desc: '系统对比传统商用VPN、专线网络加速器与私有代理在隐私加密、连通率及抗封锁维度的差异。',
    cover: '/images/covers/vpn.svg',
    topics: [
      { slug: 'recommend', title: 'VPN 推荐', kw: 'VPN 推荐', desc: '全球主流商业VPN与跨境网络加速服务的客观实测推荐' },
      { slug: 'free', title: '免费 VPN', kw: '免费 VPN', desc: '常见免费VPN的盈利模式、隐私日志风险与实用限额版本评测' },
      { slug: 'mobile', title: '手机 VPN', kw: '手机 VPN', desc: 'iOS与Android移动端免折腾、一键连接的轻量加速工具' },
      { slug: 'reviews', title: 'VPN 软件评测', kw: 'VPN 软件评测', desc: 'ExpressVPN、NordVPN、Surfshark等主流客户端全面评测' },
      { slug: 'accelerator', title: 'VPN 加速器', kw: 'VPN 加速器', desc: '面向海外回国、跨境游戏与海淘购物的专项加速方案' },
      { slug: 'comparison', title: '加速器对比', kw: '加速器对比', desc: '专线代理 vs 传统商用VPN协议在延迟、速度与抗封锁上的对比' },
      { slug: 'best', title: '好用的 VPN', kw: '好用的 VPN', desc: '针对国内网络环境能够真实稳定连通的高可用VPN精选' }
    ]
  },
  {
    id: 'clash',
    title: 'Clash 客户端',
    tagline: 'Clash Verge Rev、Mihomo内核与全平台客户端生态',
    desc: '提供Windows、macOS、Android、iOS全系统官方安全下载源、分流规则配置、TUN模式与故障排查。',
    cover: '/images/covers/clash.svg',
    topics: [
      { slug: 'recommend', title: 'Clash 推荐', kw: 'Clash 推荐', desc: 'Windows、macOS、Android及iOS各平台首选Clash系列客户端推荐' },
      { slug: 'verge', title: 'Clash Verge', kw: 'Clash Verge', desc: '现代开源Clash Verge Rev客户端功能全解析与界面设置' },
      { slug: 'verge-download', title: 'Clash Verge 下载', kw: 'Clash Verge 下载', desc: '官方安全下载源、Windows/Mac各架构安装包与避坑验证' },
      { slug: 'verge-subscription', title: 'Clash Verge 订阅', kw: 'Clash Verge 订阅', desc: '机场订阅链接导入、自动更新设置与自建配置规则管理' },
      { slug: 'meta', title: 'Clash Meta', kw: 'Clash Meta', desc: 'Mihomo (Clash.Meta) 内核进阶特性、VLESS与sing-box协议支持' },
      { slug: 'tutorial', title: 'Clash 使用教程', kw: 'Clash 使用教程', desc: '从零开始的分流策略组、TUN虚拟网卡模式与系统代理全步骤图文' },
      { slug: 'troubleshooting', title: 'Clash 故障排查', kw: 'Clash 故障排查', desc: '无法连接、端口占用、DNS污染、节点超时与证书报错彻底排查' }
    ]
  },
  {
    id: 'resources',
    title: '资源与情报',
    tagline: '网络节点检测、跑路预警与防坑应急知识库',
    desc: '追踪最新跑路风险动态、节点防投毒安全隔离、订阅拉取故障诊断与零基础新手入门避坑指南。',
    cover: '/images/covers/resources.svg',
    topics: [
      { slug: 'free-nodes', title: '免费节点', kw: '免费节点', desc: '公共免费V2Ray/Clash节点获取渠道、存活率与安全隔离技巧' },
      { slug: 'warning', title: '跑路预警', kw: '跑路预警', desc: '机场跑路前兆识别、年付风险防范、退费难维权与备用应急策略' },
      { slug: 'faq', title: '机场 FAQ', kw: '机场 FAQ', desc: '关于协议、倍率、重置日、原生IP、退款政策的高频问答全集' },
      { slug: 'risk-intel', title: '机场风险情报', kw: '机场风险情报', desc: '行业动态追踪、线路封锁警报、同系机场关联与真实存活报告' },
      { slug: 'node-check', title: '节点检测', kw: '节点检测', desc: '真连接延迟测速、TCP阻断排查、流媒体解锁自动化检测工具' },
      { slug: 'subscription-issues', title: '订阅问题', kw: '订阅问题', desc: '订阅链接无法拉取、404/500错误、base64解码失败综合解决方案' },
      { slug: 'beginner', title: '新手帮助', kw: '新手帮助', desc: '第一次翻墙零基础扫盲：从选择客户端到导入订阅的完整闭环' }
    ]
  }
];

// 1. Generate 4 Primary Index Pages
primaryNavs.forEach(nav => {
  const pagePath = `src/pages/${nav.id}/index.astro`;
  const code = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumb from '../../components/common/Breadcrumb.astro';
import TopicCard from '../../components/cards/TopicCard.astro';
import BrandCard from '../../components/cards/BrandCard.astro';
import ArticleCard from '../../components/cards/ArticleCard.astro';
import FAQSection from '../../components/common/FAQSection.astro';
import { getTopBrands } from '../../data/brands';
import { getCollection } from 'astro:content';

const topBrands = getTopBrands(3);
const allArticles = await getCollection('articles');
const relatedPosts = allArticles.filter(a => a.data.category === '${nav.id}').slice(0, 3);
---

<BaseLayout
  title="${nav.title} - ${nav.tagline} | v2rayn指南"
  description="${nav.desc}"
  canonical="https://v2rayn.run/${nav.id}/"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Breadcrumb -->
    <Breadcrumb items={[{ name: '${nav.title}' }]} />

    <!-- Hero Header -->
    <header class="my-6">
      <div class="max-w-3xl">
        <span class="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wider">
          一级主题门户
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
          ${nav.title}
        </h1>
        <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
          ${nav.desc}
        </p>
      </div>
    </header>

    <!-- 7 Secondary Topics Grid -->
    <section class="my-10">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span class="w-1.5 h-5 rounded-full bg-brand-600"></span>
          ${nav.title} 核心专题矩阵 (7个二级专题)
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${nav.topics.map(t => `
        <TopicCard
          title="${t.title}"
          description="${t.desc}"
          href="/${nav.id}/${t.slug}/"
          badge="专题实测"
        />
        `).join('')}
      </div>
    </section>

    <!-- Featured Brands for this category -->
    <section class="my-16 bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
      <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <span class="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">RECOMMENDED AIRPORTS</span>
          <h2 class="text-2xl font-bold text-slate-900">
            ${nav.title} 重点推荐梯队
          </h2>
        </div>
        <a href="/brands/" class="text-xs font-bold text-brand-600 hover:underline">
          查看完整31家品牌库 &rarr;
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topBrands.map((b) => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- FAQ -->
    <FAQSection
      title="${nav.title} 核心常见问题"
      items={[
        {
          question: "如何挑选最适合我的${nav.title}方案？",
          answer: "首先明确您的核心使用场景：如看4K视频与追剧，优先看单节点带宽吞吐与流媒体解锁；如外贸与科研，优先看丢包率与IP干净度；其次建议首选月付测试晚高峰稳定性后再长期使用。"
        },
        {
          question: "${nav.title}在使用过程中遇到故障如何快速排查？",
          answer: "先核实客户端系统时间是否与北京时间精准同步（误差在1分钟以内），其次在客户端执行更新订阅拉取最新节点，最后检查TUN模式或系统代理开关是否正常。"
        }
      ]}
    />
  </div>
</BaseLayout>
`;

  fs.writeFileSync(pagePath, code, 'utf8');
  console.log(`Created primary page: ${pagePath}`);
});

// 2. Generate 28 Secondary Topic Pages
primaryNavs.forEach(nav => {
  nav.topics.forEach(t => {
    const pagePath = `src/pages/${nav.id}/${t.slug}.astro`;
    const code = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumb from '../../components/common/Breadcrumb.astro';
import BrandCard from '../../components/cards/BrandCard.astro';
import BrandAffiliateCTA from '../../components/review/BrandAffiliateCTA.astro';
import FAQSection from '../../components/common/FAQSection.astro';
import { brands, getFeaturedBrands, getTopBrands } from '../../data/brands';

const featuredBrand = getFeaturedBrands()[0] || brands[0]; // 光速云
const topBrands = getTopBrands(3);

const topicSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '${t.title}：2026年客观实测与选型指南',
  description: '${t.desc}',
  url: 'https://v2rayn.run/${nav.id}/${t.slug}/',
};
---

<BaseLayout
  title="${t.title} - 2026客观实测与选型指南 | v2rayn指南"
  description="${t.desc}。v2rayn指南通过独立节点晚高峰测速、参数对比与避坑要点，为您提供${t.kw}权威参考。"
  canonical="https://v2rayn.run/${nav.id}/${t.slug}/"
  schema={topicSchema}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Breadcrumb -->
    <Breadcrumb
      items={[
        { name: '${nav.title}', href: '/${nav.id}/' },
        { name: '${t.title}' }
      ]}
    />

    <!-- Header Section -->
    <header class="my-6 max-w-4xl">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
          ${nav.title} 核心专题
        </span>
        <span class="text-xs text-slate-400">·</span>
        <span class="text-xs text-emerald-600 font-semibold">2026 实测核验</span>
      </div>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
        ${t.title}：2026年客观实测与选型指南
      </h1>

      <!-- Answer-First Box -->
      <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 border border-brand-200/80 text-slate-700 text-sm sm:text-base leading-relaxed mb-8 shadow-sm">
        <div class="flex items-center gap-2 font-bold text-brand-800 text-base mb-2">
          <svg class="w-5 h-5 text-brand-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          Answer-First 核心直接结论
        </div>
        <p>
          在选择 <strong>${t.kw}</strong> 时，首要考量是 <strong>晚高峰物理链路的抗抖动能力</strong> 与 <strong>协议现代化程度</strong>。
          实测数据表明，采用 IEPL 企业内网专线并支持 VLESS 协议的服务商在敏感期具有压倒性连通优势。
          强烈建议新用户遵循「小额月付起步、晚高峰测速验证、满意后再考虑年付」的三步法决策。
        </p>
      </div>
    </header>

    <!-- Main Content & Clusters Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      <!-- Left Content (8 cols) -->
      <div class="lg:col-span-8 space-y-8">
        
        <!-- Cluster 1: Core Methodology -->
        <section class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span class="w-1.5 h-5 rounded-full bg-brand-600"></span>
            一、${t.title} 核心评测维度与选型指标
          </h2>

          <div class="prose-custom max-w-none text-slate-600 space-y-4">
            <p>
              针对 <strong>${t.kw}</strong>，我们实验室建立了四个维度的量化评估体系：
            </p>
            <ul>
              <li><strong>晚高峰吞吐率 (Throughput)</strong>：在 20:00-23:00 骨干公网最高峰时段的有效可用带宽，能否保障 4K@60fps 无缓冲秒开；</li>
              <li><strong>持续连接抖动 (Jitter & Latency)</strong>：上海/广州入口到香港/东京落地节点的延迟波动是否低于 5ms，丢包率是否稳定在 0%；</li>
              <li><strong>流媒体与 AI 工具适配 (Availability)</strong>：对 ChatGPT、Claude、Netflix、Disney+ 的原生 IP 解锁与抗风控表现；</li>
              <li><strong>售后与运营存活周期 (Reliability)</strong>：是否具备 2 年以上连续稳定运营历史，工单响应是否在合理工作时间内。</li>
            </ul>
          </div>
        </section>

        <!-- Cluster 2: Recommended Brand Matrix in Topic -->
        <section class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span class="w-1.5 h-5 rounded-full bg-brand-600"></span>
            二、精选推荐梯队 (实测榜单)
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrandCard brand={featuredBrand} />
            <BrandCard brand={topBrands[1] || topBrands[0]} />
          </div>
        </section>

        <!-- Primary Brand CTA -->
        <BrandAffiliateCTA
          brand={featuredBrand}
          customText="${t.title}实测首推标杆：光速云（IEPL双专线架构，年付折合约¥8/月，斯诺克247G永久套餐）"
        />

        <!-- Section 3: Step-by-Step & FAQ -->
        <FAQSection
          title="${t.title} 重点解答"
          items={[
            {
              question: "2026年 ${t.kw} 最容易踩的坑是什么？",
              answer: "最常见的坑是被所谓「超大流量超低价年付」所吸引。很多小机场以极低价格预收数年费用后，由于专线成本过高无法支撑导致跑路。牢记月付体验永远优于盲目年付。"
            },
            {
              question: "使用 ${t.kw} 时，如何挑选延迟最低的节点？",
              answer: "建议在客户端内点击「连通性测试」按延迟排序。通常华南沿海地区连接香港节点延迟最低（15-30ms），华东地区连接日本节点最佳（35-50ms），华北地区连接韩国或日本节点更佳。"
            },
            {
              question: "节点显示超时无法使用，如何排查？",
              answer: "请核对本机系统时间是否准确（时间差超过90秒会阻断TLS握手），并在客户端中点击更新订阅拉取最新可用节点列表。"
            }
          ]}
        />

      </div>

      <!-- Right Sidebar (4 cols) -->
      <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
        
        <div class="bg-white rounded-2xl border border-surface-border p-6 shadow-sm">
          <h4 class="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span class="w-1.5 h-4 bg-brand-600 rounded-full"></span>
            ${nav.title} 其他精选专题
          </h4>
          <div class="space-y-1.5 text-xs">
            ${nav.topics.filter(item => item.slug !== t.slug).map(item => `
            <a href="/${nav.id}/${item.slug}/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; ${item.title} 指南
            </a>
            `).join('')}
          </div>
        </div>

        <div class="bg-gradient-to-br from-brand-50 to-blue-50/50 rounded-2xl border border-brand-100 p-5 shadow-sm text-xs">
          <span class="font-bold text-brand-700 uppercase tracking-wider block mb-1">
            客观数据库索引
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

    fs.writeFileSync(pagePath, code, 'utf8');
    console.log(`Created secondary topic page: ${pagePath}`);
  });
});

console.log('Successfully generated all 4 primary and 28 secondary topic pages!');
