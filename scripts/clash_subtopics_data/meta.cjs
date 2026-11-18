module.exports = {
  slug: 'meta',
  file: 'src/pages/clash/meta.astro',
  meta: {
    title: 'Mihomo (Clash.Meta) 内核深度解析：新一代协议支持与高级特性专著 | v2rayn指南',
    description: 'v2rayn指南测评实验室权威出品：Mihomo(Clash.Meta)开源演进史、VLESS Reality与Hysteria 2底层机理、Sniffer域名嗅探引擎、FullCone NAT游戏穿透与内核升级实操。',
    canonical: 'https://v2rayn.run/clash/meta/',
    headline: 'Mihomo (Clash.Meta) 内核技术专著：架构革命、抗封锁协议与高阶特性深度指南',
    datePublished: '2026-10-26T08:00:00+08:00',
    dateModified: '2026-11-18T19:50:00+08:00',
  },
  answerFirst: `
**Mihomo (原名 Clash.Meta)** 是现代开源分流代理生态中无可替代的**底层核心发动机**。
自 2023 年底原版 Clash Premium 内核停更后，Mihomo 社区接管了所有的网络协议创新与性能重构。
**Mihomo 带来的四大技术革命**：
1. **全面拥抱现代化抗封锁协议**：原生完整支持 **VLESS Reality**（模拟权威网站 TLS 握手）、**Hysteria 2**（UDP 自适应极速拥塞控制）与 **TUIC** 协议，彻底终结了 VMess 与 Shadowsocks 易被特征识别的断代痛点；
2. **深度集成 Wintun 极速虚拟网卡**：网络数据在内核空间完成零拷贝（Zero-Copy）环形缓冲转发，轻松跑满万兆局域网与千兆宽带；
3. **强大的 Sniffer 域名嗅探引擎**：在纯 IP 通信中实时从 TLS Client Hello 中提取 SNI 真实域名，彻底消灭传统 IP 分流盲区；
4. **原生 FullCone NAT 穿透**：将局域网游戏端口映射为 NAT Type A (Open)，为联机对战与实时语音提供零丢包网络环境。
`,
  table1: `
| 核心技术维度 | 传统原版 Clash 内核 (停更) | 现代 Mihomo (Clash.Meta) 内核 | 升级带来的实际体验飞跃 |
|-------------|--------------------------|-----------------------------|----------------------|
| **代理协议支持矩阵**| 仅 SS / VMess / Trojan / Socks5 | **VLESS (Reality), Hysteria 2, TUIC, WireGuard, SSH, Shadowsocks2022** | 完美兼容所有现代抗审查机场，节点永不报协议错误 |
| **TUN 模式底层驱动**| 依赖老旧 TAP-Windows (限速 300Mbps) | **深度原生集成 Wintun 极速环形队列驱动** | 吞吐率轻松突破 9,500+ Mbps (跑满万兆)，CPU 占用下降 70% |
| **DNS 增强解析架构**| 基础 Redir-Host / 粗糙 Fake-IP | **先进 Fake-IP 哈希映射 + DoH / DoT / DoQ 多级管道** | 本地建连 0ms 即时响应，彻底免疫运营商 DNS 投毒劫持 |
| **流量域名嗅探引擎**| 无或依赖复杂外部插件 | **内置智能 Sniffer 嗅探引擎 (提取 TLS SNI 与 HTTP Host)** | 应用程序直接向 IP 发起请求时，仍能精准匹配域名规则 |
| **游戏 NAT 穿透类型**| 对称型 NAT (Symmetric NAT) | **原生 FullCone NAT (NAT Type A / Open)** | 消除 Switch / PS5 / Steam 联机派对掉线与语音黑屏 |
| **规则集订阅机制** | 仅支持长篇静态规则堆叠 | **支持 Rule-Providers 动态拉取与高效 Geosite/Geoip 二进制库** | 配置体积减小 90%，十万条规则秒级匹配不卡顿 |
`,
  chap1: `
### 1. 从原版 Clash 到 Mihomo：开源涅槃与社区标准重塑

2023 年底的“删库大地震”是整个科学上网技术生态的转折点：
- **旧版内核的历史局限**：原作者维护的 \`Dreamacro/clash\` 闭源了核心的 Premium 特性，且开发节奏缓慢。随着防火墙主动探测算法升级，传统的 VMess 协议与未加混淆的 Shadowsocks 特征愈发明显，在敏感时期大批机房 IP 遭遇精准封锁；
- **Mihomo (Clash.Meta) 社区的崛起**：早在原作者停更之前，由 MetaCubeX 团队主导的开源分支就已经在底层网络栈上展开激进创新。删库事件后，Mihomo 社区迅速吸收全球开源贡献者，不仅完全开源了全部核心代码，更将内核重命名为 **Mihomo**（寓意“深海中的璀璨明珠”）；
- **事实级行业标准的奠定**：今天，无论您使用的是 Clash Verge Rev、Clash Meta for Android 还是 OpenClash，其底层的网络路由引擎 100% 均基于 Mihomo 内核。Mihomo 已经成为后 Clash 时代中文互联网分流代理的通用标准。
`,
  chap2: `
### 2. VLESS Reality 与 Hysteria 2 协议底层机理解析

Mihomo 之所以能保证在恶劣网络环境下依然流畅，归功于其对新协议的底层实现：

#### 深度解析：VLESS Reality 的“大隐隐于市”
1. **摒弃传统自签证书特征**：传统 Trojan 或 VMess+TLS 必须自己申请并配置一个域名证书，防火墙通过主动探测证书颁发机构和 SNI 即可轻易标记疑似节点；
2. **偷天换日的握手模拟**：Reality 技术借用全球权威大厂（如 Apple、Microsoft、Amazon）的真实有效证书与 SNI 域名。当防火墙对您的连接进行主动探测时，服务端直接将请求透明转发给微软或苹果真实服务器；
3. **防御主动探测**：审查设备收到的 TLS 握手证书 100% 为微软官方真实证书，完全无法在握手阶段提取任何代理指纹，实现了真正意义上的“不可探测”。

#### 深度解析：Hysteria 2 的 Brutal 拥塞控制算法
- **基于 UDP 协议**：传统 TCP 协议在遇到跨海海缆微小丢包（如 5%）时，会触发 TCP 慢启动机制导致传输速率断崖式下跌 70% 以上；
- **暴力前向纠错与自适应速率**：Hysteria 2 采用专为代理环境设计的 Brutal 拥塞控制算法，忽略常规丢包信号，强行按照用户预设的物理带宽上限高速吞吐，即使在晚高峰国际出口丢包率达 20% 的公网线路上，依然能够秒开 4K 原画视频。
`,
  chap3: `
### 3. Sniffer 流量域名嗅探引擎与 FullCone NAT 游戏优化

Mihomo 内核在很多看似微小的细节上进行了极客级优化：

#### 1. Sniffer 域名嗅探引擎实操：
在很多场景下，客户端应用程序（如 Telegram、特定的工业软件、部分移动端 APP）在发送网络请求时，不经过本地 DNS 查询，而是直接硬编码了境外的物理 IP。
\`\`\`yaml
# Mihomo 核心 Sniffer 嗅探配置示例
sniffer:
  enable: true
  sniff:
    TLS:
      ports: [443, 8443]
    HTTP:
      ports: [80, 8080-8880]
  skip-domain:
    - "Mijia Cloud"
    - "dlg.io.mi.com"
\`\`\`
**运作原理**：当数据包流经 Mihomo 时，Sniffer 引擎会解析 TLS Client Hello 握手包中的 SNI 扩展字段，将原本隐藏在数据流内部的域名（例如 \`api.telegram.org\`）强行提取出来，并重新递交给分流规则树进行精准判定，彻底杜绝了“因无域名导致直接命中兜底 MATCH 规则”的误判。

#### 2. FullCone NAT 原生穿透：
为联机对战网游（如 Switch 喷射战士、PS5 怪物猎人、Steam 派对游戏）带来质的提升。Mihomo 维护了一个高效的 UDP NAT 端口映射表，实现真正的全锥形 NAT 转发，游戏设备测出来的 NAT 类型直接晋升为最高等级的 **NAT Type A**，彻底解决主机联机无法加入战局与队友语音无声的痛点。
`,
  chap4: `
### 4. 客户端内核版本检查与手动无缝升级方法

虽然 Clash Verge Rev 等主流客户端会定期捆绑更新内核，但极客用户可以随时手动换上最新的 Mihomo Alpha / Release 核心：

#### Windows 平台手动替换内核三步法：
1. 访问 GitHub 官方仓库：\`https://github.com/MetaCubeX/mihomo/releases\`；
2. 下载最新带有 \`windows-amd64.zip\`（或 \`windows-amd64-compatible.zip\`）标志的发布压缩包；
3. 打开 Clash Verge Rev 设置页面，点击「打开应用目录」，进入 \`bin\` 文件夹；
4. 彻底退出 Clash Verge 托盘进程，将下载解压出的 \`mihomo.exe\` 替换原有的内核二进制文件，重新启动软件即可享受最新内核的高级特性。
`,
  decisionTree: [
    {
      title: "分支一：日常极速观影与全网漫游用户",
      steps: [
        "第一步：在客户端中确认内核类型切换为 Mihomo；",
        "第二步：选用支持 Hysteria 2 协议的专线节点（如光速云）；",
        "第三步：开启 Rule 规则分流，体验 4K@60fps 极速无缓冲秒开。"
      ]
    },
    {
      title: "分支二：主机游戏玩家与联机对战极客",
      steps: [
        "第一步：在 Mihomo 配置中确认开启 UDP 与 FullCone NAT 特性；",
        "第二步：开启客户端 TUN 模式，并将游戏主机网关指向该电脑；",
        "第三步：进入主机网络测试，NAT 类型跃升为 NAT Type A，语音联机秒匹配。"
      ]
    },
    {
      title: "分支三：跨境金融与外贸防风控用户",
      steps: [
        "第一步：选用搭载 VLESS Reality 协议并绑定原生纯净 IP 的专线出口；",
        "第二步：利用 Sniffer 嗅探引擎确保所有 API 均经过特定分流规则；",
        "第三步：固定策略组节点，彻底阻断多 IP 漂移导致的风控封号。"
      ]
    }
  ],
  faqs: [
    {
      question: "1. Mihomo 和 Clash.Meta 到底是什么关系？是同一个东西吗？",
      answer: "是的，完全是同一个项目！早期的开源分支命名为 Clash.Meta，后来为了彻底摆脱旧版 Clash 历史包袱与版权混淆，社区官方正式将其更名为「Mihomo」。各大客户端设置中的「Clash.Meta」与「Mihomo」均指代该内核。"
    },
    {
      question: "2. 为什么有些老机场的订阅在 Mihomo 内核上无法正常工作？",
      answer: "Mihomo 内核严格遵循标准网络协议规范。部分极老旧的黑机场采用非标准的魔改 Shadowsocks 混淆或格式错乱的 YAML 语法，现代内核会出于安全考虑拒绝解析该畸形包。推荐选购符合现代标准格式的正规服务商。"
    },
    {
      question: "3. Mihomo 相比 Sing-box 内核谁更优秀？",
      answer: "两者在底层抗封锁能力上处于同一顶级水准。差异在于生态：Mihomo 完美向下兼容庞大的 Clash YAML 生态与现成客户端，上手门槛极低；而 Sing-box 采用全新的 JSON 语法结构，配置繁琐，更偏向极客开发者与超低配单板路由器。"
    },
    {
      question: "4. 如何在 Clash Verge Rev 中确认当前运行的是否是 Mihomo 内核？",
      answer: "打开 Clash Verge Rev，进入左侧「设置 -> 内核 (Core)」，查看当前勾选的项目。如果选中的是「Mihomo (或 Clash.Meta)」且版本号显示为 1.18+ 以上，说明正在享受最新的现代内核技术红利。"
    },
    {
      question: "5. Mihomo 内核的内存管理效率如何？",
      answer: "Mihomo 在 Go 语言运行时层面重构了内存垃圾回收策略，在面对数千个长连接的高并发请求时，内存能迅速释放并复用空闲缓冲区，长时间高负荷下载也不会出现内存溢出或 CPU 100% 锁死现象。"
    }
  ],
  recommendedBrandCustomText: "Mihomo 内核全协议深度适配标杆方案：光速云（IEPL企业级双专线架构，年付折合¥8/月，支持一键导入Clash Verge与致敬斯诺克147永久不过期包）",
  relatedSubtopics: [
    { href: '/clash/recommend/', title: '全平台 Clash 客户端推荐榜' },
    { href: '/clash/verge/', title: 'Clash Verge Rev 功能全解析' },
    { href: '/clash/verge-download/', title: '官方安全下载源与安装避坑' },
    { href: '/clash/verge-subscription/', title: '订阅导入与自动更新设置' },
    { href: '/clash/tutorial/', title: '全平台图文新手配置教程' },
    { href: '/clash/troubleshooting/', title: '节点超时与TUN报错彻底排查' }
  ]
};
