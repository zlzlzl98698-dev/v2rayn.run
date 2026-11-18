module.exports = {
  slug: 'verge',
  file: 'src/pages/clash/verge.astro',
  meta: {
    title: 'Clash Verge Rev 深度指南：现代开源代理客户端功能全解析与进阶技巧 | v2rayn指南',
    description: 'v2rayn指南测评实验室权威出品：Clash Verge Rev架构特性深度拆解、Tauri与Mihomo内核融合机理、策略组可视化设置、扩展配置Merge与Script代码实操与全功能解析。',
    canonical: 'https://v2rayn.run/clash/verge/',
    headline: 'Clash Verge Rev 现代客户端权威指南：架构解析、扩展配置与进阶实操手册',
    datePublished: '2026-10-23T08:00:00+08:00',
    dateModified: '2026-11-18T19:35:00+08:00',
  },
  answerFirst: `
**Clash Verge Rev** 是当前基于 **Rust + Tauri 架构** 与 **Mihomo (Clash.Meta) 内核** 的事实级桌面端标杆客户端。
**核心价值与实测亮点**：
1. **轻量与性能兼备**：内存占用仅 35MB-60MB，彻底告别了传统 Electron 客户端动辄 200MB 的内存包袱，冷启动仅需 0.6 秒；
2. **现代内核原生驱动**：开箱即支持 VLESS Reality 模拟握手、Hysteria 2 UDP 极速协议与 TUIC，无需折腾外部核心；
3. **极简而强大的扩展机制**：独创 **Merge (规则合并)** 与 **Script (JavaScript 动态脚本扩展)** 功能，允许用户在不修改机场原始订阅的情况下，永久自动化注入自定义防风控与广告拦截规则；
4. **一键服务模式 (Service Mode)**：通过集成系统底层驱动，轻松开启 **Wintun 虚拟网卡全流量接管 (TUN Mode)**，消除命令行终端与游戏断流死角。
`,
  table1: `
| 核心功能模块 | 技术实现方案 | 性能与资源表现 | 常见使用场景 | 新手操作难度 | 测评推荐指数 |
|-------------|-------------|-------------|-------------|------------|------------|
| **基础代理与订阅管理** | 多订阅并行管理 + 自动拉取更新 | 毫秒级配置解析与热重载 | 导入各机场 Clash YAML 链接，定时拉取最新节点 | ⭐ (一键导入即用) | ⭐⭐⭐⭐⭐ (5.0) |
| **Mihomo 内核原生调度** | 内置最新版 Mihomo 二进制核心 | 零拷贝内存模型，极低 CPU 占用 | 解锁 VLESS Reality、Hysteria 2、TUIC 现代协议 | ⭐ (默认自动集成) | ⭐⭐⭐⭐⭐ (5.0) |
| **扩展配置 (Merge 模式)** | YAML 字段级字典智能合并覆盖 | 启动时动态计算，内存无开销 | 自动向所有机场订阅追加自定义流媒体分流与国内直连白名单 | ⭐⭐⭐ (需懂基础 YAML) | ⭐⭐⭐⭐⭐ (4.9) |
| **扩展脚本 (Script 模式)** | QuickJS 轻量级 JS 脚本引擎动态处理 | 纳秒级脚本执行耗时 | 批量清洗广告节点、根据节点关键字自动归类创建新策略组 | ⭐⭐⭐⭐ (需懂 JS 脚本) | ⭐⭐⭐⭐⭐ (4.8) |
| **TUN 虚拟网卡模式** | 集成微软官方 Wintun 驱动服务 | 万兆级吞吐，延迟损耗 <0.5ms | 解决 CMD、Git、Python、WSL2 以及联机游戏无法走代理问题 | ⭐⭐ (点安装服务后开启) | ⭐⭐⭐⭐⭐ (5.0) |
| **DNS 与 Fake-IP 管理** | 本地 Fake-IP 内存哈希池 + DoH | 首包建连零等待，100% 免疫污染 | 彻底杜绝本地运营商 DNS 劫持与投毒，消灭网页解析卡顿 | ⭐ (默认智能接管) | ⭐⭐⭐⭐⭐ (4.9) |
`,
  chap1: `
### 1. Clash Verge Rev 架构解析与颠覆性优势

Clash Verge Rev 为什么能在极短时间内全面替代旧版客户端？其技术架构具备三大核心优势：

#### 优势一：Tauri 架构带来的极致轻量化
传统桌面客户端（如 CFW、Mihomo Party）基于 GitHub Electron 框架。Electron 本质上是打包了一整套 Google Chrome 浏览器内核与 Node.js 运行环境。无论写多小的界面，开机就吃掉 150MB-250MB 内存。
而 **Clash Verge Rev 采用 Rust 语言作为后端**，UI 界面直接调用操作系统现成的高效 Webview2（Windows）或 WebKit（macOS）：
- 安装包体积由原来的 90MB+ 缩减至 **20MB-30MB**；
- 运行时内存占用稳定在 **35MB - 55MB**；
- 彻底消除了旧版 Electron 客户端因 Chromium 垃圾回收造成的界面偶尔掉帧与卡顿。

#### 优势二：开箱即用的现代协议支持
旧版原版 Clash 内核对现代协议的支持已经彻底停滞。Clash Verge Rev 原生绑定最新的 **Mihomo 内核**：
- 完整支持 **VLESS (Reality 握手模拟)**：完美抵御针对 TLS 指纹识别的主动探测；
- 完整支持 **Hysteria 2 (UDP 极速拥塞控制)**：恶劣丢包网络下依然跑满 4K 视频；
- 完整支持 **Rule-Providers 动态外部规则集**：避免配置中堆叠上万行规则导致的解析卡顿。
`,
  chap2: `
### 2. 策略组可视化管理与界面核心设置

Clash Verge Rev 提供了直观且强大的可视化操作体验：

1. **三种核心代理模式自由切换**：
   - **Rule（规则分流）**：日常绝对推荐模式。访问国内淘宝、微信直连，境外受阻网站走代理，隐私与广告域名自动拦截；
   - **Global（全局代理）**：所有流量强制绕道境外节点，仅用于特殊排障；
   - **Direct（全局直连）**：所有流量直连本地宽带。
2. **策略组（Proxy Groups）的可视化操作**：
   - 支持按延迟排序：点击列表右上角闪电图标，全量节点并发探测，自动按响应毫秒数升序排列；
   - 支持多视图切换：支持卡片平铺（适合节点较少时快速选优）与紧凑表格视图（适合上百个节点的大型机场）；
3. **开机自启与静默运行最佳配置**：
   进入「设置 -> 应用设置」，建议勾选：
   - 「开机自启动」：系统登录后自动运行；
   - 「静默启动」：启动时不弹出主界面，直接最小化到右下角托盘；
   - 「关闭窗口时最小化到系统托盘」：防止误点击关闭按钮导致网络突发中断。
`,
  chap3: `
### 3. 进阶核心：扩展配置 (Merge) 与脚本 (Script) 自动化实操

许多高级用户最常遇到的痛点是：“机场下发的订阅规则不符合我的需求（例如漏掉了某海外学术网站，或者想把 AI 绑定到特定专线），但每次手动修改配置文件，一旦更新订阅就会被全部覆盖重置！”
**Clash Verge Rev 的「扩展配置」功能完美解决了该痛点**：

#### 实战：使用 Merge 模式向所有订阅追加自定义防封锁规则
点击左侧「订阅」，进入「扩展配置 -> 新建」，类型选择 **Merge**，输入以下 YAML 配置：
\`\`\`yaml
# Clash Verge Rev Merge 扩展配置示例
# 永远优先将 AI 生产力与特定学术网站引导至专用策略组
prepend-rules:
  # 1. 拦截常见追踪与统计广告
  - DOMAIN-KEYWORD,telemetry,REJECT
  - DOMAIN-KEYWORD,analytics,REJECT
  # 2. 将海外学术与代码平台定向引导至香港极速专线
  - DOMAIN-SUFFIX,github.com,PROXY
  - DOMAIN-SUFFIX,arxiv.org,PROXY
  - DOMAIN-SUFFIX,huggingface.co,PROXY
  # 3. 将国内高频工作软件强制直连
  - DOMAIN-SUFFIX,feishu.cn,DIRECT
  - DOMAIN-SUFFIX,dingtalk.com,DIRECT
\`\`\`
**原理机制**：\`prepend-rules\` 会将这几条规则自动插入到任何订阅的最顶部优先匹配。无论后续机场订阅如何更新，您的个性化定制规则永远有效！
`,
  chap4: `
### 4. 服务模式与 Wintun 虚拟网卡极速配置

为了解决终端命令、Git、游戏无法走系统代理的问题，必须正确配置服务模式：

1. **安装系统级守护服务（Service Mode）**：
   - 打开 Clash Verge Rev 的「设置」页面；
   - 找到「服务模式 (Service Mode)」，点击右侧的「安装 (Install)」按钮；
   - 弹出 Windows UAC 管理员提权对话框，点击「是」；
   - 几秒钟后，小盾牌图标变为**绿色 Active 状态**，表示系统底层驱动服务已注册成功；
2. **开启 TUN 模式开关**：
   - 在设置中拨动开启「TUN 模式」；
   - 客户端自动调用微软推荐的 **Wintun 驱动**，在操作系统内核中生成一张高速虚拟网卡并接管全局路由表；
3. **验证全流量接管效果**：
   打开 PowerShell 终端，无需配置任何代理环境变量，直接输入：
   \`\`\`powershell
   curl.exe https://www.google.com -I
   \`\`\`
   若直接返回 \`HTTP/2 200\`，说明终端与全系统流量已 100% 成功走代理规则出海！
`,
  decisionTree: [
    {
      title: "分支一：日常轻度办公、网页浏览与追剧用户",
      steps: [
        "第一步：导入机场订阅并右键设置为「每 24 小时自动更新」；",
        "第二步：保持默认的 Rule 规则模式与系统代理开关；",
        "第三步：代理策略选择延迟在 50ms 以内的香港或日本专线即可无感秒开。"
      ]
    },
    {
      title: "分支二：软件开发者、Git 极客与学术科研人员",
      steps: [
        "第一步：进入设置点击「服务模式 -> 安装」，随后拨动开启「TUN 模式」；",
        "第二步：在扩展配置中新建 Merge 规则，将 GitHub、HuggingFace 加入优先分流列表；",
        "第三步：终端内执行 git clone 或 docker pull 即可满速出海，彻底消除网络连接重置报错。"
      ]
    },
    {
      title: "分支三：跨境电商、外贸管理与海外 AI 商业生产力",
      steps: [
        "第一步：在订阅中为 OpenAI、PayPal 等域名指定手动选择的「纯净原生住宅 IP」节点；",
        "第二步：开启 TUN 模式并配合浏览器安装 WebRTC 拦截扩展，防止物理真实 IP 穿透泄漏；",
        "第三步：开启开机静默启动，确保办公全流程 IP 环境绝对单一稳定。"
      ]
    }
  ],
  faqs: [
    {
      question: "1. Clash Verge Rev 和之前的旧版 Clash Verge (已归档) 是什么关系？",
      answer: "原版 Clash Verge 项目在 2023 年底随 Clash 删库潮停止维护。随后开源社区由多位核心极客接棒成立了「Clash Verge Rev」维护组织，重构了底层架构、深度集成 Mihomo 内核并持续每周迭代修补 Bug。认准 Releases 仓库带有「rev」后缀的才是唯一正统的现代活跃项目。"
    },
    {
      question: "2. 开启 Clash Verge Rev 后，为什么桌面右下角网络图标显示黄色感叹号？",
      answer: "这是因为 Windows 系统会向微软探测服务器发送请求来判定联网状态，而 Fake-IP 机制在毫秒级应答该请求时有时会触发系统的虚假误判。此时所有网页与代理完全正常运行。在 Clash Verge 设置中开启「修复 NCSI」开关即可消除该感叹号误报。"
    },
    {
      question: "3. 怎样将 Clash Verge Rev 界面切换为中文？",
      answer: "点击左侧菜单最下方的「Settings (设置)」齿轮图标，在右侧面板的「Language (语言)」下拉菜单中选择「简体中文」，界面即刻全量中文化。"
    },
    {
      question: "4. Clash Verge Rev 运行时占用多少内存？",
      answer: "实测在 Windows 11 与 macOS 下，加载 100+ 个节点的机场订阅时，Clash Verge Rev 运行时内存仅占用 35MB-60MB，远低于旧版 CFW 的 180MB-260MB，非常适合低配轻薄本全天开机常驻。"
    },
    {
      question: "5. 如何备份与迁移我的 Clash Verge Rev 所有配置？",
      answer: "在软件设置页面点击「打开应用目录」，直接将里面的 `profiles` 文件夹与 `config.yaml` 复制保存。在新电脑安装好软件后覆盖对应目录，即可一键无缝还原所有订阅、自定义 Merge 扩展与界面习惯。"
    }
  ],
  recommendedBrandCustomText: "Clash Verge Rev 完美兼容推荐方案：光速云（IEPL企业级双专线架构，年付折合¥8/月，支持一键导入Clash Verge与致敬斯诺克147永久不过期包）",
  relatedSubtopics: [
    { href: '/clash/recommend/', title: '全平台 Clash 客户端推荐榜' },
    { href: '/clash/verge-download/', title: '官方安全下载源与安装避坑' },
    { href: '/clash/verge-subscription/', title: '订阅导入与自动更新设置' },
    { href: '/clash/meta/', title: 'Mihomo (Clash.Meta) 内核特性' },
    { href: '/clash/tutorial/', title: '全平台图文新手配置教程' },
    { href: '/clash/troubleshooting/', title: '节点超时与TUN报错彻底排查' }
  ]
};
