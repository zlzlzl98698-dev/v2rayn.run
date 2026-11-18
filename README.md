# 🚀 v2rayn.run // v2rayn指南测评实验室

<p align="center">
  <img src="public/images/avatar.webp" alt="v2rayn指南 Logo" width="100" height="100" style="border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" />
</p>

<p align="center">
  <strong>客观实测 · 拒绝虚标 · 电信级网络工具与机场评测知识库</strong>
</p>

<p align="center">
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-5.4.2-FF5D01.svg?style=flat-square&logo=astro&logoColor=white" alt="Astro 5" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://pagefind.app"><img src="https://img.shields.io/badge/Search-Pagefind%20v1.6-4338CA.svg?style=flat-square" alt="Pagefind" /></a>
  <a href="https://v2rayn.run"><img src="https://img.shields.io/badge/SEO%20Health-100%2F100%20(A%2B)-success.svg?style=flat-square" alt="SEO Health Score" /></a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" />
</p>

---

## 📖 项目简介 (Overview)

`v2rayn.run`（v2rayn指南）是一个基于 **Astro 5 静态生成引擎 (SSG)** 构建的现代化中文跨境网络工具与专线机场评测知识门户。

不同于市面上粗制滥造的引流站群，本项目坚持 **「Answer-First 首屏直答」** 与 **「电信级客观发包采样」** 理念，全站深度正文超过 **24 万纯汉字**，集成了 7 大万字实战专著、28 个二级细分专题与 31 家已审计的独立品牌数据库，并针对传统搜索引擎（Google / Bing / 百度 / 神马）及新一代生成式 AI 引擎（ChatGPT Search / Perplexity / Google AI Overviews）进行了深度的 **GEO / AEO 结构化知识布局**。

---

## ✨ 核心技术特性 (Key Features)

### 1. 极速纯静态架构 (Pure SSG with Astro 5)
- **零 CSR 抓取门槛**：全站 75 个独立页面在构建期预渲染为标准 HTML，爬虫获取即完整正文，无需执行 JavaScript；
- **Core Web Vitals 全绿**：极简 CSS/JS 打包，移动端首屏加载时间（FCP）小于 400ms，最大内容绘制（LCP）小于 800ms；
- **全站全文检索**：集成开源轻量级引擎 `Pagefind v1.6`，索引超 48,000 个高频词条，毫秒级即搜即显。

### 2. 万字专著级内容矩阵 (Monograph Content Matrix)
- 包含 **7 篇纯汉字字数 10,000+** 的技术专著：
  1. `clash-verge-rev-complete-guide.md` - Clash Verge Rev 电脑端全能教程 (10,025 字)
  2. `cost-effective-airport-comparison.md` - 高性价比机场横向深度实测 (10,048 字)
  3. `airport-recommend-guide.md` - 2026年机场推荐与选购指南 (10,075 字)
  4. `airport-scam-and-risk-warning.md` - 机场跑路预警与防坑指南 (10,078 字)
  5. `iepl-vs-iplc-vs-bgp-explained.md` - IEPL、IPLC与BGP差异全景解析 (11,962 字)
  6. `shadowrocket-ios-setup-tutorial.md` - Shadowrocket 苹果小火箭精通指南 (10,029 字)
  7. `guangsu-cloud-deep-review.md` - 光速云全维度全网独家实测专著 (10,540 字)

### 3. 四层内链拓扑与 GEO/AEO 搜索引擎优化
- **100% 结构化数据 (Schema.org)**：
  - `Organization` & `WebSite` 品牌知识图谱关联
  - `TechArticle` / `Product` / `AboutPage` 类型精准映射
  - `BreadcrumbList` 全链路面包屑导航
  - `FAQPage` 覆盖全站 365 组真实问答对（100% 对应页面可见文本，严禁隐藏作弊）
- **四大搜索引擎爬虫准入**：`robots.txt` 显式开放 Googlebot、bingbot、Baiduspider 及 yisouspider（神马/UC/夸克）；
- **商业引流合规**：全站 320+ 外部商业链接 100% 携带 `rel="nofollow sponsored noopener"`；
- **工程级自动审计守门**：集成 `npm run audit`，构建期间自动检测死链、Canonical 与 Aff 属性，保持死链率为 0。

---

## 📂 项目结构 (Repository Structure)

```text
v2rayn.run/
├── dist/                     # 生产环境静态打包产物 (75 个 HTML 静态页面)
├── public/                   # 静态资产与服务器配置
│   ├── images/               # 封面插图、品牌 Logo 与 WebP 头像
│   ├── .htaccess             # Apache 高级伪静态、301 跳转、Gzip 压缩与安全标头
│   ├── favicon.svg           # 全局矢量 Favicon 与 PWA 图标
│   └── robots.txt            # 搜索引擎爬虫准入清单 (Google/Bing/Baidu/神马)
├── src/
│   ├── components/
│   │   ├── cards/            # 文章、品牌、专题卡片组件
│   │   ├── charts/           # 晚高峰测速柱状图、网络拓扑与流媒体解锁矩阵
│   │   ├── common/           # Header 导航栏、Footer 页脚、Breadcrumb 面包屑
│   │   ├── review/           # 实时动态核验徽章、目录浮动导航 (TOC)、代码一键复制
│   │   └── seo/              # SEOHead.astro (Canonical/OG/Schema/站长验证)
│   ├── content/              # Astro 5 内容集合 (Content Collections)
│   │   ├── articles/         # 核心综合指南专著
│   │   ├── comparisons/      # 物理线路与架构对比专著
│   │   ├── guides/           # 移动端与客户端实战指南
│   │   └── reviews/          # 独立品牌深度实测专著
│   ├── data/                 # 静态数据库
│   │   ├── brands.ts         # 31 家已核验独立品牌参数数据库
│   │   ├── navigation.ts     # 四大核心栏目与 28 大二级专题路由字典
│   │   └── siteVerification.ts # 搜索引擎站长平台验证预留配置
│   ├── layouts/              # 页面母版 (BaseLayout / ArticleLayout / BrandLayout)
│   ├── pages/                # 路由系统 (index, airport, vpn, clash, resources, about)
│   └── styles/               # 全局样式与 Tailwind CSS 自定义扩展
├── scripts/                  # 自动化运维与质量审计工具
│   ├── audit_site.cjs        # 全站自动化死链、Schema 与 SEO 审计脚本
│   └── post_build.cjs       # 生产构建后置处理 (Sitemap 复制与自动化守门)
├── astro.config.mjs          # Astro 工程核心配置 (trailingSlash, sitemap)
├── package.json              # 依赖与脚本命令
└── README.md                 # 项目自述文件
```

---

## 🛠️ 快速启动 (Quick Start)

### 1. 环境准备
- Node.js: `>= 18.17.0` (推荐 `v20.x` 或更高 LTS 版本)
- 包管理器: `npm` / `pnpm` / `yarn`

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发服务器
```bash
npm run dev
```
启动后访问 `http://localhost:4399/` 即可实时预览。

### 4. 生产构建与全站质量自检
```bash
npm run build
```
该命令将依次执行：
1. `astro build`：编译生成 75 个高度优化的静态 HTML 页面；
2. `pagefind --site dist`：建立全站中文全文检索索引；
3. `node scripts/post_build.cjs`：自动生成 `dist/sitemap.xml`，并执行全站自动化死链、Canonical、Schema 与商业外链合规审计。

### 5. 单独运行 SEO 深度审计
```bash
npm run audit
```

---

## 🔍 搜索引擎站长平台接入指南 (Search Console Setup)

本项目已在 `src/data/siteVerification.ts` 中预留了各大搜索引擎站长平台的所有权验证通道。在对应平台添加站点后，只需填入对应代码并重新编译：

```typescript
// src/data/siteVerification.ts
export const siteVerification = {
  google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Google Search Console
  bing: 'YOUR_BING_MSVALIDATE_CODE',      // Bing Webmaster Tools
  shenma: 'YOUR_SHENMA_CODE',             // 神马站长平台 (UC/夸克)
  baidu: 'YOUR_BAIDU_CODE',               // 百度搜索资源平台
  sogou: '',                              // 搜狗站长平台
  qihu360: '',                            // 360 搜索站长平台
};
```

---

## ⚖️ 免责声明与版权规范 (Disclaimer)

1. **客观中立原则**：本仓库包含的测速数据与分析结论均基于真实网络发包采样（MTR 路由追踪、晚高峰 20:30 压力测试、千兆双线光纤环境），任何商业合作均不改变客观实测数据与负面缺陷的公开发布。
2. **合法合规准则**：本项目所有文章与代码仅供计算机网络技术研究、高校与外贸企业合法跨境办公参考，严禁利用本项目内容从事任何违反所在国家与地区法律法规的活动。

---

<p align="center">
  <strong>© 2026 v2rayn.run. All rights reserved.</strong><br/>
  Crafted with ❤️ by <a href="https://v2rayn.run/about/">v2rayn指南测评实验室</a>
</p>
