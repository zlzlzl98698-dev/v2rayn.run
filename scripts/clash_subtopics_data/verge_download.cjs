module.exports = {
  slug: 'verge-download',
  file: 'src/pages/clash/verge-download.astro',
  meta: {
    title: 'Clash Verge Rev 官方安全下载：全平台安装包鉴真、哈希校验与防钓鱼避坑 | v2rayn指南',
    description: 'v2rayn指南测评实验室权威出品：Clash Verge Rev官方唯一GitHub下载地址、Windows/macOS/Linux各架构安装包命名规范、SHA256哈希比对防篡改代码与系统报错排障。',
    canonical: 'https://v2rayn.run/clash/verge-download/',
    headline: 'Clash Verge Rev 官方安全下载指南：各平台安装包选型、防钓鱼核验与安装避坑',
    datePublished: '2026-10-24T08:00:00+08:00',
    dateModified: '2026-11-18T19:40:00+08:00',
  },
  answerFirst: `
下载开源客户端时，**防范钓鱼木马是关乎资产安全的第一道防线**。
百度与必应等国内搜索引擎充斥着大量购买商业广告排名的“Clash 绿色版 / 汉化版”钓鱼网站，此类安装包超过 85% 夹带后门木马，会暗中盗取浏览器密码与数字货币资产。
**唯一官方开源发布渠道**：必须认准 GitHub 官方维护组织仓库：
\`https://github.com/clash-verge-rev/clash-verge-rev/releases\`
**安装包速决下载指南**：
1. **Windows 10/11 绝大多数电脑**：下载 \`Clash.Verge_x.x.x_x64-setup.exe\`（便携绿色免安装版选 \`x64_portable.zip\`）；
2. **Mac 电脑 (M1/M2/M3/M4 Apple Silicon 芯片)**：下载 \`Clash.Verge_x.x.x_aarch64.dmg\`；
3. **Mac 电脑 (旧款 Intel 芯片)**：下载 \`Clash.Verge_x.x.x_x64.dmg\`；
4. **Android 安卓手机**：前往 \`MetaCubeX/ClashMetaForAndroid\` 官方仓库下载 \`arm64-v8a.apk\`。
`,
  table1: `
| 目标操作系统与硬件平台 | 推荐官方安装包文件名格式 | 包体类型与特点 | 关键系统依赖库 | 常见安装风险与防坑提示 |
|---------------------|------------------------|--------------|--------------|----------------------|
| **Windows 10/11 (64位 Intel/AMD)** | \`Clash.Verge_x.x.x_x64-setup.exe\` | 完整安装包 (自带自动更新) | 需系统内置 Edge WebView2 | 若精简版系统报错闪退，需手动补装微软官方 WebView2 |
| **Windows 便携免安装版** | \`Clash.Verge_x.x.x_x64_portable.zip\` | 绿色便携 (解压即用) | 解压即用，不写注册表 | 适合公司办公电脑或装在 U 盘中随时使用 |
| **Windows ARM 架构 (高通骁龙)** | \`Clash.Verge_x.x.x_arm64-setup.exe\` | 原生 ARM64 指令集编译 | Surface Pro 等高通轻薄本 | 切勿错误下载 x64 包，原生架构功耗更低、性能更强 |
| **macOS (M1/M2/M3/M4 苹果芯片)** | \`Clash.Verge_x.x.x_aarch64.dmg\` | 原生 Apple Silicon 架构 | macOS 11.0 以上原生运行 | 绝大部分近 4 年购买的 Mac 均应选择该包，不发热省电 |
| **macOS (旧款 Intel 处理器)** | \`Clash.Verge_x.x.x_x64.dmg\` | x86_64 传统架构 | Intel CPU 老款 Mac 电脑 | 首次打开若提示损坏，需在终端执行 xattr 属性清除命令 |
| **Linux (Ubuntu / Debian / Arch)**| \`.deb\` / \`.rpm\` / \`.AppImage\` | 跨发行版独立包 | 依赖系统 webkit2gtk 库 | 极客开发者首选，支持后台 systemd 无头常驻运行 |
`,
  chap1: `
### 1. 搜索引擎山寨钓鱼高仿站黑色产业链大揭秘

为什么“Clash 下载”会成为网络黑产与黑帽黑客的主攻阵地？
- **关键词商业竞价黑幕**：由于科学上网在普通搜索引擎中缺乏官方商业客服介入，黑客团队通过外贸公司代投广告或泛目录寄生虫技术，将山寨高仿钓鱼网站推至搜索结果首页前三位；
- **伪造“一键免费翻墙”陷阱**：山寨网站通常打着“Clash 绿色免费加速器”、“内置高速节点”的幌子，提供一键运行的 EXE 文件；
- **植入后台 APT 远程控制木马**：一旦用户安装，恶意软件会在系统后台常驻，悄悄窃取浏览器的 Cookies、密码凭据与加密货币钱包助记词，甚至将电脑作为挖矿肉鸡。

> [!WARNING]
> **官方正版特征**：真正的正版 Clash Verge Rev 是一款**纯粹的开源网络工具**，其官方软件内部**绝对不会内置任何免费节点**，也绝对不会强制要求用户在软件内充值付费！凡是宣称“内置永久节点、一键付费开通”的客户端，100% 为山寨钓鱼套壳软件。
`,
  chap2: `
### 2. 官方安装包 SHA-256 哈希防篡改审计实战

在运行从任何第三方网盘或社群下载的安装包之前，必须在本地执行 SHA-256 哈希值核验：

#### Windows PowerShell 一键哈希校验指令：
打开 PowerShell 终端，切换到下载目录，执行以下命令：
\`\`\`powershell
# 计算安装包的真实 SHA256 哈希指纹
Get-FileHash -Path ".\\Clash.Verge_*.exe" -Algorithm SHA256 | Format-List
\`\`\`
将终端输出的 **Hash 长字符串**，与 GitHub Releases 页面对应版本下方公布的 \`sha256sum\` 或 \`.sha256\` 文件内容进行逐字比对。只要有一个字符不一致，说明文件已被恶意篡改或下载过程损坏，坚决不要双击运行！

#### 验证微软 Authenticode 数字签名：
1. 右键下载好的安装包 EXE，选择「属性」；
2. 切换到「数字签名」标签页；
3. 查看签名人信息与签名时间戳，确认显示为“此数字签名正常”。
`,
  chap3: `
### 3. Windows 平台安装避坑与常见报错修复

在 Windows 电脑上安装使用时，新手最容易遇到以下两类报错：

#### 报错一：启动即闪退或提示“找不到 WebView2 运行时”
- **成因**：Clash Verge Rev 采用 Tauri 架构，依赖操作系统自带的 Microsoft Edge WebView2 渲染组件。某些精简版、幽灵版或老旧 Windows 10 系统移除了该组件；
- **彻底解决方法**：前往微软官方网站搜索并下载「Microsoft Edge WebView2 独立常青版引导程序 (Evergreen Bootstrapper)」，双击安装完成后重新启动客户端即可。

#### 报错二：国内杀毒软件（360、腾讯电脑管家）报毒拦截
- **成因**：由于开源客户端包含底层虚拟网卡驱动（\`Wintun.dll\`），国内杀软会将其误报为敏感网络驱动；
- **安全处置**：只要是从官方 GitHub Releases 下载且 SHA256 比对正确的安装包，可直接在杀软中点击“信任并放行”，或推荐直接使用 Windows 10/11 原生自带的 Windows Defender 安全中心。
`,
  chap4: `
### 4. macOS 平台安装避坑：解除 Gatekeeper“文件已损坏”拦截

Mac 用户在安装开源 DMG 文件时，经常遇到系统弹窗提示：“「Clash Verge」已损坏，您应该将它移到废纸篓”：

\`\`\`bash
# macOS 一键解除开源软件隔离属性命令
sudo xattr -cr /Applications/Clash\ Verge.app
\`\`\`

#### 操作三步法：
1. 将下载的 \`aarch64.dmg\` 双击打开，将「Clash Verge」图标拖入右侧的「Applications (应用程序)」文件夹；
2. 打开 Mac 自带的「终端 (Terminal)」APP，复制粘贴上述 \`sudo xattr -cr ...\` 命令并按下回车；
3. 终端会提示输入开机密码（输入时屏幕不显示密码字符，直接盲输后按回车）；
4. 再次双击打开 Clash Verge，即可无缝秒开，不再弹出任何拦截报错！
`,
  decisionTree: [
    {
      title: "分支一：Windows 电脑新手，想要最省心的安装体验",
      steps: [
        "第一步：认准官方 GitHub Releases 页面，下载带有 x64-setup.exe 的安装程序；",
        "第二步：保持默认路径安装，双击桌面生成的快捷方式；",
        "第三步：若提示管理员权限，点击允许，并在设置中一键切换为中文界面。"
      ]
    },
    {
      title: "分支二：公司办公电脑或网吧受限环境，无法安装软件",
      steps: [
        "第一步：在 GitHub Releases 中下载带有 x64_portable.zip 的绿色便携压缩包；",
        "第二步：解压到本地任意目录（或 U 盘），直接双击 Clash Verge.exe 运行；",
        "第三步：所有配置文件保存在解压目录内，不写入系统注册表，即插即用、拔出即走。"
      ]
    },
    {
      title: "分支三：Mac 苹果电脑用户安装",
      steps: [
        "第一步：点击屏幕左上角苹果图标 ->「关于本机」，查看处理器型号；",
        "第二步：若显示 M1/M2/M3/M4 芯片，必须下载 aarch64.dmg；若显示 Intel Core 处理器，下载 x64.dmg；",
        "第三步：拖入应用程序文件夹，若提示未签名，使用终端 sudo xattr 命令一秒解除拦截。"
      ]
    }
  ],
  faqs: [
    {
      question: "1. 为什么在 GitHub 下载速度特别慢，经常断连？",
      answer: "因为 GitHub 的下载服务器位于境外，国内直连容易受到运营商 QoS 限速。解决方法：可以使用本站推荐的稳定机场节点加速后再下载，或者使用权威的 GitHub 文件加速镜像服务进行拉取。"
    },
    {
      question: "2. 下载页面有那么多个文件，x64、arm64、aarch64 到底有什么区别？",
      answer: "x64 代表传统的 64 位 Intel 和 AMD 处理器（市面上 90% 以上的 Windows 电脑）；arm64 代表搭载高通骁龙等 ARM 架构的 Windows 轻薄本；aarch64 代表搭载 Apple Silicon 芯片（M1/M2/M3/M4）的 Mac 苹果电脑。根据自己的硬件架构精准下载，才能保证最低功耗与最高性能。"
    },
    {
      question: "3. 下载的安装包有必要每次都手动校验 SHA256 哈希吗？",
      answer: "如果您是直接在 GitHub 官方 Releases 页面通过 HTTPS 加密通道下载的，通常无需过度担心篡改；但如果您是从电报群、网盘或技术博客转存的链接中下载，强烈建议按本文指令执行 SHA256 校验，防止被第三方黑客植入木马后门。"
    },
    {
      question: "4. 安装后打不开，提示缺少 msvcp140.dll 或 vcruntime140.dll 怎么办？",
      answer: "这是因为您的精简版 Windows 系统缺少微软常用的 Visual C++ 运行库组件。前往微软官方网站下载「Visual C++ Redistributable (X64)」安装包，安装后重启电脑即可彻底解决。"
    },
    {
      question: "5. 新版本发布后，客户端该如何平滑升级？会丢失原有订阅和设置吗？",
      answer: "不会丢失！Clash Verge Rev 的订阅和用户个性化配置独立存储在用户的 AppData 目录中。新版本发布后，直接下载新版 setup.exe 覆盖安装即可平滑升级，所有订阅、策略组与扩展配置会自动完整保留。"
    }
  ],
  recommendedBrandCustomText: "安全下载 Clash Verge 后的高可用节点配置首选：光速云（IEPL企业级双专线架构，年付折合¥8/月，支持一键导入Clash Verge与致敬斯诺克147永久不过期包）",
  relatedSubtopics: [
    { href: '/clash/recommend/', title: '全平台 Clash 客户端推荐榜' },
    { href: '/clash/verge/', title: 'Clash Verge Rev 功能全解析' },
    { href: '/clash/verge-subscription/', title: '订阅导入与自动更新设置' },
    { href: '/clash/meta/', title: 'Mihomo (Clash.Meta) 内核特性' },
    { href: '/clash/tutorial/', title: '全平台图文新手配置教程' },
    { href: '/clash/troubleshooting/', title: '节点超时与TUN报错彻底排查' }
  ]
};
