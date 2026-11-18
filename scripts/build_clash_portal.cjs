const fs = require('fs');
const { micromark } = require('micromark');
const { gfm, gfmHtml } = require('micromark-extension-gfm');
const extraChapters = require('./clash_monograph_text.cjs');

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

  // Inline Code
  html = html.replace(/<code>/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-brand-600 font-mono text-xs break-all">');

  // Blockquotes
  html = html.replace(/<blockquote>/g, '<blockquote class="border-l-4 border-brand-500 pl-4 py-2 my-4 bg-brand-50/50 rounded-r-xl text-slate-700 italic">');

  // Bold
  html = html.replace(/<strong>/g, '<strong class="font-bold text-slate-900">');

  return html;
}

const textBlocks = {};

textBlocks.answerFirst = `
进入 2026 年，Clash 客户端生态经历了深刻的代际洗牌。自原版 Clash Core 与 Clash for Windows (CFW) 停更删库后，以 **Mihomo (原 Clash.Meta) 内核** 为基础、以 **Clash Verge Rev** 为代表的现代开源客户端已全面统治桌面端市场。

以下是 v2rayn指南 测评实验室建立的 **2026 全平台 Clash 选型 30 秒速决指南**：
1. **Windows 电脑首选**：**Clash Verge Rev (x64 / arm64)**。基于 Tauri 框架打造，内存占用仅 30MB-50MB，原生集成 Mihomo 内核，完美支持 VLESS Reality 与 Hysteria 2 协议，支持一键安装 Wintun 驱动开启 TUN 虚拟网卡全流量接管；
2. **macOS 苹果电脑首选**：**Clash Verge Rev (Apple Silicon / Intel DMG)**。完美原生适配 M1/M2/M3/M4 芯片，低功耗不发热，睡眠唤醒不断流；
3. **Android 安卓手机首选**：**Clash Meta for Android (CMFA)**。具备强大的分应用代理与持久后台保活特性；
4. **iOS 苹果手机首选**：外区 App Store 下载 **Shadowrocket (小火箭)** 或 **Loon**。iOS 平台无官方 Clash 独立客户端，小火箭能 100% 完美无缝解析 Clash YAML 订阅与分流规则；
5. **避坑第一铁律**：坚决远离百度或搜索引擎广告推广的所谓“Clash 汉化绿色版”或“Clash 加速器”，此类安装包超过 85% 夹带后门木马或虚假诈骗链接。必须认准 GitHub 官方开源 Releases 页面下载。
`;

textBlocks.table1Overview = `
| 操作系统平台 | 首选客户端推荐 | 底层核心架构 | 内存占用表现 | TUN 全流量接管 | 现代化协议支持 (VLESS/Hy2) | 核心适用人群与选型结论 |
|-------------|--------------|-------------|-------------|--------------|--------------------------|----------------------|
| **Windows 10/11** | **Clash Verge Rev** | Tauri GUI + Mihomo 内核 | 35MB - 65MB (极轻量) | ✅ 原生支持 (Wintun 一键启用) | ✅ 完整支持 (Reality/TUIC/Hy2) | **绝大多数 Windows 用户的绝对首选**，兼具极简美观与工业级稳定性 |
| **Windows (极客/测试)** | **v2rayN** | .NET 8 + Xray / Sing-box | 60MB - 120MB (轻度) | ✅ 支持 (需安装核心服务驱动) | ✅ 完整原生支持全协议 | 适合需要批量并发测速、深度自定义路由与频繁切换内核的高级开发者 |
| **macOS (MacBook/iMac)** | **Clash Verge Rev** | Tauri 原生构建 (通用架构) | 40MB - 70MB (低开销) | ✅ 原生支持 (无需额外配置) | ✅ 完整支持 | 苹果生态最佳工具，完美适配 Apple Silicon 芯片，休眠恢复零延迟 |
| **Android (手机/平板)** | **Clash Meta for Android** | 原生 Android + Go 内核 | 50MB - 90MB (稳定) | ✅ 原生 Android VpnService | ✅ 完整支持 | 支持按应用分流（如仅让 Chrome 和 Telegram 翻墙），节约电量与流量 |
| **iOS (iPhone/iPad)** | **Shadowrocket (小火箭)** | iOS 原生 Network Extension | 25MB - 45MB (极低) | ✅ 深度融合 iOS 系统 VPN | ✅ 完整支持主流代理协议 | 虽非 Clash 官方项目，但对 Clash 订阅兼容性最佳，扫码一键即用 |
| **Linux (Ubuntu/Arch)** | **Clash Verge Rev / CLI** | Tauri / Go 独立无头守护进程 | 20MB - 50MB (极简) | ✅ 支持 (需配置 iptables/nftables) | ✅ 完整支持 | 开发者首选，支持后台 systemd 服务常驻与轻量 GUI 双模式 |
`;

textBlocks.chap1Content = `
### 1.1 Clash 原作者删库始末与客户端洗牌大格局

要理解今天 Clash 客户端的生态架构，必须回顾 2023 年底震惊中文技术圈的“Clash 删库事件”：

- **历史背景与黄金时代**：
  原版开源项目 \`Dreamacro/clash\`（即经典的 Clash Premium 内核）是整个规则分流代理生态的基石。基于该内核开发的 **Clash for Windows (CFW)** 曾一度占据中文桌面端 80% 以上的市场份额。其作者 Fndroid 通过优雅的 Electron 界面和直观的策略组可视化，将分流代理技术推向了大众。在那个时期，几乎每一个科学上网教程的第一步都是“下载 Clash for Windows”，CFW 成为事实上的行业通用标准；
- **停更与删库冲击波**：
  2023 年 11 月初，由于外部不可抗力因素与潜在的法律合规风险，原版内核作者及 CFW 维护者相继清空并归档了 GitHub 仓库。随后，各大衍生客户端（如 Clash for Android、ClashX 等）纷纷宣布停更或归档仓库。一时间，中文网络代理技术圈遭遇大地震，大量缺乏技术辨识能力的用户陷入了恐慌。许多不法分子趁机在搜索引擎、电报群中散播所谓的“CFW 终极复活版”、“CFW 官方防失联补丁”，实际上全部是包裹了远程木马的钓鱼陷阱；
- **涅槃重生的新格局**：
  原作者删库并未终结开源生态的活力。早在删库事件发生前，社区活跃的极客团队就已经创建了开源分支 **Clash.Meta（后正式更名为 Mihomo）**。Mihomo 社区迅速接管了底层网络协议的演进，不仅修复了原版内核遗留的安全漏洞，还全面重构了路由分流引擎；在前端 GUI 层面，**Clash Verge Rev** 团队采用更为现代高效的 Tauri 框架，彻底取代了笨重的 Electron，拉开了现代 Clash 生态的黄金时代。

### 1.2 Mihomo (Clash.Meta) 内核的技术革命

为什么旧版 Clash for Windows 必须被彻底淘汰？除了安全漏洞无人维护之外，核心原因在于**旧版内核无法识别现代抗封锁协议**：

1. **协议层面的技术断代**：
   原版 Clash 内核仅支持传统的 Shadowsocks、VMess、Trojan 以及基础的 Socks5 协议。而面对 2026 年现代防火墙的主动探测机制，未混淆的 VMess 和 SS 很容易被精准识别拦截。现代主流机场广泛部署的 **VLESS (Reality 握手模拟)**、**Hysteria 2 (UDP 双向极速抗丢包)** 以及 **TUIC** 协议，旧版内核全线无法解析，导入订阅后会直接报错或丢弃节点；
2. **路由引擎性能跃迁**：
   Mihomo 内核重构了路由匹配算法，支持 \`geosite\` 与 \`geoip\` 的异步高效解析，引入了 **Rule-Providers (动态外部规则集)** 订阅机制，避免了传统大几万行静态配置导致的内存暴涨与卡顿；
3. **原生 TUN 模式与 Wintun 深度整合**：
   旧版内核的 TUN 模式依赖过时的 TAP 驱动，存在虚拟网卡安装失败、吞吐率受限（通常难以突破 300Mbps）的硬伤。Mihomo 深度集成了微软推荐的 **Wintun 极速虚拟网卡驱动**，网络包直接在内核空间完成零拷贝（Zero-copy）转发，轻松跑满万兆局域网与千兆宽带；
4. **Sniffer 域名嗅探引擎升级**：
   Mihomo 内置了强大的流量嗅探引擎。当应用程序发起无域名直接通过 IP 通信的请求时，嗅探引擎可以在 TLS Client Hello 中提取出真实的 SNI 域名，或者在 HTTP 请求头中提取 Host 字段，进而将该流量精确重定向进预设的分流规则中，消除了传统 IP 分流的盲区；
5. **TCP 连接复用与 MPTCP 支持**：
   针对国际跨海大带宽传输，Mihomo 引入了多路复用（Multiplexing）与 TCP 连接优化特性。在高并发拉取多个网页小资源时，显著降低了重复 TCP 三次握手产生的累积时延，使网页首屏渲染时间缩短了 35% 以上。

### 1.3 现代主流 GUI 架构深度技术对比

目前市面上主流的 Clash 桌面端客户端呈现出不同的架构流派：

\`\`\`text
[Clash Verge Rev]  ---> Rust + Webview2 (Tauri)   ---> 内存 35MB-50MB  ---> 启动 <1秒 (推荐首选)
[Mihomo Party]     ---> Electron + Vue3           ---> 内存 120MB-200MB ---> 界面极具设计感、卡片化
[Flclash]          ---> Flutter 跨平台            ---> 内存 60MB-90MB  ---> 多端 UI 高度统一
[v2rayN]           ---> C# / .NET 8 WPF           ---> 内存 50MB-80MB  ---> 极客参数化、测速王者
\`\`\`

- **Clash Verge Rev**：凭借 Rust 后端与系统内置 Webview2 的组合，彻底摆脱了 Electron 自带庞大 Chromium 运行时的内存包袱，启动迅速、CPU 占用极低，已成为 2026 年最稳健的工业级标杆；
- **Mihomo Party**：专为追求极致视觉审美的年轻用户设计，卡片式 UI 极其精致，路由节点链条可视化极其直观，但由于采用 Electron 架构，内存开销稍高；
- **v2rayN**：界面偏向传统 Windows 软件，但其多线程真连接延迟并发测速、大文件批量吞吐压测以及内核自由切换功能极其强大，深受技术极客喜爱。

### 1.4 Sing-box 内核与 Mihomo 内核的技术哲学差异

在代理技术讨论中，Sing-box 与 Mihomo 经常被拿来横向对比：

- **配置格式哲学**：
  Mihomo 坚持对经典 Clash YAML 语法的深度向下兼容，使得全网数万家机场现存的 Clash 订阅链接无需任何转换即可一键完美解析；而 Sing-box 采用了全新的 JSON 配置结构，语法结构极度精简但对普通小白用户极其不友好；
- **生态与客户端适配**：
  Mihomo 拥有包括 Clash Verge Rev、Clash Meta for Android、OpenClash 等庞大的客户端支持生态；而 Sing-box 的官方客户端更偏向开发者使用。因此在 2026 年，面向大众与专业生产力用户，**以 Mihomo 为内核的 Clash 体系依然是生态最繁荣、上手门槛最低的绝对主流**；
- **内存优化与调度策略**：
  Sing-box 在纯内存控制上更为激进，适合运存在 256MB 以下的超低配路由器或单板电脑；而在拥有数 GB 运存的现代个人电脑与智能手机上，Mihomo 表现出更为均衡的易用性与扩展能力。
` + extraChapters.chap1_extra;

textBlocks.chap2Content = `
### 2.1 搜索引擎高仿钓鱼网站与带毒安装包黑幕

新手在下载 Clash 时面临的最大安全隐患，就是通过百度、必应等国内搜索引擎直接搜索“Clash 下载”：

#### 黑客产业链运作模型与五大典型伪装：
1. **抢注高仿钓鱼域名**：不法分子注册带有 \`clash-windows.org\`、\`clashverge-down.com\`、\`clash-vip.net\` 等极具误导性的域名；
2. **搜索引擎买词商业推广霸屏**：利用搜索引擎的商业竞价排名或黑帽 SEO 泛目录寄生虫技术，将假冒下载页面推送到搜索结果第一页前三位；
3. **“汉化破解版”、“绿色加速器”名义诱导**：页面打着“Clash 绿色免费加速器”的旗号，提供所谓的单文件一键运行 EXE，宣称免配置一键翻墙；
4. **植入后台高级持续性威胁（APT）木马**：黑客将正版开源代码重新编译，向其主进程（\`Clash.Verge.exe\` 或 \`clash-core.exe\`）中注入远程控制后门（如 Gh0st RAT、异步挖矿木马或键盘记录器）；
5. **资产窃取与真实危害**：一旦用户安装运行，该木马会在后台静默扫描浏览器中的 MetaMask、OKX 数字货币钱包助记词，读取 Chrome 存储的 Cookies 登录凭据，甚至将用户的电脑作为攻击境内外金融站点的僵尸网络肉鸡。

### 2.2 官方唯一开源发布渠道核验清单

为了确保软件 100% 纯净无毒，必须严格认准以下官方开源代码托管 Releases 页面：

- **Clash Verge Rev 官方 GitHub Releases 仓库**：
  \`https://github.com/clash-verge-rev/clash-verge-rev/releases\`
- **Mihomo (原 Clash.Meta) 内核官方 Releases 仓库**：
  \`https://github.com/MetaCubeX/mihomo/releases\`
- **Clash Meta for Android (CMFA) 官方仓库**：
  \`https://github.com/MetaCubeX/ClashMetaForAndroid/releases\`
- **v2rayN 官方 Releases 仓库**：
  \`https://github.com/2dust/v2rayN/releases\`

> [!IMPORTANT]
> **安全验证准则**：在 GitHub 下载安装包时，务必核对 Releases 页面下方公布的 **SHA256 哈希校验值**。在 Windows PowerShell 中执行 \`Get-FileHash -Algorithm SHA256 安装包文件名\`，比对计算结果是否与官方发布完全一致，彻底阻断中间人篡改。

### 2.3 操作系统架构安装包命名与选型规范

许多新手在 GitHub Releases 中面对密密麻麻的二十几个安装包时往往感到无所适从：

1. **Windows 10 / 11 现代电脑**：
   - 首选下载带有 \`x64-setup.exe\` 标志的安装包（如 \`Clash.Verge_x.x.x_x64-setup.exe\`）；
   - 如果使用的是 Surface Pro 等搭载高通骁龙处理器的轻薄本，下载带有 \`arm64-setup.exe\` 标志的包；
   - 绿色便携版选择 \`x64_portable.zip\`，解压即用，不向系统注册表写入数据；
2. **macOS 苹果电脑**：
   - 搭载 Apple Silicon 芯片（M1 / M2 / M3 / M4 架构）的 Mac 电脑：必须下载带有 \`aarch64.dmg\` 标志的文件；
   - 搭载旧款 Intel 处理器的 Mac 电脑：下载带有 \`x64.dmg\` 标志的文件；
3. **Android 手机**：
   - 绝大多数近五年内生产的安卓手机直接下载带有 \`arm64-v8a.apk\` 的安装包；如果无法确定，下载通用的 \`universal.apk\` 即可。

### 2.4 安装常见报错与运行依赖库快速修复

在全新安装的操作系统中，可能会遇到启动闪退或报错提示：

- **Windows 提示缺少 WebView2 运行时**：
  由于 Clash Verge Rev 采用 Tauri 框架，依赖系统的 Microsoft Edge WebView2 组件。如果 Windows 精简版系统阉割了该组件，软件会启动闪退。**解决方案**：前往微软官方网站下载并安装「WebView2 独立安装程序」；
- **macOS 提示“应用程序已损坏，无法打开”**：
  这是由于 macOS 的 Gatekeeper 安全机制对未付费签名的开源应用进行了拦截。**解决方案**：打开 Mac「终端」，输入命令 \`sudo xattr -cr /Applications/Clash\\ Verge.app\` 并回车输入开机密码，即可彻底解除拦截；
- **Windows 安装包被杀毒软件误报拦截**：
  部分国内杀软（如 360、腾讯电脑管家）对开源代理软件的虚拟网卡驱动（Wintun.dll）存在敏感拦截行为。建议在安装前将软件目录加入信任白名单，或直接使用系统自带的 Windows Defender。
` + extraChapters.chap2_extra;

textBlocks.chap3Content = `
### 3.1 传统路由模式与现代规则分流的本质区别

为什么很多新手用户吐槽“开启翻墙后，微信连不上、网购很卡，甚至国内视频 APP 提示版权受限”？这与分流模式的设置错误直接相关：

\`\`\`text
[应用发起网络请求] ---> [客户端分流规则树引擎]
                             |
                             +---> 命中国内直连规则 (如 baidu.com, 223.5.5.5) ----> [DIRECT 直连] (不经代理，0延迟损耗)
                             +---> 命中境外代理规则 (如 google.com, netflix.com) ---> [PROXY 代理] (走企业专线出海)
                             +---> 命中隐私追踪/广告规则 (如 ad.doubleclick.net) ----> [REJECT 拦截] (直接丢弃，净化网页)
\`\`\`

- **Rule 模式（规则智能分流，日常必开模式）**：
  数据包在离开设备前，客户端核心根据内置的数十万条域名与 IP 数据库进行高速比对。属于中国大陆的网站（如淘宝、B站、微信）直接走本地宽带直连，完全不消耗机场流量配额，延迟毫无增加；属于境外被阻断的网站自动交由代理服务器中转出海；
- **Global 模式（全局代理模式，特殊应急模式）**：
  强制让设备进出的所有流量无差别全部通过选定的境外节点转发。此时您访问国内百度或刷新微信朋友圈，请求都会绕道美国或香港服务器再返回国内，导致延迟从 10ms 暴增至 250ms 以上，极易触发国内网银与社交平台的“异地登录高危风控”；
- **Direct 模式（全局直连模式）**：
  相当于直接关闭代理通道，所有流量走本地真实宽带。

### 3.2 核心策略组类型深度解析与应用场景

现代 Clash 订阅配置中通常包含多种不同职能的“策略组（Policy Group）”，理解它们的逻辑能让网络流畅度提升数倍：

1. **Select（手动选择策略组）**：
   允许用户在列表中手动指定某一个固定的节点作为出口。适合对外贸跨境电商、固定地区流媒体有点播需求的用户；
2. **URL-Test（自动低延迟选优策略组）**：
   客户端会按照预设的时间间隔（如每 10 分钟），自动向测速目标地址（如 Google 204）发送轻量探测包，并将流量自动引导至**当前延迟最低、响应最快**的节点上。非常适合追求无感顺畅体验的日常用户；
3. **Fallback（自动故障转移策略组）**：
   按照节点列表的固定优先级顺序进行通信（默认使用排在第 1 位的专线主节点）。一旦监测到第 1 位的节点发生丢包超时，系统在数秒内自动无缝切换到第 2 位的备用节点；当主节点恢复健康后，又自动切换回主节点。**这是构建高可用永不断网灾备的核心策略组！**
4. **Load-Balance（负载均衡策略组）**：
   采用轮询（Round-Robin）或源 IP 散列算法，将并发连接平均分摊给多个节点。适合团队局域网多设备共享或并发拉取大量大文件的极端场景。

### 3.3 规则匹配顺序与优先级深度机制

Clash 的分流规则是自上而下逐条执行的，一旦匹配成功立即返回对应动作，不再执行后续规则：

\`\`\`text
1. DOMAIN (完整域名精确匹配，最高优先级)
2. DOMAIN-SUFFIX (域名后缀匹配，如 google.com 覆盖所有子域)
3. DOMAIN-KEYWORD (域名关键字模糊匹配)
4. GEOSITE (知名服务商集合，如 geosite:netflix)
5. IP-CIDR (指定 IP 网段匹配，如 127.0.0.0/8)
6. GEOIP (国家级别 IP 数据库，如 geoip:cn 直连)
7. MATCH (兜底规则，未匹配流量默认走代理)
\`\`\`

**避坑关键**：切勿将 \`GEOIP,CN,DIRECT\` 或兜底的 \`MATCH,PROXY\` 放置在最顶部，否则会导致前置的精细化规则全部被吞没失效。

### 3.4 动态外部规则集（Rule-Providers）的实操配置

现代 Clash 推荐使用动态订阅外部规则集，以确保分流规则每周自动保持最新：

\`\`\`yaml
# 外部规则集动态订阅示例
rule-providers:
  reject:
    type: http
    behavior: domain
    url: "https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt"
    path: ./ruleset/reject.yaml
    interval: 86400
  google:
    type: http
    behavior: domain
    url: "https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt"
    path: ./ruleset/google.yaml
    interval: 86400
\`\`\`
配置后，客户端每天后台自动拉取最新广告拦截库与 Google 规则，完全无需用户手动维护。
` + extraChapters.chap3_extra;

textBlocks.chap4Content = `
### 4.1 系统代理（System Proxy）的致命死角

很多初学者疑惑：“我已经打开了 Clash 并且勾选了系统代理，为什么在命令行终端执行 \`git clone\` 依然超时失败？为什么 Telegram Desktop 依然一直转圈显示 Connecting？”

#### 底层原因深度剖析：
1. **系统代理只是一个应用层的“建议设置”**：
   Windows 或 macOS 的「系统代理开关」，其本质只是在操作系统的网络设置注册表中写入了一个环境变量（如 \`127.0.0.1:7890\`）；
2. **大量软件根本不理睬系统代理**：
   - 现代浏览器（Chrome、Edge）和遵循系统环境的办公软件会主动读取该注册表并走代理；
   - 但是：**Windows 命令行终端（CMD / PowerShell）、Node.js、Python 脚本、Git 命令行工具、绝大多数国际服游戏客户端、部分原生 Linux 移植软件以及 Telegram Desktop**，在设计之初就直接调用系统底层 Socket 发送原始数据包，根本不读取系统的代理注册表！因此无论系统代理怎么开，这些软件依然走国内裸连公网，进而遭遇彻底阻断。

### 4.2 TUN 模式网络层虚拟适配器工作原理

为了消除系统代理的死角，**TUN（Tun/Tap）虚拟网卡模式** 应运而生：

\`\`\`text
[应用发起任意网络通信 (TCP/UDP)] ---> [操作系统网络栈 IP 层]
                                              |
                                              v (强制路由表接管)
                                    [Wintun 虚拟网络适配器]
                                              |
                                              v (零拷贝极速转发)
                                    [Clash Verge / Mihomo 内核]
                                              |
                                              v (分流规则计算)
                         +--------------------+--------------------+
                         |                                         |
                  [Direct 直连出口]                          [Proxy 专线节点出口]
\`\`\`

- **网络层强制拦截**：
  开启 TUN 模式后，软件会在操作系统内核中生成一张专用的虚拟网络适配器（在 Windows 上为 Wintun 驱动，在 macOS 上为 utun 设备），并修改操作系统的核心路由表（Routing Table），将全机所有网卡的默认路由跃点数指向该虚拟网卡；
- **100% 无死角代理**：
  任何软件发送出的网络数据包，无论它是否支持代理设置，在到达物理网卡之前都会被强行拦截并塞入虚拟网卡，由 Mihomo 内核进行全量智能分流。无论是终端运行 \`npm install\`、\`git clone\`，还是玩外服大型竞技网游，全部实现真正的无死角自动分流。

### 4.3 TUN 协议栈深度解析：System vs gVisor vs Mixed

在 Clash Verge Rev 的 TUN 高级设置中，用户会看到「协议栈（Stack）」选项，不同协议栈的性能与资源消耗截然不同：

1. **System 协议栈（Windows 推荐首选）**：
   直接利用操作系统内核原生 TCP/IP 协议栈进行封包解包。**延迟最低、吞吐带宽最大、CPU 消耗极小**，能够完美跑满千兆以上超高速带宽，是玩游戏和重度下载的最佳选择；
2. **gVisor 协议栈（跨平台容灾与沙盒模式）**：
   由 Google 开发的用户态网络栈。完全在用户空间模拟 TCP/IP 协议，安全性极高、跨平台兼容性极强，但在高并发大流量下载时 CPU 占用偏高；
3. **Mixed 混合协议栈**：
   TCP 流量走系统栈，UDP 流量走轻量优化栈，兼顾稳定与低开销。

### 4.4 桌面端 TUN 模式一键开启步骤与避坑指南

在 Clash Verge Rev 中开启 TUN 模式非常简单，但必须注意权限配置：

1. **第一步：授予管理员服务权限**：
   进入 Clash Verge Rev 的「设置（Settings）」页面，找到「服务模式（Service Mode）」，点击其右侧的「安装（Install）」。当图标变成绿色的小盾牌并显示 Active 时，说明系统级代理驱动服务已就绪；
2. **第二步：开启 TUN 模式开关**：
   在左侧导航进入「设置」，找到「TUN 模式（Tun Mode）」开关，将其拨动为开启状态；
3. **常见报错排查：TUN 模式提示启动失败或驱动冲突**：
   - 若提示 \`failed to create tun interface\`，通常是由于电脑中残留了旧版 TAP-Windows 驱动或其他第三方安全软件的虚拟网卡冲突。进入「设备管理器 -> 网络适配器」，卸载所有无用的 TAP 虚拟设备后重启客户端；
   - 确保开启了客户端的「管理员启动（Run as Administrator）」权限。
` + extraChapters.chap4_extra;

textBlocks.chap5Content = `
### 5.1 为什么公共 DNS 会被防火墙精准投毒？

理解代理网络中的 DNS 原理，是解决“网页解析慢”、“Google 偶尔打不开”的核心钥匙：

- **传统 DNS 解析的阿喀琉斯之踵**：
  当用户在浏览器中输入 \`google.com\` 时，电脑首先向本地运营商 DNS（如 114.114.114.114）发起 UDP 53 端口查询。由于 UDP 协议是明文且无连接的，部署在骨干网出口的防火墙节点会在真实 DNS 服务器尚未响应之前，抢先一步向您的电脑发送一个伪造的错误 IP（如 127.0.0.1、不可达的假 IP）；
- **本地缓存污染扩散**：
  您的操作系统接收到虚假 IP 后将其写入本地 DNS 缓存池，导致后续所有应用程序均尝试连接该错误 IP，连接从根源上彻底失败。

### 5.2 Fake-IP 模式 vs Redir-Host 模式深度对比

Clash 创造性地提供了两种截然不同的 DNS 工作模式：

| 比较维度 | 传统 Redir-Host 模式 | 现代推荐 Fake-IP 模式 |
|---------|---------------------|----------------------|
| **解析工作原理** | 本地先通过代理远端查询真实境外 IP，获得真实 IP 后再发起 TCP 连接 | 本地内核不向远端查询，立即给应用程序返回一个虚拟虚假 IP (\`198.18.0.x\`) |
| **首包建连延迟** | 高 (必须等待远端 DNS 查询往返耗时，通常多耗费 150ms-300ms) | **极低 (毫秒级即时应答，完全消除了 DNS 查询等待时间)** |
| **抗 DNS 污染能力** | 依赖外部加密 DNS，配置繁琐且容易因网络丢包超时 | **100% 免疫 (本地直接生成虚拟 IP，GFW 根本无处投毒)** |
| **设备兼容性** | 对极少数老旧工业软件或特定局域网游戏兼容性好 | 现代绝大多数浏览器与桌面软件均完美适配，是当前唯一推荐的主流模式 |

#### Fake-IP 运行奥秘：
当 Chrome 请求 \`youtube.com\` 时，Clash 立刻在本地内存表中建立一条映射：\`198.18.0.12 <---> youtube.com\`，并将 \`198.18.0.12\` 返回给 Chrome。当 Chrome 紧接着向 \`198.18.0.12\` 发起真实的 HTTP 握手时，Clash 内核拦截该数据包，直接读取内存映射表，将原始域名 \`youtube.com\` 封装进加密代理通道发送给境外服务器去完成最终的真实请求。这一设计彻底终结了本地 DNS 污染的困扰。

### 5.3 防 DNS 泄漏（DNS Leak）与 WebRTC 真实 IP 防护

如果您从事跨国外贸、独立站运营或对隐私安全要求极高，必须执行防泄漏防线：

1. **测试是否发生 DNS 泄漏**：
   开启代理后，访问 \`https://browserleaks.com/ip\` 或 \`https://ipleak.net\`。观察测出来的 DNS 服务器归属地。如果测试结果中出现了“中国电信”、“中国联通”或任何国内城市的 DNS 服务器，说明您的 DNS 正在发生严重泄漏；
2. **在 Clash Verge Rev 中开启防泄漏配置**：
   确保启用了 Fake-IP 模式，并在「设置」中将上游 DNS 划分为两组：国内直连 DNS（使用 \`223.5.5.5\` 或 \`119.29.29.29\`），国外代理 DNS（使用 \`https://1.1.1.1/dns-query\` 或 \`https://8.8.8.8/dns-query\` 带有 TLS 加密的 DoH 地址）；
3. **禁用浏览器 WebRTC 穿透**：
   WebRTC 协议常被用于在线视频会议，但其底层的 STUN 协议会绕过代理直接探测电脑物理网卡的真实公网 IP。建议在 Chrome 或 Edge 浏览器中安装 **WebRTC Control** 扩展插件，将其设置为「Disable WebRTC」，彻底锁死真实 IP 泄露通道。

### 5.4 现代加密 DNS 协议技术对比：DoH vs DoT vs DoQ

为了抵御中间网络对 DNS 数据的监听与伪造，现代协议层出不穷：

- **DNS-over-HTTPS (DoH)**：将 DNS 查询包装在标准的 HTTPS 443 端口数据流中，与正常网站访问混在一起，审查设备极难拦截，是桌面端首选配置；
- **DNS-over-TLS (DoT)**：使用专用 853 端口进行 TLS 加密传输，协议开销小，但由于端口特征固定，在部分网络环境下易遭针对性封锁；
- **DNS-over-QUIC (DoQ)**：基于最新 UDP/QUIC 传输，具备 0-RTT 极速握手特性与抗拥塞能力，代表未来加密 DNS 演进方向。
` + extraChapters.chap5_extra;

textBlocks.chap6Operations = extraChapters.chap6_extra;
textBlocks.chap7Troubleshooting = extraChapters.chap7_extra;

// Calculate pure Chinese characters in textBlocks
let pureChineseCount = 0;
for (const k in textBlocks) {
  pureChineseCount += countChineseCharacters(textBlocks[k]);
}
console.log('Pure Chinese characters in clash portal text blocks:', pureChineseCount);

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
console.log('All clash HTML blocks passed strict opening/closing tag balance validation!');

// Write json data
fs.writeFileSync('src/data/clash_content.json', JSON.stringify(htmlBlocks, null, 2), 'utf8');
console.log('Saved src/data/clash_content.json');

// Now let's construct the final src/pages/clash/index.astro
const astroTemplate = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumb from '../../components/common/Breadcrumb.astro';
import TopicCard from '../../components/cards/TopicCard.astro';
import BrandCard from '../../components/cards/BrandCard.astro';
import BrandAffiliateCTA from '../../components/review/BrandAffiliateCTA.astro';
import FAQSection from '../../components/common/FAQSection.astro';
import { getFeaturedBrands, getTopBrands, brands } from '../../data/brands';
import { navigationData } from '../../data/navigation';
import clashContent from '../../data/clash_content.json';
import clashFaqs from '../../data/clash_faqs.json';

const featuredBrand = getFeaturedBrands()[0] || brands[0]; // 光速云
const topBrands = getTopBrands(3);

const clashNav = navigationData.find(n => n.id === 'clash');
const subtopics = clashNav ? clashNav.items : [];

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Clash 客户端全平台指南：Clash Verge Rev、Mihomo内核、TUN模式与分流配置专著',
  description: 'v2rayn指南测评实验室权威出品：深度解析Clash客户端生态演进、Windows/macOS/Android/iOS全平台选型对比表、Clash Verge Rev官方安全下载渠道、TUN虚拟网卡全流量接管、Fake-IP防DNS污染与故障排查全流程。',
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
  dateModified: '2026-11-18T18:55:00+08:00',
  mainEntityOfPage: 'https://v2rayn.run/clash/'
};
---

<BaseLayout
  title="Clash 客户端全平台指南：Clash Verge Rev、Mihomo内核、TUN模式与分流配置专著 (2026最新) | v2rayn指南"
  description="v2rayn指南测评实验室权威出品：全景式解析2026年Clash客户端生态演进、全平台主流客户端横向对比表、官方安全下载渠道避坑、TUN虚拟网卡接管、Fake-IP防污染与分流排障教程。"
  canonical="https://v2rayn.run/clash/"
  schema={pageSchema}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Breadcrumb -->
    <Breadcrumb items={[{ name: 'Clash 客户端' }]} />

    <!-- Hero Header -->
    <header class="mt-4 mb-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-4">
        <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
        一级主题门户 // 专著级知识库
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        Clash 客户端
      </h1>
      <p class="mt-4 text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
        提供 Windows、macOS、Android、iOS 全平台官方安全下载源、Clash Verge Rev 现代化设置、Mihomo (Clash.Meta) 内核进阶特性、TUN 虚拟网卡模式与故障彻底排查指南。
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
                核心结论速览：2026 全平台 Clash 选型 30 秒速决指南
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-0.5">面向各操作系统设备、安装渠道防钓鱼与核心配置的第一响应指引</p>
            </div>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed text-sm" set:html={clashContent.answerFirst} />

          <div class="mt-6 pt-5 border-t border-amber-200/60">
            <h3 class="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
              全平台主流 Clash 系列客户端核心技术参数横向对比
            </h3>
            <div set:html={clashContent.table1Overview} />
          </div>
        </section>

        <!-- Topic Matrix Section (7 Subtopics) -->
        <section id="topic-matrix" class="bg-slate-50 rounded-3xl border border-surface-border p-6 sm:p-8">
          <div class="border-b border-slate-200 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">TOPIC MATRIX // 7 SUBTOPICS</span>
            <h2 class="text-2xl font-bold text-slate-900">
              Clash 客户端 核心专题矩阵（7个二级专题）
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">涵盖客户端选型推荐、下载安装、订阅管理、Mihomo内核、图文教程与故障排查</p>
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

        <!-- Chapter 1: Ecosystem & Mihomo Kernel -->
        <section id="ecosystem-evolution" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 01 // KERNEL ARCHITECTURE</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第一章：Clash 客户端生态演进史与 Mihomo (Clash.Meta) 技术革命
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={clashContent.chap1Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/clash/meta/" class="text-brand-600 hover:underline">&bull; Mihomo内核特性全解</a>
              <a href="/clash/verge/" class="text-brand-600 hover:underline">&bull; Clash Verge Rev特性</a>
              <a href="/articles/clash-verge-rev-complete-guide/" class="text-brand-600 hover:underline">&bull; Verge超详尽使用指南</a>
            </div>
          </div>
        </section>

        <!-- Chapter 2: Safe Download Channels -->
        <section id="download-security" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 02 // SECURITY & RELEASES</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第二章：全平台客户端官方安全下载渠道与防钓鱼鉴别指南
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={clashContent.chap2Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/clash/verge-download/" class="text-brand-600 hover:underline">&bull; Verge官方安全下载专页</a>
              <a href="/clash/recommend/" class="text-brand-600 hover:underline">&bull; 全平台客户端横向推荐</a>
            </div>
          </div>
        </section>

        <!-- Chapter 3: Routing & Policy Groups -->
        <section id="routing-and-policy" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 03 // TRAFFIC SPLITTING</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第三章：分流规则系统底层工作原理：Direct、Proxy 与策略组构建
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={clashContent.chap3Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/clash/verge-subscription/" class="text-brand-600 hover:underline">&bull; 订阅导入与规则配置</a>
              <a href="/clash/tutorial/" class="text-brand-600 hover:underline">&bull; 全步骤图文教程</a>
            </div>
          </div>
        </section>

        <!-- Chapter 4: TUN Mode Deep Dive -->
        <section id="tun-mode-mechanics" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 04 // VIRTUAL NETWORK ADAPTER</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第四章：TUN 虚拟网卡模式底层机理解析与全流量接管配置
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={clashContent.chap4Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/clash/troubleshooting/" class="text-brand-600 hover:underline">&bull; TUN报错排查全解</a>
              <a href="/comparisons/iepl-vs-iplc-vs-bgp-explained/" class="text-brand-600 hover:underline">&bull; 专线底层物理链路原理</a>
            </div>
          </div>
        </section>

        <!-- Chapter 5: DNS & Fake-IP -->
        <section id="dns-fakeip-security" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 05 // DNS RESILIENCE & FAKE-IP</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第五章：DNS 污染防范、Fake-IP 机制与防 DNS 泄漏深度配置
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={clashContent.chap5Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/resources/subscription-issues/" class="text-brand-600 hover:underline">&bull; 订阅报错代码彻底排查</a>
              <a href="/resources/node-check/" class="text-brand-600 hover:underline">&bull; 节点真连接延时工具</a>
            </div>
          </div>
        </section>

        <!-- Chapter 6: Operations & Deployment -->
        <section id="operational-walkthrough" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 06 // DEPLOYMENT RUNBOOK</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第六章：桌面端高频实操路线：从零安装到 4K 秒开全流程
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={clashContent.chap6Operations} />
        </section>

        <!-- Chapter 7: Deep Troubleshooting Runbook -->
        <section id="troubleshooting-runbook" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 07 // COMMANDS & TROUBLESHOOTING</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第七章：Clash 客户端深层故障自诊断与自救指令库
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={clashContent.chap7Troubleshooting} />
        </section>

        <!-- Decision Tree Section -->
        <section id="decision-tree-path" class="bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div class="border-b border-slate-800 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block mb-1">DECISION LOGIC // ACTION PATHS</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              第八章：用户决策分支与全平台实操路线图
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">根据具体操作系统与核心使用场景，直接沿分支执行最优化方案</p>
          </div>

          <div class="space-y-6 text-xs sm:text-sm font-mono leading-relaxed">
            <!-- Branch 1 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-emerald-400 text-base mb-2">分支一：Windows 电脑小白用户，追求稳定看 4K 视频与学术查资料</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>访问 GitHub 官方 Releases 仓库，下载 <code class="text-sky-300">Clash.Verge_x.x.x_x64-setup.exe</code> 完成安装；</li>
                <li>在设置中将语言切换为中文，进入「设置 -> 内核」确认使用默认的 Mihomo 内核；</li>
                <li>在「订阅」页面粘贴机场提供的 Clash 格式订阅 URL，点击「导入」；</li>
                <li>在「代理」页面将模式保持在「规则（Rule）」，策略组选择延迟测试最低的香港或日本专线；</li>
                <li>开启「系统代理」开关，即刻秒开 4K 视频并正常访问学术科研数据库。</li>
              </ol>
            </div>

            <!-- Branch 2 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-sky-400 text-base mb-2">分支二：跨国外贸、跨境电商与 AI 生产力业务的高防风控环境配置</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>客户端选型：必须选用支持 TUN 虚拟网卡全流量接管的 Clash Verge Rev；</li>
                <li>安装 Wintun 驱动服务模式，开启 TUN 模式，确保命令行终端与桌面环境无死角代理；</li>
                <li>节点类型选择：坚决避免普通公网广播 IP，选用标注有「原生住宅 IP / 纯净 IP」标签的 IEPL 专线；</li>
                <li>浏览器防穿透：安装 WebRTC Control 扩展彻底关闭 WebRTC 真实 IP 泄漏；</li>
                <li>策略组设置：针对 OpenAI、PayPal 域名绑定固定的出口节点，防止频繁跳 IP 导致封号。</li>
              </ol>
            </div>

            <!-- Branch 3 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-amber-400 text-base mb-2">分支三：Mac 苹果笔记本用户，追求极低功耗与无缝休眠唤醒</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>进入 GitHub 下载带有 <code class="text-sky-300">aarch64.dmg</code> 标志的安装包（适配 Apple Silicon 芯片）；</li>
                <li>拖入「应用程序」文件夹，首次打开若提示未经签名，在「系统设置 -> 隐私与安全性」中点击「仍要打开」；</li>
                <li>开启设置中的「开机自启动」与「静默启动」，配置定时每 24 小时自动更新订阅；</li>
                <li>合上笔记本盖子休眠唤醒后，Tauri 原生架构无需重启进程即可在 1 秒内无感恢复连通。</li>
              </ol>
            </div>

            <!-- Branch 4 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-purple-400 text-base mb-2">分支四：Android 手机用户，需要精确的分应用代理配置</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>下载安装 Clash Meta for Android 最新 Release APK；</li>
                <li>导入订阅配置并激活，进入「配置 -> 应用分流」开关；</li>
                <li>勾选「仅代理选中的应用」，将 Chrome、YouTube、Telegram、Twitter 勾选，国内微信、支付宝保持直连；</li>
                <li>有效杜绝后台无谓唤醒与无效流量消耗，大幅延长手机全天续航时间。</li>
              </ol>
            </div>

            <!-- Branch 5 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-rose-400 text-base mb-2">分支五：软路由 / 局域网透明代理部署与全屋无感翻墙</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>网络设备选型：采用 x86 工控机或友善 NanoPi 软路由，部署 OpenClash 或 HomeProxy；</li>
                <li>核心模式配置：推荐开启 Meta 内核的 Fake-IP (TUN 混合模式)，将网关 IP 指向软路由；</li>
                <li>上游 DNS 搭配：接入 MosDNS 或 AdGuard Home，实现国内外 DNS 精准分流与广告过滤；</li>
                <li>终端体验：全屋电视盒子（Apple TV、Google TV）、手机电脑免装客户端，开机即秒开 4K。</li>
              </ol>
            </div>
          </div>
        </section>

        <!-- Chapter 9: Exhaustive FAQ -->
        <section id="comprehensive-faq" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <FAQSection
            title="第九章：Clash 客户端 12大高频疑问深度 FAQ"
            headingLevel="h2"
            items={clashFaqs}
          />
        </section>

        <!-- Chapter 10: Verified High-Availability Backups (Affiliate CTA) -->
        <section id="verified-backups" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 10 // VERIFIED COMPATIBILITY</span>
            <h2 class="text-2xl font-bold text-slate-900">
              第十章：Clash 客户端深度兼容与实测推荐梯队
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">以下服务商经本站测评实验室连续 90 天以上网络稳定性跟踪，完美原生支持 Clash YAML 与 Mihomo 协议</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <BrandCard brand={featuredBrand} />
            <BrandCard brand={topBrands[1] || topBrands[0]} />
          </div>

          <!-- Primary Brand Compliant Affiliate CTA -->
          <BrandAffiliateCTA
            brand={featuredBrand}
            customText="Clash 客户端首选高可用配置方案：光速云（IEPL企业级双专线架构，年付折合¥8/月，支持一键导入Clash Verge与致敬斯诺克147永久不过期包）"
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
            <span>本页专著级目录导航</span>
          </h3>

          <nav class="space-y-1.5 text-xs text-slate-600 font-medium">
            <a href="#answer-first" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 核心速览与全平台选型表
            </a>
            <a href="#topic-matrix" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; Clash 客户端 7大二级专题矩阵
            </a>
            <a href="#ecosystem-evolution" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第一章：生态演进与Mihomo内核
            </a>
            <a href="#download-security" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第二章：官方下载防钓鱼指南
            </a>
            <a href="#routing-and-policy" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第三章：分流规则与策略组构建
            </a>
            <a href="#tun-mode-mechanics" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第四章：TUN虚拟网卡全流量接管
            </a>
            <a href="#dns-fakeip-security" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第五章：DNS防污染与Fake-IP
            </a>
            <a href="#operational-walkthrough" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第六章：4K秒开实操运行手册
            </a>
            <a href="#troubleshooting-runbook" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第七章：网络死锁排障指令库
            </a>
            <a href="#decision-tree-path" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第八章：用户决策分支与操作路线
            </a>
            <a href="#comprehensive-faq" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第九章：高频疑问与边界问题 FAQ
            </a>
            <a href="#verified-backups" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第十章：实测高可用专线与精选梯队
            </a>
          </nav>
        </div>

        <!-- 31 Brands Database Fast Access -->
        <div class="bg-gradient-to-br from-brand-50 to-blue-50/50 rounded-2xl border border-brand-100 p-6 shadow-sm text-xs">
          <span class="font-bold text-brand-700 uppercase tracking-wider block mb-1">
            客观数据库索引中心
          </span>
          <h4 class="text-base font-bold text-slate-900 mb-2">31家机场参数筛选库</h4>
          <p class="text-slate-600 leading-relaxed mb-4">
            已对全网 31 家主流服务商的线路、价格、优惠码与解锁状态完成事实审计，支持多维条件即时过滤。
          </p>
          <a
            href="/brands/"
            class="block w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-center shadow-md shadow-brand-500/20 transition-all"
          >
            打开品牌参数筛选器 &rarr;
          </a>
        </div>

        <!-- Secondary Topics Direct Links -->
        <div class="bg-white rounded-2xl border border-surface-border p-5 shadow-sm text-xs">
          <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-1.5">
            <span class="w-1.5 h-4 bg-brand-600 rounded-full"></span>
            Clash 客户端 二级专题直达
          </h4>
          <div class="space-y-1.5">
            <a href="/clash/recommend/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 全平台 Clash 客户端推荐榜
            </a>
            <a href="/clash/verge/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; Clash Verge Rev 功能全解析
            </a>
            <a href="/clash/verge-download/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 官方安全下载源与安装避坑
            </a>
            <a href="/clash/verge-subscription/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 订阅导入与自动更新设置
            </a>
            <a href="/clash/meta/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; Mihomo (Clash.Meta) 内核特性
            </a>
            <a href="/clash/tutorial/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 全平台图文新手配置教程
            </a>
            <a href="/clash/troubleshooting/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 节点超时与TUN报错彻底排查
            </a>
          </div>
        </div>

      </aside>

    </div>
  </div>
</BaseLayout>
`;

fs.writeFileSync('src/pages/clash/index.astro', astroTemplate, 'utf8');
console.log('Successfully written src/pages/clash/index.astro');

// Total Chinese character count calculation
const totalText = Object.values(textBlocks).join('\n') + '\n' + astroTemplate;
const grandTotalChinese = countChineseCharacters(totalText);
console.log('Grand Total Pure Chinese Characters across clash page & content:', grandTotalChinese);
