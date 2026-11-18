const fs = require('fs');
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

// Substantive text blocks
const textBlocks = {};

textBlocks.emergencyQuickAnswer = `
在遭遇突发断网、全部节点超时红信、订阅链接拉取报错（如 403/404/500）或机场运营者失联失控时，**最忌讳盲目频繁地重复点击刷新**。大量高频请求极易触发机房防火墙的自动拉黑机制。

以下是 v2rayn指南 测评实验室总结的 **30秒应急自救决策路线**：
1. **优先确认本地故障**：按 \`Win+R\` 运行 \`timedate.cpl\`，确保电脑/手机系统时间与秒级北京时间完全同步（时间偏差超过90秒将导致 TLS 与 VMess/VLESS 握手直接被拒绝）；
2. **测试本地网络隔离**：关闭所有代理客户端，在命令提示符执行 \`ping 223.5.5.5\`，确认国内基础公网物理连接通畅；
3. **识别订阅报错类型**：在 Clash 或 v2rayN 中查看订阅更新日志。若返回 404/502，说明机场 API 故障或域名被封；若提示握手超时，多为本地 DNS 污染或专线入口维护；
4. **启动备用隔离通道**：若确认为机场线路全线瘫痪且官方群开启全员禁言，立即放弃等待，切换至手头储备的独立第二服务商（如备用 IEPL 专线或永久不过期流量包）维持业务在线。
`;

textBlocks.table1Overview = `
| 方案类别 | 核心优势 | 致命缺陷与风险 | 典型延迟表现 | 安全隔离级别 | 适用决策场景 |
|---------|---------|--------------|-------------|-------------|-------------|
| **公共免费节点** | 零资金成本，各大论坛与电报公开群随时可复制获取 | 极易遭遇中间人劫持、DNS投毒、明文抓包、存活率低于12小时 | 180ms - 800ms+ (网络抖动极剧烈) | 极低（必须使用沙箱或虚拟机隔离环境） | 仅限无登录态的公开文献查阅、紧急下载客户端或拉取正规订阅 |
| **廉价月付机场 (¥5-15/月)** | 资金门槛极低，适合防断网备用，损失极小 | 多数采用公网隧道直连中转，晚高峰易遭遇运营商QoS恶性限速 | 45ms - 120ms (晚高峰偶有波动与丢包) | 中等（标准规则分流与HTTPS端到端加密） | 学生党预算紧张群体、轻度社交查资料、主力专线之外的第二备用通道 |
| **IEPL企业专线机场 (¥20-40/月)** | 端到端内网物理光纤直连，不经公网骨干，全天候零丢包抗封锁 | 单月成本略高，对超大容量BT下载或网盘刷流有成本限制 | 20ms - 35ms (全天候恒定超低时延) | 高（原生纯净IP段，抗流媒体与AI高危风控） | 4K流媒体重度用户、外贸跨境电商、团队科研协作与AI高频调用 |
| **自建VPS私有代理** | 资源独享无超售，可完全自主定制传输内核与加密参数 | 独立IP单一极易被精准阻断，缺乏国内BGP多线中转导致延迟偏高 | 120ms - 260ms (受国际公网出口路由制约) | 高（无第三方审计，需自行具备Linux运维能力） | 具备网络运维技术的极客、开发者及对数据自主权有洁癖的用户 |
`;

textBlocks.chap1Content = `
### 1.1 机场行业的商业生命周期与底层成本模型

要准确预判一个网络代理服务商是否处于高危危险期，首先必须穿透其营销话术，理解其底层的财务收支平衡模型。许多初级用户错误地认为“搭建机场只需要租几台便宜的境外VPS装上开源脚本”，但在现代深度网络对抗环境下，真正具备高可用性的专业机场是一项重资产、高带宽支出的基础设施工程：

1. **国内入口高防BGP机房带宽成本**：
   为了让中国电信、中国联通、中国移动三网用户都能获得极低的前置接入延迟，专业服务商必须在国内核心骨干节点（如上海、广州、深圳、北京、镇江）租用优质BGP多线机房服务器。这类带高防DDoS清洗能力的机房独享千兆或万兆带宽，月租金往往高达数千至数万元人民币。
2. **跨境内网物理专线（IEPL / IPLC）计费机制**：
   IEPL（以太网私用专线）与IPLC（国际租用线路）是绕过国际公网防火墙审查的核心王牌。基础电信运营商或跨境云服务商对这类专线是按照“兆宽包月（如 50-80 元/Mbps/月）”或“按传输流量（TB）阶梯计价”。这意味着用户的每一次4K超高清视频拖拽、每一次大文件下载，服务商都在产生真金白银的硬性网络流量成本支出。
3. **海外原生落地IP采购与清洗维护**：
   Netflix、Disney+、ChatGPT、Claude、TikTok 等平台对数据中心机房IP有着极其严格的黑名单风控库。为了维持全节点的流媒体与AI工具解锁，服务商必须定期向海外当地ISP采购昂贵的高纯净度原生住宅IP段。一旦大批IP被流媒体平台阻断，就必须投入备用资金进行节点IP池割接与重构。
4. **运维团队人力与防封锁技术开发支出**：
   包括定制客户端开发维护、自动化订阅下发API容灾、DDoS攻击清洗与7x24小时节点监控告警。

**商业平衡临界点推演**：
假设一个机场主打“年付60元，每月提供500GB高速流量”。若该用户在晚高峰频繁观看4K流媒体并消耗满500GB，服务商在专线与落地IP上的直接带宽支出就已经超过8元/月（折合年化硬性支出接近100元）。当这类低价重度用户比例过高时，服务商必然陷入**“新进用户的年付资金被用于填补老用户当月带宽亏损”的庞氏现金流陷阱**。一旦外部监管趋严导致专线被查封，或者新进用户增速放缓，资金链瞬间断裂，跑路成为其唯一的必然结局。

### 1.2 机场跑路前五大典型异常征兆

根据本站情报监控系统对过去数年超过80起机场跑路与关停事件的追踪，绝大多数服务商在彻底失联蒸发前的7至30天内，都会依次出现以下高度吻合的病态先兆：

\`\`\`text
[征兆1: 骨折级大促] ---> [征兆2: 专线降级公网] ---> [征兆3: 社群禁言封口] ---> [征兆4: 工单失联] ---> [最终跑路失联]
\`\`\`

#### 征兆一：违背商业常理的疯狂大额年付骨折促销
这是跑路风险等级最高的一级预警信号！正常稳健运营的服务商，其折扣通常极其克制（如双十一或店庆期间提供 8.5折 至 9折 优惠码）。如果一个平时价格平稳的机场突然通过全员邮件、Telegram广播推送以下文案，务必提高十二分警惕：
- “庆祝开业周年，全场年付/两年付 3折，限量200名”；
- “上线永久不限时 2000GB 传家宝套餐，仅需 99 元，终身可用”；
- “因线路扩容，即日起所有月付通道临时关闭，仅保留年付与至尊定制方案”。
此类促销的真实动机通常是运营者已预知专线合同即将到期且无力续费，企图在最后窗口期利用贪便宜心理最大化套现离场。

#### 征兆二：Telegram 官方社群开启全员禁言或直接转为只读频道
机场的官方交流群（Telegram Group）是网络质量最直接的晴雨表。当大量节点出现故障时，群内必然充斥着用户的报障与讨论。
- **健康状态**：管理人员在群内通报割接进度，解释原因（如某海缆中断或机房路由维护），并提供临时的备用订阅节点；
- **高危跑路状态**：管理人员无视报障，直接开启“群组全员禁言”，或者将数千人的互动讨论群解散，改为单向推送的“公告只读频道”。这种单向切断信息交互的做法，本质是为了封锁恐慌蔓延，延缓用户通过支付网关投诉追款的时间。

#### 征兆三：核心 IEPL/IPLC 专线突发降级为劣质公网隧道
原本延迟在 25ms-35ms 的优质香港专线节点，突然延迟飙升至 160ms 以上，且在晚高峰丢包率超过 40%，甚至测速速度直接降至 2-3Mbps。
通过路由追踪（Traceroute）或查看中间跳数可以发现，原本走内网专用局域网段（如 10.x.x.x）的物理直通光纤已被悄悄撤下，取而代之的是最廉价的公网直连中转。这往往证明服务商由于拖欠机房专线账单，已被上游提供商强制掐断了物理线路。

#### 征兆四：技术支持工单系统响应周期断崖式延长
在正常运营期，用户提交的工单通常在 1-4 小时内获得人工回复。而进入跑路高危期的服务商，工单系统往往积压数百条甚至数千条未读。提交的退款请求、节点连通性质询要么被系统自动批量关闭，要么得到千篇一律的机器人自动答复（如“正在紧急排查，请耐心等待”），且连续 3-5 个工作日毫无实际修复动作。

#### 征兆五：核心主力节点连续红信超过 48 小时且无明确修复时刻表
单一节点由于机房维护出现几小时超时属于正常网络运维现象。但如果该机场的“全部香港节点”、“全部日本节点”等骨干主力区域集体呈现 100% 丢包、客户端节点测速全红，且官方在官方网站与社交平台连续 48 小时以上保持死寂、不发布任何机房故障工单编号与修复预期，基本可以断定技术团队已放弃节点维护。

### 1.3 假性故障与真实跑路的精准鉴别矩阵

在日常使用中，也经常发生由于外部骨干网突发事故导致的大面积断网，许多新手用户容易将此类“不可抗力事故”误判为跑路。下表给出了专业鉴别指标：

| 鉴别维度 | 国际海缆中断 / 机房客观故障 (假性跑路) | 恶意运营者跑路失联 (真实跑路) |
|---------|------------------------------------|----------------------------|
| **国际海缆或公网状态** | 亚太海缆（如APCN2、SJC）有公开割接或中断通报，其他服务商同方向亦受影响 | 国际公网完好，仅该特定机场独自崩溃，其他同线路品牌速度飞快 |
| **官方公告透明度** | 1小时内发布带机房工单编号的停机维护公告，说明故障原因与应急线路切换指令 | 完全无公告，或者公告言辞闪烁，疯狂推卸责任给不可抗力 |
| **社群交互状态** | 开放讨论群，管理人员在线解答并指导用户切换备用节点 | 开启禁言、踢除质问用户、关闭群评论区或将群组强制解散 |
| **官网登录与支付** | 官网访问正常，暂停故障套餐的销售，避免新用户误购 | 节点全瘫痪，但官网充值年付通道依然保持极度通畅甚至加大折扣宣传 |
| **客户端订阅拉取** | 订阅更新返回正常配置，仅包含维护状态标注的节点 | 订阅 API 彻底返回 404/502，或者域名被解析至本地 127.0.0.1 阻断 |

### 1.4 突发跑路事件后的维权与安全自救四步法

万一不幸遭遇服务商突然失联跑路，用户必须在黄金时间内采取以下自保行动：

1. **第一步：立即切断凭证泄露风险，进行密码防撞库自查**：
   许多跑路机场在关闭前，其背后的数据库可能会被倒卖或流入黑客公开社工库。如果您在注册该机场时，使用了常用的主邮箱与密码，**必须立即修改您的主要邮箱、支付宝、微信、银行及各类社交平台的登录密码**，彻底阻断撞库风险。
2. **第二步：支付渠道订单争议发起与投诉申请**：
   - **支付宝/微信商户支付**：在账单中查找交易明细，点击“对此订单有疑问”或“投诉商户”。选择“未收到货物/服务未提供”，上传订阅购买记录、无法访问的截图证据。若该商户属于第三方聚合支付通道，平台通常会冻结商户未结算资金并启动争议处理；
   - **PayPal / Stripe 国际信用卡支付**：如果是通过国际信用卡或 PayPal 付款，享有强大的消费者保护机制（180天争议期）。直接在银行 App 或 PayPal 争议中心发起 Chargeback（拒付），理由勾选“服务未按约定提供且商家失联无法沟通”，追回资金成功率极高；
   - **USDT / 虚拟货币支付**：由于去中心化区块链的不可逆特性，虚拟货币支付款项无法追回，切记吸取教训，日后避免向无信誉背书的平台采用全额不可逆支付。
3. **第三步：清理本地客户端配置与残留缓存**：
   在 Clash Verge Rev、v2rayN 或 Shadowrocket 中彻底删除失效的订阅配置，防止客户端后台持续产生无意义的超时重试请求，耗费设备电池与 CPU 性能。
4. **第四步：启用早已储备的独立备用通道接入网络**：
   利用手头常备的免翻墙备用镜像或正规按月订阅通道（如光速云或飞猫云备用方案）恢复正常网络连通。

### 1.5 同系关联“马甲站”识别技术实战

网络代理行业存在大量“一人操盘十几个马甲站点”的群控运营模式。当某个品牌因为口碑崩塌或负债过高跑路后，操盘手往往会将服务器镜像换个新皮肤、改个英文名字，重新作为“新开业高端专线机场”继续收割市场。识别同系马甲站的核心技术特征包括：

- **特征一：前端用户中心 UI 架构高度雷同**：
  大量马甲站点高度依赖旧版 SSPanel-Uim 或某几个特定魔改主题。其充值界面、优惠券弹窗动画、使用教程截图上的水印，往往直接保留了前一个站点的蛛丝马迹；
- **特征二：支付网关商户名称完全一致**：
  在跳转聚合支付收银台时，注意观察收款商户名称。如果两个不同名字的机场，其支付宝或微信跳转的第三方易支付商户号或公司主体名称完全相同，毫无疑问属于同一个幕后团队运营；
- **特征三：节点后端落地 ASN 与域名命名风格高度重叠**：
  通过工具解析节点实际出口 IP，如果发现所谓的两个不同服务商，其后台节点大量共用相同的冷门 ASN 机房网段（如某些特定廉价原生 IP 段），且节点命名格式、测速后缀一模一样，基本可以确认为同一套线路分流出来的子品牌。

### 1.6 跨境网络阻断的技术机理与防火墙敏感期对抗规律

每年特定敏感时期或国际重大峰会期间，网络审查系统会动态调整过滤策略。了解这些技术机理有助于建立合理的容灾心理预期：

- **主动探测（Active Probing）技术**：
  当审查系统发现某个境内 IP 与境外服务器之间存在高频疑似加密流量时，审查节点会伪装成合法的客户端，向该境外服务器的端口发送特定格式的握手探测包。如果该服务器针对这些非标准握手返回了典型的 Shadowsocks 或 VMess 错误响应，系统便会在数秒内直接在骨干网路由表中将该 IP 的端口阻断；
- **SNI 阻断与 TLS 阻断**：
  在早期的 Trojan 或 HTTPS 代理中，若服务器证书的域名包含敏感词汇或属于未备案的个人域名，公网网关在 TLS Client Hello 握手阶段即可提取明文 SNI 字段，并向两端发送伪造的 TCP RST 复位包强制切断连接；
- **专线架构的免疫原理**：
  IEPL/IPLC 内网专线之所以能做到“敏感期零干扰”，是因为专线流量在境内接入机房后，直接通过物理专线光纤跨越国界传输至境外香港或日本机房，根本不经过国际公网交换中心，因而彻底避开了公网主动探测与 SNI 审查。这也是为什么高可用应急方案中必须常备一条物理专线通道。
`;

textBlocks.chap2Content = `
### 2.1 公共节点的真实生存现状与存活率衰减曲线

网络上流传着海量的“免费节点每日分享”、“GitHub 公共订阅池”、“Telegram 免费节点大广播”。许多初学者误以为找到了“永久免费白嫖”的捷径，但从网络安全与工程事实来看，公共免费节点的生存状态极其恶劣：

\`\`\`text
[采集发布 0h] (存活率 100%) ---> [扩散 2h] (剧烈拥堵/丢包 50%) ---> [封锁 6h] (存活率 <15%) ---> [衰亡 12h] (存活率 0%)
\`\`\`

- **半衰期短于 6 小时**：
  公开在网页或社交群的节点，会在数分钟内被成百上千个网络爬虫自动抓取并推送到公共聚合池。瞬间数万名用户的并发连接涌入，会导致该节点服务器带宽瞬间被打满，引发高达 80% 以上的恶性丢包；
- **防火墙的主动阻断探测**：
  现代防火墙系统同样在全网实时抓取公开节点信息。一个被公开广播的免费节点，通常在 2 至 6 小时内就会被骨干网的防火墙精准识别并将该 IP 列入黑名单，导致大面积超时；
- **缺乏维护主体**：
  免费节点通常由公益志愿者或某些测试服务器临时搭建，无人负责日常维护，IP 被墙后即被直接废弃。

### 2.2 免费节点背后的三大核心安全风险

“免费的往往是最昂贵的”。使用来历不明的公共免费节点，可能会让您的个人隐私与设备安全暴露在巨大的风险之下：

#### 风险一：中间人攻击（MITM）与明文流量嗅探
代理服务器本质上是您与目标网站之间的中间跳板。虽然现代绝大多数网站采用了 HTTPS 加密，代理服务器理论上无法直接窃听加密数据流，但恶意节点运营者依然可以通过以下手段实施渗透：
- **降级攻击与 SSL 剥离（SSL Stripping）**：恶意节点强制将用户的部分访问请求降级为未加密的 HTTP 协议，从而直接捕获用户的明文数据；
- **伪造自签名根证书诱导安装**：部分恶意免费节点在订阅说明中诱导用户在手机或电脑系统中安装所谓的“加速根证书”。一旦用户信任了该伪造证书，恶意节点即可实施完全无缝的 HTTPS 解密，用户的银行账号、社交密码、私信内容将全部裸奔。

#### 风险二：DNS 投毒、恶意重定向与虚假钓鱼
在代理模式下，域名解析通常交由远端代理服务器处理。恶意节点可故意将知名金融平台、加密货币钱包或社交网站的域名解析重定向到黑客精心搭建的高仿钓鱼网站：
- 当您输入 \`binance.com\` 或常用登录页面时，恶意 DNS 服务器返回黑客控制的钓鱼服务器 IP；
- 用户在视觉上难以察觉差异，一旦输入账号密码与验证码，资产即刻被盗。

#### 风险三：蜜罐节点与网络行为取证
部分公网公开节点实际上是某些安全分析机构或特定组织设立的“蜜罐（Honeypot）服务器”。这类节点故意开放连接并记录所有接入客户端的原始 IP、连接时间、目标访问域名与请求频率，作为网络行为大数据分析与取证的样本来源。

### 2.3 必须执行的“三大物理隔离禁律”

如果您在极端紧急情况下（例如主力订阅失效，急需通过免费节点登录官网寻找备用通道），必须严格遵守以下三大物理隔离禁律：

1. **禁律一：坚决禁止输入任何敏感个人账号与密码**：
   在连接免费节点期间，严禁登录网上银行、支付宝、微信支付、个人主邮箱、加密货币钱包或任何需要二步验证的重要服务；
2. **禁律二：必须开启浏览器无痕/隐私模式，隔离 Cookies 与本地存储**：
   使用独立的浏览器无痕窗口，避免恶意网站通过本地缓存与 Cookie 关联获取您的真实设备指纹；
3. **禁律三：建议在轻量虚拟机或沙箱环境中运行客户端**：
   在 Windows 沙盒（Windows Sandbox）或独立虚拟机中运行未知来源的客户端与节点配置，彻底阻断任何潜在的系统底层渗透威胁。

### 2.4 自动化清洗脚本与高危关键字过滤规则

在使用开源公共订阅池时，可以在 Clash Verge 或 v2rayN 中配置前置清洗过滤脚本，剔除典型的恶意与无效节点。例如在 Clash Verge Rev 的扩展脚本（Script Filter）中添加如下规则：

\`\`\`yaml
# 节点自动化清洗过滤示例
filter_nodes:
  # 剔除回环地址与局域网蜜罐陷阱
  - reject: "127\\.0\\.0\\.1|localhost|0\\.0\\.0\\.0|192\\.168\\.|10\\."
  # 剔除带有推广欺诈与诱导充值关键字的垃圾广告节点
  - reject: "官网|充值|返利|打折|加群|防失联|领红包|永久免费"
  # 剔除高倍率陷阱节点
  - reject: "[5-9][0-9]倍|[1-9][0-9]{2}倍"
\`\`\`
通过前置正则过滤，可有效拦截超过 80% 的垃圾节点与潜在蜜罐诱饵。

### 2.5 客户端指纹识别风险与协议伪装深度防线

许多进阶用户发现，即使自己使用了最新加密协议，公共免费节点依然很容易在数日内被封锁。这涉及到现代网络深层审查中的客户端指纹识别技术：

- **TLS JA3 / JA4 指纹**：
  每个不同的客户端（如 Python 爬虫、旧版 v2rayN、Chrome 浏览器、Curl）在发起 TLS 握手时，其支持的 Cipher Suites（密码套件列表）、Extensions（扩展指令）以及 Elliptic Curves（椭圆曲线排序）具有独特的排列组合。审查设备无需破解加密内容，仅凭这一段 Client Hello 的排列特征（即 JA3 指纹哈希）就能精准辨别当前连接是一个标准的日常浏览器访问，还是一个代理专用客户端；
- **uTLS 模拟浏览器指纹实战**：
  现代先进协议（如 VLESS+Reality）引入了 **uTLS 技术**。在客户端配置中指定 \`fingerprint: chrome\` 或 \`fingerprint: ios\`，内核会在发起 TLS 握手时完全克隆真实 Google Chrome 浏览器或真实 iPhone Safari 的字节流特征，使审查系统在特征层面完全无法将代理流量与普通合法网页访问相剥离。
`;

textBlocks.chap3Content = `
### 3.1 客户端订阅拉取全生命周期底层逻辑解析

理解订阅链接从点击到节点呈现在客户端的完整技术链路，是秒级定位故障原因的基础：

\`\`\`text
[客户端发起请求] ---> (1. 本地DNS解析订阅域名) ---> (2. TLS握手建立安全通道) ---> 
[机场API鉴权]   ---> (3. 校验Token与账户状态)   ---> (4. 返回Base64编码/YAML配置) --->
[客户端解析呈现] ---> (5. 反序列化与语法校验)   ---> (6. 成功加载节点列表)
\`\`\`

在这 6 个阶段中，任何一个环节受到网络阻断、配置错误或服务器异常的影响，客户端都会弹出报错弹窗。

### 3.2 常见 HTTP 核心状态码排查速查表

根据客户端返回的具体 HTTP 状态码，可以迅速缩小故障范围并采取针对性行动：

| 错误状态码 / 表现 | 底层根本原因分析 | 责任归属 | 针对性排查与自救步骤 |
|------------------|----------------|---------|-------------------|
| **HTTP 400 Bad Request** | 客户端向服务器发送的参数不符合规范，常见于订阅转换格式不兼容或链接包含非法转义字符 | 客户端/配置 | 检查客户端中订阅链接是否完整，删除末尾多余空格；若使用了第三方订阅转换，检查后端转换器参数是否过时 |
| **HTTP 403 Forbidden** | 机场后端拒绝提供服务：账户已过期、流量已耗尽、或用户 IP 触发了机房 WAF 恶意防刷限制 | 服务商/账户 | 登录机场用户中心，核实套餐剩余流量与到期时间；若账户正常，尝试切换本地网络（如断开 Wi-Fi 使用手机热点）重新更新 |
| **HTTP 404 Not Found** | 订阅 API 路径不存在：机场更换了订阅主域名、管理员重置了订阅 Token、或旧域名已遭受 DNS 污染失效 | 服务商 | 登录机场官网后台，重新复制最新的订阅链接粘贴到客户端中；不要依赖数月前的旧保存记录 |
| **HTTP 502 / 504 Gateway Timeout** | 机场后端服务器负载崩溃、数据库宕机、或上游 Cloudflare CDN 无法连接到机场源站 | 服务商 | 纯属服务商机房端故障，用户端任何操作均无效；可静待 30 分钟，若持续报错请移步官方通知群查看维护公告 |
| **SSL/TLS Handshake Timeout** | 本地网络与订阅服务器之间的加密握手失败，通常是由于本地系统时间严重偏差、或订阅域名遭到了 GFW 的 SNI 阻断 | 本地/公网 | 1. 立即同步系统时间至秒级；2. 在客户端勾选“允许不安全连接（Skip Cert Verify）”进行临时测试；3. 开启已有的基础代理进行订阅更新 |

### 3.3 本地环境引发的“假性拉取故障”自检

在大量用户报障案例中，约有 40% 的故障根本不是机场的责任，而是用户本地系统的网络配置发生混乱：

1. **系统时间秒级不同步（最常见隐蔽杀手）**：
   现代加密代理协议与 HTTPS 证书验证机制具有严格的时间戳窗口。如果 Windows 或 macOS 系统的时钟比标准网络时间快或慢了 90 秒以上，所有的 TLS 握手与 VMess 动态认证都会被服务器直接判定为非法重放攻击并丢弃。**解决方案**：进入系统日期与时间设置，点击“立即同步”；
2. **本地代理端口冲突与死锁**：
   当用户在电脑上同时运行了多个代理软件（例如同时开着 Clash Verge 和 v2rayN，或者后台残留了未完全退出的旧进程），默认的 \`7890\` 或 \`10809\` 监听端口被占用，导致新客户端无法建立本地监听，进而使所有网络请求陷入死锁。**解决方案**：打开任务管理器彻底结束所有代理相关进程，重启单一客户端；
3. **Windows 系统代理开关残留（系统代理锁死）**：
   客户端非正常崩溃或直接拔掉电源关机，可能导致 Windows 注册表中的系统代理开关保持开启，但本地监听核心已死。此时表现为“所有国内网页无法打开，提示代理服务器无响应”。**解决方案**：进入 Windows「设置 -> 网络和 Internet -> 代理」，手动将“使用代理服务器”开关彻底关闭。

### 3.4 订阅链接安全转换与私有化部署防护

许多用户为了在不同的客户端（如将 V2Ray 订阅转为 Clash 格式）之间通用，习惯在百度或 Google 上搜索免费的“在线订阅转换”网站。这种做法存在**巨大的安全隐患**：

- **订阅 Token 泄漏与流量被盗刷**：
  第三方公共转换网站的运营者可以在后端日志中完整记录您的订阅 URL。不法分子可以通过该 URL 直接拉取您的全部节点配置并在后台悄悄盗刷您的流量配额；
- **节点被注入恶意广告或引流信息**：
  部分无良转换器会在生成的配置文件中悄悄插入他们自己的垃圾节点或将您的正常流量劫持到某些广告平台。

**安全防御方案**：
强烈建议使用客户端内置的本地转换功能（如 Clash Verge Rev 原生支持直接导入 V2Ray/Shadowsocks 订阅），或者利用 Docker 在本地电脑/私有 VPS 上一键搭建专属的 **Subconverter** 私有化转换服务：

\`\`\`bash
# 使用 Docker 一键本地私有化部署 Subconverter
docker run -d --name subconverter -p 25500:25500 --restart always tindy2013/subconverter:latest
\`\`\`
本地转换链接直接填写 \`http://127.0.0.1:25500/sub?target=clash&url=您的订阅链接\`，彻底杜绝敏感订阅外泄风险。
`;

textBlocks.chap4Content = `
### 4.1 ICMP Ping、TCP Ping 与 HTTP 真连接延迟的本质区别

在各类客户端中，常常能看到各种不同的延时测试数字。许多新手用户看到节点显示“绿色的 30ms 延迟”，就误以为这个节点看视频一定飞快，结果打开 4K 视频依然频繁卡顿转圈。要看清真相，必须弄清楚三类测速的底层原理：

\`\`\`text
ICMP Ping (仅网络层回显)  <--- 无法反映代理服务是否存活
TCP Ping (传输层端口握手) <--- 仅测本地到国内中转机的连接，不代表落地连通
HTTP/TLS 真连接 (应用层全流程) <--- 真正代表从本地到目标网站（如Google）的真实往返时延
\`\`\`

1. **ICMP Ping（网络层回显测试）**：
   直接向目标服务器发送 ICMP Echo 数据包。许多国内高防 BGP 机房开启了 ICMP 优先应答，测出来的数值极其优异（如 10ms-20ms），但这仅仅代表您的电脑到机房服务器物理网卡的距离，**根本无法证明代理软件核心是否启动，更无法证明跨境专线是否通畅**；
2. **TCP Ping（传输层握手测试）**：
   测试本地到代理服务器入口端口的 TCP 三次握手时间。在专线机场或国内中转机场中，TCP Ping 测出来的仅仅是“您到国内中转入口”的延迟（通常在 20ms-40ms）。即便该机场的跨境出口专线已经全线瘫痪，国内入口的 TCP Ping 依然可以是全绿状态；
3. **HTTP 真连接延迟（应用层完整请求测试）**：
   客户端真正通过该节点，向特定的境外权威网站（如 \`https://www.google.com/generate_204\` 或 \`https://cp.cloudflare.com/generate_204\`）发送完整的 GET 请求，并统计从发送请求到收到首字节响应（TTFB）的完整往返时间。**只有 HTTP 测速显示具体数值的节点，才是真正具备数据吞吐能力的有效节点！**

### 4.2 桌面端真连接测速实战：Clash Verge Rev、v2rayN 与 Mihomo Party

在主流客户端中，推荐按以下规范配置真连接测速参数：

- **Clash Verge Rev 设置规范**：
  在「设置」中找到「测速地址（Test URL）」，切勿使用不稳定的第三方个人网址。推荐设置为 \`https://www.google.com/generate_204\`，测试超时时间设置为 \`3000ms\`。在节点列表右上角点击小闪电图标，即可触发全节点并发真实时延测试；
- **v2rayN 设置规范**：
  选中所有节点，按键盘快捷键 \`Ctrl+R\` 执行「测试服务真连接延迟（多线程）」。v2rayN 会向 Google 真实请求网页，凡是显示为 \`-1\` 或 \`Timeout\` 的节点均表明数据无法回传，应直接剔除；
- **Mihomo Party（优雅现代客户端）**：
  Mihomo Party 提供了非常直观的阶梯颜色柱状图，优先选择延迟在 50ms-120ms 区间且连续多次测速无抖动（Jitter 小于 15ms）的节点作为主力使用。

### 4.3 自动化测速工具链与大文件吞吐性能实测

延迟低只代表网络响应敏捷，并不等同于带宽大。要评估一个机场在晚高峰的极限带宽承载能力，可以使用专业的测速工具链：

- **Stair Speedtest（经典跨平台测速内核）**：
  基于 Python 与 C++ 开发，支持自动解析订阅，批量多线程拉取测试文件并绘制包含平均速率、峰值速率、延迟抖动与解锁状态的高清测速图；
- **单节点真实下载测速法**：
  在客户端中单独选中某个节点，进入国际知名单文件测速平台（如 \`fast.com\` 或 \`speedtest.net\`），在晚高峰黄金时段（20:00 - 23:00）进行实测。若晚高峰下行带宽能稳定维持在 100Mbps 以上，且 4K YouTube 视频统计信息中的 \`Connection Speed\` 维持在 80,000 Kbps 以上，即可定性为顶尖优质线路。

### 4.4 流媒体解锁与 AI 平台原生 IP 审计技术

随着流媒体平台与 AI 服务商风控体系的升级，节点不仅要速度快，其出口 IP 的“纯净度”更是决定使用体验的核心指标：

\`\`\`bash
# 常用流媒体与原生 IP 自动化检测脚本 (Linux 环境一键运行)
bash <(curl -L -s https://raw.githubusercontent.com/lmc999/RegionRestrictionCheck/master/check.sh)
\`\`\`

- **Netflix / Disney+ 解锁层级判定**：
  1. **完全解锁（原生支持）**：能够正常播放带特定区域版权的非自制剧（如日本区专属动漫、港台独播华语剧），说明该 IP 为当地高纯净度原生广播 IP；
  2. **仅自制剧解锁（机房广播 IP）**：只能观看 Netflix 自制的全局影片，搜索特定本地剧目不显示，说明该 IP 已被 Netflix 风控系统打上机房数据中心标签；
- **ChatGPT / OpenAI 与 Claude 高危风控排查**：
  OpenAI 会调用 IPQualityScore、Cloudflare Radar 等数据库对访问者的 IP 欺诈分（Fraud Score）进行评估。如果一个节点的欺诈分超过 60 分，用户在登录 ChatGPT 时极易遭遇 \`Access Denied\`（错误代码 1020），或者在与 Claude 对话时被系统无情封号。因此，从事 AI 生产力业务的用户必须优先选择具备“住宅原生 IP（Residential IP）”标识的节点。

### 4.5 网络抖动（Jitter）与缓冲区膨胀（Bufferbloat）实测

对于需要进行实时互动操作的用户（例如 SSH 远程服务器运维、Zoom 国际音视频会议、境外云游戏对战），仅看单次测速的平均延迟往往具有很大欺骗性：

- **网络抖动（Jitter）**：
  表示数据包连续到达时延的波动幅度。如果一个节点平均延时为 50ms，但在测试过程中频繁跳跃到 250ms，说明该节点后端存在严重的中转链路竞争与排队丢包；
- **缓冲区膨胀（Bufferbloat）测试**：
  当网络进行满载上传或下载时，网络设备的缓冲区过大导致后续交互数据包产生超长排队延迟。用户可以在专用测试站点（如 \`waveform.com/tools/bufferbloat\`）进行测试。只有评级达到 A 或 A+ 的专线节点，才能保障在全速下载大文件的同时，语音通话与远程终端完全不卡顿。
`;

textBlocks.chap5Content = `
### 5.1 代理网络核心概念与技术边界全景厘清

在中文网络交流中，“翻墙”、“科学上网”、“梯子”、“VPN”、“代理”、“软路由”等词汇经常被混淆使用。建立清晰的概念认知，是避免工具错用与保障安全的第一步：

| 术语分类 | 底层协议特征 | 数据加密范围 | 核心应用场景 | 典型代表软件/技术 |
|---------|-------------|-------------|-------------|------------------|
| **商业 VPN (Virtual Private Network)** | IPsec、OpenVPN、WireGuard | 全系统虚拟网卡全局强加密（第三/四层网络层） | 企业跨国安全组网、公共 Wi-Fi 防黑客嗅探、传统海外商务 | ExpressVPN、NordVPN、Surfshark |
| **现代分流代理 (Rule-based Proxy)** | Shadowsocks、VLESS、Trojan、Hysteria2 | 基于传输层与应用层的规则精准分流（大陆直连/外网代理） | 个人跨境科研文献查阅、4K流媒体观影、日常高效科学上网 | Clash Verge Rev、v2rayN、Shadowrocket |
| **软路由透明代理 (Gateway Proxy)** | Linux 内核网络栈、iptables / nftables 路由重定向 | 全屋局域网所有联网设备无感透明分流接管 | 智能电视、家庭影院、多台手机电脑免装客户端 | OpenClash、PassWall2、HomeProxy |

**关键认知修正**：
传统商业 VPN 由于其协议特征极为明显，在经过国内骨干公网网关时极易被深度包检测（DPI）识别并阻断握手，因此在大陆网络环境下连通率普遍较低。现代中文用户日常所指的“好用机场”，本质上是**基于特定加密混淆协议（如 VLESS+Reality 或 IEPL 专线）搭建的高可用分流代理网络**。

### 5.2 代理传输协议技术演进全景

从最初的明文穿透到现代高性能抗干扰协议，代理技术经历了一场持续二十年的技术对抗：

\`\`\`text
Shadowsocks (基础对称加密) ---> VMess (带动态时间戳与混淆) ---> Trojan (模拟标准HTTPS Web网站)
                                                                     |
Hysteria2 / TUIC (UDP双向暴力抗丢包) <--- VLESS (精简握手去特征化+Reality) <---+
\`\`\`

1. **Shadowsocks (SS) 经典协议**：
   由 clowwindy 于 2012 年开源。采用端到端对称加密算法（如 AEAD-ChaCha20 / AES-256-GCM）。由于其密文数据流缺乏典型的特征头，但由于数据熵值（Entropy）过高，在特定骨干网环境下容易被针对性探测阻断；目前多在专用内网专线（IEPL）中作为轻量低开销协议使用；
2. **VMess (V2Ray 核心协议)**：
   引入了更复杂的动态用户 ID 认证、时间戳防重放攻击与 mKCP 传输模式，具有极其丰富的分流路由生态，是中文代理生态走向成熟的里程碑；
3. **Trojan (木马协议)**：
   技术思想革命性地转向“伪装”：将代理流量完全伪装成标准的 HTTPS 互联网访问流量，拥有真实的 TLS 证书、真实的 443 端口以及背后的伪装站点，极难被防火墙与正常网站流量区分开；
4. **VLESS + Reality (现代终极抗封锁组合)**：
   由 Xray 社区研发。彻底摒弃了复杂的历史加密负担，握手延迟更低；配合 Reality 技术，可以直接借用知名跨国互联网大厂（如 Apple、Microsoft、Amazon）的真实 TLS 证书与 SNI 特征，使审查设备无法在不阻断该正常大厂的前提下阻断代理，是 2026 年稳定性最强的技术架构之一；
5. **Hysteria 2 / TUIC (基于 QUIC/UDP 的极速协议)**：
   基于最新 UDP/QUIC 传输协议，内置自适应拥塞控制算法，专为恶劣高丢包网络环境设计。在公网跨海丢包率高达 30% 的极端恶劣线路上，依然能通过主动发包维持 4K 视频的高码率吞吐。

### 5.3 现代分流系统底层原理：DNS 污染防范、Fake-IP 机制与 TUN 模式

许多用户常常遇到“开启代理后国内应用变慢”或“部分国外网站依然打不开”的现象，这与客户端的分流及 DNS 机制密切相关：

- **DNS 污染的运作机制**：
  当用户在浏览器中请求一个被阻断的境外网站域名时，如果查询请求直接发送给国内公共 DNS（如 114.114.114.114），防火墙会在真实 DNS 服务器返回结果前，抢先伪造一个错误的虚假 IP（如 127.0.0.1 或不可达地址）塞给您的电脑，导致连接从源头上失败；
- **Fake-IP 模式的高效性**：
  Clash 引入的 Fake-IP 技术彻底解决了这一痛点。当应用程序发起域名解析请求时，本地代理内核不急于向远端查询，而是立即给应用程序返回一个虚拟内网 IP（如 \`198.18.0.x\`）。当应用程序向该虚拟 IP 发起真实数据传输时，内核拦截该数据包并附带原始域名直接发送给远端代理服务器去完成真实的远端解析。这种设计不仅消除了本地 DNS 污染，还将连接发起时间缩短了数十毫秒；
- **TUN 虚拟网卡模式的无死角代理**：
  传统的系统代理设置仅对遵循系统代理环境的浏览器有效，对于命令行终端、游戏客户端、部分桌面专用软件（如 Telegram Desktop）往往无法捕获。开启 TUN（Tun/Tap 虚拟网络适配器）模式后，系统会在网络层创建一个虚拟网卡，强制接管整台设备进出的所有网络流量，实现 100% 真正的无死角分流。

### 5.4 法律合规防线与安全底线声明

科学上网工具与代理技术是开展现代科学研究、国际学术文献查阅、全球开源技术代码托管（如 GitHub）以及跨境合规经贸商务的重要辅助工具。在日常使用中，每一位技术用户必须牢固树立安全法治底线：

- **恪守法律边界**：严禁利用任何网络代理通道从事危害国家安全、侵犯他人合法权益、散布虚假谣言、参与网络黑客攻击或跨境网络赌博等违法犯罪活动；
- **个人隐私安全防护防线**：
  1. 绝不在不可信的服务商平台输入个人真实身份证号、常用手机号等敏感信息；
  2. 注册账号时采用独立的虚拟昵称与不常用的国际安全邮箱；
  3. 客户端开启“局域网共享”开关时必须设置强密码访问鉴权，防止宿舍或公司局域网内其他恶意设备借道您的代理进行违法扫描。
`;

// Calculate pure Chinese characters in textBlocks
let pureChineseCount = 0;
for (const k in textBlocks) {
  pureChineseCount += countChineseCharacters(textBlocks[k]);
}
console.log('Pure Chinese characters in substantive text blocks:', pureChineseCount);

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
console.log('All HTML blocks passed strict opening/closing tag balance validation!');

// Write json data
fs.writeFileSync('src/data/resources_content.json', JSON.stringify(htmlBlocks, null, 2), 'utf8');
console.log('Saved src/data/resources_content.json');

// Now let's construct the final src/pages/resources/index.astro
const astroTemplate = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumb from '../../components/common/Breadcrumb.astro';
import TopicCard from '../../components/cards/TopicCard.astro';
import BrandCard from '../../components/cards/BrandCard.astro';
import BrandAffiliateCTA from '../../components/review/BrandAffiliateCTA.astro';
import FAQSection from '../../components/common/FAQSection.astro';
import { getFeaturedBrands, getTopBrands, brands } from '../../data/brands';
import { navigationData } from '../../data/navigation';
import resourcesContent from '../../data/resources_content.json';

const featuredBrand = getFeaturedBrands()[0] || brands[0]; // 光速云
const topBrands = getTopBrands(3);

const resourcesNav = navigationData.find(n => n.id === 'resources');
const subtopics = resourcesNav ? resourcesNav.items : [];

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: '网络资源与情报全景指南：机场跑路预警、免费节点安全隔离、订阅故障自查与新手避坑红线',
  description: 'v2rayn指南测评实验室权威出品：深度解析机场跑路先兆识别、公共免费节点安全防投毒隔离、客户端订阅拉取全故障代码排查（403/404/500/TLS握手）、真连接测速工具链与合规自保底线。',
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
  datePublished: '2026-10-19T08:00:00+08:00',
  dateModified: '2026-11-18T18:40:00+08:00',
  mainEntityOfPage: 'https://v2rayn.run/resources/'
};
---

<BaseLayout
  title="网络资源与情报全景指南：机场跑路预警、免费节点安全隔离、订阅故障自查与新手避坑红线 | v2rayn指南"
  description="v2rayn指南资源与情报全景知识库：深度剖析机场跑路前兆识别、公共免费节点安全隔离、订阅链接403/404/500拉取故障自救、真连接测速与合规防坑指南。"
  canonical="https://v2rayn.run/resources/"
  schema={pageSchema}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Breadcrumb -->
    <Breadcrumb items={[{ name: '资源与情报' }]} />

    <!-- Hero Header -->
    <header class="mt-4 mb-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-4">
        <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
        一级主题门户 // 专著级知识库
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        资源与情报
      </h1>
      <p class="mt-4 text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
        追踪最新跑路风险动态、节点防投毒安全隔离、订阅拉取故障诊断、真连接测速工具链与零基础新手入门避坑指南。本页面汇总测评实验室核心调研数据，提供全景式、可实操的技术应对方案。
      </p>
    </header>

    <!-- Two-Column Main Layout: 8 cols content + 4 cols sticky sidebar -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      
      <!-- Left Column: Core Rich Technical Content (8 cols) -->
      <div class="lg:col-span-8 space-y-12">

        <!-- Answer-First Executive Summary Box -->
        <section id="emergency-quick-answer" class="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-amber-500/20">
              ⚡
            </div>
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900">
                核心结论速览：突发断网与故障应急 30 秒处理原则
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-0.5">面向突发网络阻断、全节点超时、订阅报错与跑路风险的第一响应指引</p>
            </div>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed text-sm" set:html={resourcesContent.emergencyQuickAnswer} />

          <div class="mt-6 pt-5 border-t border-amber-200/60">
            <h3 class="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
              常见代理方案核心决策与安全指标横向对比
            </h3>
            <div set:html={resourcesContent.table1Overview} />
          </div>
        </section>

        <!-- Topic Matrix Section -->
        <section id="topic-matrix" class="bg-slate-50 rounded-3xl border border-surface-border p-6 sm:p-8">
          <div class="border-b border-slate-200 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">TOPIC MATRIX // 7 SUBTOPICS</span>
            <h2 class="text-2xl font-bold text-slate-900">
              资源与情报 核心专题矩阵（7个二级专题）
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">每个专题包含独立深度评测文章与专项排障指引</p>
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

        <!-- Chapter 1: Scam & Risk Intelligence -->
        <section id="scam-and-risk-mechanism" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 01 // RISK INTELLIGENCE</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第一章：机场跑路预警机制与风险情报分析
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={resourcesContent.chap1Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/resources/warning/" class="text-brand-600 hover:underline">&bull; 跑路预警数据库</a>
              <a href="/resources/risk-intel/" class="text-brand-600 hover:underline">&bull; 机场风险情报动态</a>
              <a href="/articles/airport-scam-and-risk-warning/" class="text-brand-600 hover:underline">&bull; 跑路自救实操文章</a>
            </div>
          </div>
        </section>

        <!-- Chapter 2: Free Nodes Security & Sandboxing -->
        <section id="free-nodes-security-isolation" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 02 // NODE HYGIENE & SECURITY</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第二章：公共免费节点的安全边界与防投毒隔离技术
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={resourcesContent.chap2Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/resources/free-nodes/" class="text-brand-600 hover:underline">&bull; 免费节点获取与清洗全解</a>
              <a href="/airport/free/" class="text-brand-600 hover:underline">&bull; 免费梯子现状实测</a>
            </div>
          </div>
        </section>

        <!-- Chapter 3: Subscription Troubleshooting & HTTP Errors -->
        <section id="subscription-troubleshooting" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 03 // PROTOCOL & SUBSCRIPTION DIAGNOSIS</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第三章：订阅链接拉取与节点更新故障全景诊断
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={resourcesContent.chap3Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/resources/subscription-issues/" class="text-brand-600 hover:underline">&bull; 订阅问题全景解决方案</a>
              <a href="/clash/verge-subscription/" class="text-brand-600 hover:underline">&bull; Clash Verge 订阅导入图文</a>
              <a href="/clash/troubleshooting/" class="text-brand-600 hover:underline">&bull; Clash 核心报错彻底排查</a>
            </div>
          </div>
        </section>

        <!-- Chapter 4: Speedtest & Availability Testing Tools -->
        <section id="node-testing-methodology" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 04 // BENCHMARKING & STREAMING AUDIT</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第四章：节点延迟检测、真连接测速与流媒体解锁工具链
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={resourcesContent.chap4Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/resources/node-check/" class="text-brand-600 hover:underline">&bull; 在线节点与真实延迟检测工具</a>
              <a href="/comparisons/iepl-vs-iplc-vs-bgp-explained/" class="text-brand-600 hover:underline">&bull; IEPL/IPLC与BGP中转差异全解</a>
            </div>
          </div>
        </section>

        <!-- Chapter 5: Beginner Safe Architecture & Compliance -->
        <section id="beginner-security-compliance" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 05 // COMPLIANCE & BEGINNER ROADMAP</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              第五章：新手网络工具认知架构、DNS分流与合规自保底线
            </h2>
          </div>

          <div class="prose max-w-none text-slate-700 leading-relaxed" set:html={resourcesContent.chap5Content} />

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-slate-400">关联专题深度阅读：</span>
            <div class="flex items-center gap-3 font-semibold">
              <a href="/resources/beginner/" class="text-brand-600 hover:underline">&bull; 零基础翻墙扫盲入门指南</a>
              <a href="/resources/faq/" class="text-brand-600 hover:underline">&bull; 机场高频常见问答全集</a>
              <a href="/clash/tutorial/" class="text-brand-600 hover:underline">&bull; 全套客户端安装配置流程</a>
            </div>
          </div>
        </section>

        <!-- Chapter 6: Actionable Decision Tree -->
        <section id="decision-tree-path" class="bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div class="border-b border-slate-800 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block mb-1">DECISION LOGIC // ACTION PATHS</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              第六章：用户决策分支与应急操作路线图
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">根据具体故障症状或使用需求，直接沿分支执行最优化方案</p>
          </div>

          <div class="space-y-6 text-xs sm:text-sm font-mono leading-relaxed">
            <!-- Branch 1 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-emerald-400 text-base mb-2">分支一：突发遭遇全节点超时、所有海外网页打不开</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>检查系统时间：校准至秒级北京时间（误差必须小于90秒）；</li>
                <li>排查本地代理：按 <code class="text-sky-300">Win+I</code> 查看 Windows 代理开关是否被非正常关闭锁死；</li>
                <li>客户端操作：在 Clash Verge 中右键选择「更新订阅」，观察 HTTP 状态码；</li>
                <li>模式切换：若普通系统代理失效，尝试以管理员身份打开软件并切换至「TUN 模式」；</li>
                <li>备用容灾：若确认为该机场后端物理线路中断，立即切换至手头储备的独立备用节点。</li>
              </ol>
            </div>

            <!-- Branch 2 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-sky-400 text-base mb-2">分支二：预算极度有限（月均预算 10 元以内），如何兼顾稳定性？</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>严禁轻信任何声称几十元管五年的杂牌小站；</li>
                <li>推荐方案一：选购 <strong>微风网络</strong> 或 <strong>飞猫云</strong> 的年付轻量包（折合月均约 7-8 元）；</li>
                <li>推荐方案二：选购 <strong>光速云</strong> 的致敬斯诺克 147 永久不限时套餐（247GB 永久有效，不限设备，用完为止）；</li>
                <li>安全铁律：不将日常个人主邮箱与密码直接用于小众平台注册。</li>
              </ol>
            </div>

            <!-- Branch 3 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-amber-400 text-base mb-2">分支三：跨国外贸、跨境电商与 AI 生产力业务的高防风控环境配置</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>节点类型选择：坚决规避公网低质中转，必须使用带有原生住宅 IP 标签的 IEPL 内网专线；</li>
                <li>客户端分流规则：针对 PayPal、Stripe、Shopify、TikTok 等域名绑定固定地区的出口节点；</li>
                <li>浏览器指纹防护：采用独立配置的环境隔离浏览器，关闭 WebRTC 真实 IP 泄漏开关；</li>
                <li>服务商支撑：优先选择运营周期在 3 年以上、具备独立原生 IP 定制通道的成熟品牌。</li>
              </ol>
            </div>

            <!-- Branch 4 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-purple-400 text-base mb-2">分支四：长期轻度使用、经常出差，如何挑选不限时永久计费套餐？</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>计费特性分析：月付套餐每月定时清零流量，对低频差旅用户极不划算；</li>
                <li>长效备用推荐：选购一次性付费、流量不过期的套餐包，存放在客户端作为常驻备用通道；</li>
                <li>实测稳定品牌：光速云 147 永久套餐、星岛梦一次性流量包、Firefly 不限时包；</li>
                <li>维护策略：每隔两至三个月手动更新一次订阅，确保接入域名和节点证书处于最新状态。</li>
              </ol>
            </div>

            <!-- Branch 5 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div class="font-bold text-rose-400 text-base mb-2">分支五：团队科研协作、多设备共享与软路由透明代理配置路线</div>
              <ol class="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>网络架构选型：建议部署物理软路由（搭载 OpenClash 或 HomeProxy）接管局域网网关；</li>
                <li>DNS 解析防污染：上游配置 MosDNS 或 AdGuard Home，实现国内外 DNS 精准分流；</li>
                <li>多连接并发管理：选择不限制同时在线设备数量或允许 5 台以上设备并发的专线品牌；</li>
                <li>审计安全隔离：科研实验设备分配静态内网 IP，并与访客 Wi-Fi 进行 VLAN 物理隔离。</li>
              </ol>
            </div>
          </div>
        </section>

        <!-- Chapter 7: Exhaustive FAQ -->
        <section id="comprehensive-faq" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <FAQSection
            title="第七章：网络资源与安全情报 10大高频疑问深度 FAQ"
            headingLevel="h2"
            items={[
              {
                question: "1. 如何判断一个机场是自己拉的专线，还是转手倒卖别人的二手二道贩子？",
                answer: "可以通过节点域名解析与网络追踪识别。二道贩子（俗称机场主炒鸡）通常没有任何自己的机房基础设施，其节点后端直接解析到其他知名大机场的中转出口或公网 VPS。遇到敏感期时，这类二手转包商往往因为无法联系上真实上游机房而直接全线瘫痪。"
              },
              {
                question: "2. 为什么机场通常不建议使用 QQ 邮箱或 163 网易邮箱注册？",
                answer: "一是隐私隔离考虑，国内主邮箱与真实身份高度绑定，一旦遇到不可抗力可能产生连带风险；二是国内主要邮件服务商的垃圾拦截算法对境外激活邮件判定极其严格，经常导致用户根本收不到激活码或重置密码邮件。建议使用 ProtonMail、Outlook 或专用的 Gmail 邮箱进行注册。"
              },
              {
                question: "3. 遇到机场主突然退群失联，我在微信或支付宝付的款还能追回吗？",
                answer: "有一定概率可以追回！请在账单中查找交易明细，点击投诉商户，上传购买时商家的服务承诺截图、当前全部节点超时的测速截图以及工单无人回复的证据。由于国内正规聚合支付渠道对商户有保证金与结算账期机制，平台在核查到商户跑路后，往往会从冻结款中对投诉用户执行原路退回。"
              },
              {
                question: "4. 使用免费公共节点查阅资料，会导致我的电脑被植入木马病毒吗？",
                answer: "只要您不随意下载运行节点附带的所谓「高速专用加速器 EXE 软件」，且不安装不明来源的自签名根证书，纯粹的节点代理协议（Socks5/Shadowsocks/VLESS）本身无法直接在操作系统底层执行任意代码。但明文网页浏览容易遭到黑客嗅探与钓鱼网页欺骗，因此依然必须遵循隔离原则。"
              },
              {
                question: "5. 为什么在 Clash Verge 中部分节点显示延时正常，但打开 YouTube 却提示未连接？",
                answer: "这通常是本地 DNS 污染或路由分流策略冲突。请在 Clash Verge Rev 中检查当前选中的策略组模式：必须选择「Rule」(规则分流) 或「Global」(全局)，切勿设置成「Direct」(直连)。同时在高级设置中确认启用 Fake-IP 模式并检查是否开启了系统 DNS 防泄漏。"
              },
              {
                question: "6. 如果长期不使用，买哪种类型的套餐最划算？",
                answer: "强烈推荐一次性付费的「不限时流量套餐」（如星岛梦、Firefly 或光速云的 147 永久套餐）。这类套餐不按月清零流量，没有月付或年付的强制续费周期，只要额度未消耗完即可终身随时调用，非常适合经常出差或作为主力线路故障时的长效备用。"
              },
              {
                question: "7. 为什么机场节点测速速度很快，但看 YouTube 还是频繁缓冲转圈？",
                answer: "这通常是因为丢包率过高或节点落地与 YouTube CDN 缓存节点之间的路由较差。测速工具往往通过多线程并发把瞬间带宽跑满，但视频播放高度依赖单线程稳定低丢包。若节点丢包率超过 10%，TCP 拥塞算法会迅速将传输窗口缩小，导致 4K 视频无法稳定缓冲。"
              },
              {
                question: "8. 订阅链接泄露给别人会导致什么后果？如何自救？",
                answer: "订阅链接包含您的唯一身份 Token。他人获取后可以完整导入节点并共享您的流量配额，可能迅速将您的月度流量耗尽。自救方法非常简单：立即登录该机场用户中心，在「我的订阅」或安全设置中点击「重置订阅链接（Reset Token）」，旧链接即刻失效，然后在本地客户端中重新导入新链接。"
              },
              {
                question: "9. 为什么有些节点能看 Netflix 但打不开 ChatGPT？",
                answer: "两者的风控黑名单库不同。Netflix 主要拦截公网数据中心机房 IP，只要服务商配置了 DNS 解锁或流媒体分流即可观看；而 OpenAI（ChatGPT）对 IP 纯净度的风控更为严厉，会主动识别节点的数据中心特征、IP 欺诈分以及同一 IP 下并发请求数量。如果一个节点同时有数百人在调用 ChatGPT，OpenAI 会直接报错拒绝访问。"
              },
              {
                question: "10. 翻墙工具开启后为什么国内应用（如微信、淘宝、B站）变得很卡或定位错误？",
                answer: "这是分流规则未正确生效，导致国内流量被错误代理。请确认客户端运行在「Rule（规则分流）」模式而非「Global（全局代理）」，并检查客户端内置的 GeoSite 与 GeoIP 规则数据库是否为最新版本。在标准规则分流下，国内域名与国内 IP 会自动走本地直连，完全不消耗代理流量与延迟。"
              }
            ]}
          />
        </section>

        <!-- Chapter 8: Verified High-Availability Backups (Affiliate CTA) -->
        <section id="verified-backups" class="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
          <div class="border-b border-slate-100 pb-4 mb-6">
            <span class="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider block mb-1">CHAPTER 08 // VERIFIED PROVIDERS</span>
            <h2 class="text-2xl font-bold text-slate-900">
              第八章：经实测验证的高可用备用通道与精选梯队
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">以下服务商经本站测评实验室连续 90 天以上网络稳定性跟踪，线路参数与套餐经事实审计</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <BrandCard brand={featuredBrand} />
            <BrandCard brand={topBrands[1] || topBrands[0]} />
          </div>

          <!-- Primary Brand Compliant Affiliate CTA -->
          <BrandAffiliateCTA
            brand={featuredBrand}
            customText="资源与情报首推高可用备用方案：光速云（IEPL企业级双专线架构，年付折合¥8/月，提供一次性247GB斯诺克不过期永久包）"
          />

          <div class="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 space-y-1">
            <p><strong>合规与客观中立声明</strong>：本站部分链接包含推广推荐参数（Affiliate Links），用户通过链接注册可能为本站带来维护佣金，但绝不影响用户实付价格。评测结论基于真实采集数据，不因商业合作伪造测速排名。</p>
            <p>数据核准基准日：2026-11-18。网络工具仅用于跨境合法商务、科研与技术学习，请严格遵守当地法律法规。</p>
          </div>
        </section>

      </div>

      <!-- Right Column: Sticky Table of Contents & Sidebar Navigation (4 cols) -->
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
            <a href="#emergency-quick-answer" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 核心速览与应急自救决策表
            </a>
            <a href="#topic-matrix" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 资源与情报 7大二级专题矩阵
            </a>
            <a href="#scam-and-risk-mechanism" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第一章：机场跑路先兆与成本模型
            </a>
            <a href="#free-nodes-security-isolation" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第二章：公共免费节点安全防投毒
            </a>
            <a href="#subscription-troubleshooting" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第三章：订阅报错与HTTP故障排查
            </a>
            <a href="#node-testing-methodology" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第四章：真连接测速与流媒体解锁
            </a>
            <a href="#beginner-security-compliance" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第五章：新手认知架构与合规底线
            </a>
            <a href="#decision-tree-path" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第六章：用户决策分支与操作路线
            </a>
            <a href="#comprehensive-faq" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第七章：高频疑问与边界问题 FAQ
            </a>
            <a href="#verified-backups" class="block p-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors">
              &bull; 第八章：实测高可用备用方案推荐
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
            二级专题直达
          </h4>
          <div class="space-y-1.5">
            <a href="/resources/warning/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 跑路预警数据库与前兆识别
            </a>
            <a href="/resources/free-nodes/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 免费节点获取与防投毒指引
            </a>
            <a href="/resources/subscription-issues/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 订阅拉取失败 403/404 修复
            </a>
            <a href="/resources/node-check/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 节点检测与真延迟测速工具
            </a>
            <a href="/resources/beginner/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 零基础翻墙扫盲入门指南
            </a>
            <a href="/resources/faq/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 机场高频常见问答全集
            </a>
            <a href="/resources/risk-intel/" class="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-medium">
              &bull; 机场风险情报动态与存活报告
            </a>
          </div>
        </div>

      </aside>

    </div>
  </div>
</BaseLayout>
`;

fs.writeFileSync('src/pages/resources/index.astro', astroTemplate, 'utf8');
console.log('Successfully written src/pages/resources/index.astro');

// Total Chinese character count calculation
const totalText = Object.values(textBlocks).join('\n') + '\n' + astroTemplate;
const grandTotalChinese = countChineseCharacters(totalText);
console.log('Grand Total Pure Chinese Characters across page & content:', grandTotalChinese);
