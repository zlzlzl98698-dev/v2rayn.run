module.exports = {
  slug: 'troubleshooting',
  file: 'src/pages/clash/troubleshooting.astro',
  meta: {
    title: 'Clash 故障排查彻底手册：无法连接、端口占用、DNS污染与节点超时全解 | v2rayn指南',
    description: 'v2rayn指南测评实验室权威出品：Clash客户端常见报错代码速查字典、断网自救PowerShell脚本、7890端口冲突解决、TUN模式驱动报错与DNS污染排障指南。',
    canonical: 'https://v2rayn.run/clash/troubleshooting/',
    headline: 'Clash 客户端深度故障排障手册：全场景网络死锁自救与错误代码彻底修复',
    datePublished: '2026-10-28T08:00:00+08:00',
    dateModified: '2026-11-18T20:00:00+08:00',
  },
  answerFirst: `
当 Clash 客户端遭遇“网页打不开”、“断代理后全网断网”或“端口被占用”时，**请务必保持冷静，切勿病急乱投医重装系统**。
根据 v2rayn指南 实验室万次排障统计，95% 以上的故障均源于以下三大典型原因：
1. **Windows 注册表系统代理残留**：电脑非正常关机或客户端闪退后，代理开关未还原，导致断网。按 Win+X 运行 PowerShell 一键重置注册表即可秒级恢复；
2. **7890 端口被冲突进程占用**：提示 \`bind: address already in use\`。通过命令查询占用该端口的 PID 结束该进程，或在设置中将端口改为 \`7891\`；
3. **系统时间严重偏差**：本机时间与国际标准时间（NTP）相差超过 90 秒，导致 TLS 证书握手被强行切断。在系统设置中点击「立即同步时间」即可恢复。
`,
  table1: `
| 故障表现与报错现象 | 底层核心成因 | 严重等级 | 一分钟应急自救指南 | 彻底根除防复发建议 |
|------------------|------------|---------|------------------|------------------|
| **关掉 Clash 后全网断网，开代理反而能上网** | 注册表 ProxyEnable 依然为 1，关机未还原 | 高 | 执行 PowerShell 注册表清理命令，将 ProxyEnable 设为 0 | 退出软件时通过托盘菜单右键「退出」，避免任务管理器强制杀进程 |
| **提示 \`address already in use :7890\`** | 其他后台软件（旧代理软件、IDM）抢占 7890 端口 | 中 | 在设置中将混合代理端口修改为 \`7891\` 或 \`17890\` | 使用 \`netstat -ano\` 命令找出抢占端口的 PID 彻底卸载冲突软件 |
| **节点显示绿色延时，但网页依然超时打不开** | 默认测速只是入口 TCP Ping，中转到落地专线断开 | 中 | 将测速地址修改为 \`https://www.google.com/generate_204\` | 切换到真正通过 HTTP 握手测速可用的备用专线节点 |
| **开启 TUN 模式提示 \`failed to create tun\`** | 驱动权限不足或残留旧版 TAP 虚拟网卡冲突 | 高 | 右键以管理员身份运行，并重新点击「服务模式 -> 安装」 | 打开 Windows 设备管理器，卸载所有带 TAP 标识的残留网卡 |
| **任务栏 Wi-Fi 图标出现黄色感叹号无网络** | Fake-IP 拦截了微软 NCSI 探测服务器连通包 | 低 (虚假误报) | 在设置中开启「修复 NCSI 探测」开关 | 将 \`msftconnecttest.com\` 加入 fake-ip-filter 过滤白名单 |
| **日志提示 \`certificate signed by unknown authority\`** | 本机系统时钟偏差大于 90 秒，SSL 握手失效 | 高 | 打开 Windows「日期与时间」，点击「立即同步」 | 开启 Windows 自动时间同步，更换为可靠的阿里 NTP 服务器 |
`,
  chap1: `
### 1. 关机死锁自救：一键修复 Windows 代理残留断网

这是新手最常遇到的“崩溃型”故障：昨天电脑开着 Clash 翻墙看视频，直接拔电源关机；今天开机后发现连百度、微信都打不开了，微信一直在连接中，但重新打开 Clash 开启代理又能上网。

#### 底层机理剖析：
Windows 的系统代理设置存储在操作系统的注册表项中。当您勾选 Clash 的「系统代理」开关时，软件将 \`ProxyEnable\` 设置为 1；正常退出软件时，软件会负责将其改回 0。但如果您直接关机、电脑意外断电或客户端闪退，该注册表项依然停留在 1，但本地 7890 端口已经没有程序在监听，所有常规网络流量撞墙中断，造成“全网瘫痪”。

#### PowerShell 一键自救代码：
按键盘上的 \`Win + X\` 组合键，在弹出的菜单中选择 **Windows PowerShell (管理员)** 或 **终端 (管理员)**，直接复制粘贴以下两行命令并按回车：

\`\`\`powershell
# 一键清除 Windows 系统代理残留，瞬间恢复正常上网
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 0
Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyServer -ErrorAction SilentlyContinue
\`\`\`
执行完毕后，无需重启电脑，立刻刷新浏览器，国内网络直连瞬间完全恢复！
`,
  chap2: `
### 2. 端口冲突定位与杀灭：快速解除 7890 端口占用

当启动软件或切换内核时，如果弹出错误对话框：
\`listen tcp 127.0.0.1:7890: bind: only one usage of each socket address is normally permitted\`
这说明操作系统的 7890 端口已经被其他后台进程强行占用了。

#### 方案一：最快解决（改端口）
直接在 Clash Verge Rev 的「设置 -> 网络设置」中，将「混合代理端口 (Mixed Port)」从 \`7890\` 改为 \`7891\`、\`17890\` 或任意 10000 以上的生僻端口，点击保存即可瞬间启动成功。

#### 方案二：揪出真凶进程（命令行定位）
按 \`Win + R\` 输入 \`cmd\` 回车打开命令提示符，执行以下指令：
\`\`\`cmd
netstat -ano | findstr 7890
\`\`\`
终端会返回类似这样的行：
\`\`\`text
  TCP    127.0.0.1:7890         0.0.0.0:0              LISTENING       14892
\`\`\`
查看最后一列的纯数字（例如 \`14892\`，这是该进程的专属 PID）。按 \`Ctrl + Shift + Esc\` 打开 Windows 任务管理器，切换到「详细信息」选项卡，按 PID 排序找到该数字对应的程序（通常是意外残留的旧版 Clash 进程或其他代理工具），右键选择「结束任务树」即可释放该端口。
`,
  chap3: `
### 3. TUN 虚拟网卡启动失败与驱动冲突彻底根治

在点击开启「TUN 模式」时，若提示 \`failed to create tun interface\` 或驱动启动超时：

1. **第一步：排查旧版 TAP 驱动冲突**：
   - 按键盘 \`Win + X\`，选择打开「设备管理器」；
   - 展开「网络适配器」分类；
   - 检查是否存在名为 \`TAP-Windows Adapter V9\`、\`Wintun Userspace Tunnel\` 或旧版 VPN 留下的虚拟网卡设备；
   - 若存在大量黄色感叹号的旧设备，逐一右键选择「卸载设备」；
2. **第二步：重新以管理员权限安装服务**：
   - 彻底关闭 Clash Verge 托盘图标；
   - 右键桌面快捷方式选择「以管理员身份运行」；
   - 进入设置中的「服务模式」，重新点击「卸载」，随后点击「安装」；
   - 看到小盾牌恢复为绿色 Active 后，重新拨动 TUN 模式开关即可顺利加载。
`,
  chap4: `
### 4. 常见日志红字报错速查与诊断字典

在 Clash Verge Rev 的左侧菜单进入「日志 (Logs)」，如果界面频繁刷红字，可对照以下字典快速自诊：

\`\`\`text
[常见日志红字错误速查字典]
1. "dial DIRECT (match Direct) to ...: connect: connection refused"
   ---> 原因：本地访问的目标服务器宕机或端口关闭，通常属于目标网站自身问题，不影响全局代理。
2. "proxy ... error: dial tcp ...: i/o timeout"
   ---> 原因：当前选中的代理节点物理服务器离线，或国际链路发生严重丢包。在代理列表中切换至备用专线即可。
3. "handshake: certificate signed by unknown authority"
   ---> 原因：电脑系统时间慢了超过90秒，或本地存在企业自签证书中间人监控。同步电脑时间即可消除。
4. "dns: resolve ... timeout"
   ---> 原因：上游 DNS 服务器无响应或遭到运营商 UDP 53 阻断。在设置中将境外 DNS 改为 DoH (https://1.1.1.1/dns-query)。
\`\`\`
`,
  decisionTree: [
    {
      title: "分支一：遇到“开代理正常，关代理反而全网断网”",
      steps: [
        "第一步：不要盲目重启路由器或重装网卡；",
        "第二步：以管理员身份运行 PowerShell；",
        "第三步：执行 Set-ItemProperty 注册表清除命令，一秒恢复正常宽带直连。"
      ]
    },
    {
      title: "分支二：遇到“节点都是绿色延迟，但 Google 打不开”",
      steps: [
        "第一步：在设置中将测速 URL 修改为真实全链路地址 https://www.google.com/generate_204；",
        "第二步：重新点击闪电测速，剔除仅是入口假绿色的假死节点；",
        "第三步：选择真正有 HTTP 响应的专线节点即可正常浏览。"
      ]
    },
    {
      title: "分支三：遇到“TUN 模式开启报错，驱动无法创建”",
      steps: [
        "第一步：右键软件以管理员身份启动；",
        "第二步：在设备管理器中卸载残留的老旧 TAP 驱动设备；",
        "第三步：在服务模式中重新点击安装 Wintun 驱动，重启客户端生效。"
      ]
    }
  ],
  faqs: [
    {
      question: "1. 为什么用 Winsock 重置命令有时候能解决网络故障？",
      answer: "当开启虚拟网卡或第三方安全软件后，系统的 TCP/IP 协议栈目录可能被底层过滤驱动插入。执行 netsh winsock reset 能将操作系统底层的套接字连接目录全部初始化恢复为微软出厂纯净状态，是解决疑难断网的终极杀手锏。"
    },
    {
      question: "2. 经常遇到系统时间慢几十秒，导致证书报错，如何让 Windows 自动精确校准？",
      answer: "Windows 默认使用的 time.windows.com 服务器在国内网络环境下经常连接超时。可以在控制面板的「日期和时间 -> Internet 时间」中，将服务器修改为国内权威且极速的「ntp.aliyun.com」或「cn.pool.ntp.org」，即可保障毫秒级精确同步。"
    },
    {
      question: "3. 为什么 Telegram Desktop 一直转圈显示 Connecting，而浏览器能翻墙？",
      answer: "因为 Telegram 原生使用的是底层自定义 Socket，且默认不遵循 Windows 系统代理注册表。解决方法：要么在 Clash Verge 中开启 TUN 模式全流量接管；要么在 Telegram 的「Settings -> Advanced -> Connection type」中手动添加 HTTP 代理，IP 填 127.0.0.1，端口填 7890。"
    },
    {
      question: "4. 客户端里的「全局」、「规则」和「直连」选错了会怎样？",
      answer: "选错「全局」会导致访问国内网站也绕道境外，导致延迟暴增且网购外卖异常；选错「直连」相当于完全关闭翻墙功能，任何海外网站都打不开。日常必须且只能锁定在「规则 (Rule)」模式。"
    },
    {
      question: "5. 排查完所有问题依然打不开任何境外网站，最根本的原因可能是什么？",
      answer: "最根本的原因是您购买的机场套餐已经到期欠费、本月流量配额耗尽，或者该机场正在遭遇敏感期大规模攻击维护。登录机场后台查看账号状态，并复制最新订阅重新拉取即可确认。"
    }
  ],
  recommendedBrandCustomText: "遭遇频繁断连超时的终极替代方案：光速云（IEPL企业级双专线架构，年付折合¥8/月，支持一键导入Clash Verge与致敬斯诺克147永久不过期包）",
  relatedSubtopics: [
    { href: '/clash/recommend/', title: '全平台 Clash 客户端推荐榜' },
    { href: '/clash/verge/', title: 'Clash Verge Rev 功能全解析' },
    { href: '/clash/verge-download/', title: '官方安全下载源与安装避坑' },
    { href: '/clash/verge-subscription/', title: '订阅导入与自动更新设置' },
    { href: '/clash/meta/', title: 'Mihomo (Clash.Meta) 内核特性' },
    { href: '/clash/tutorial/', title: '全平台图文新手配置教程' }
  ]
};
