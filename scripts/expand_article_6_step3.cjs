const fs = require('fs');

const current = fs.readFileSync('src/content/guides/shadowrocket-ios-setup-tutorial.md', 'utf8');

const anchor = '## 十二、站内内容关系与内部链接导航';
const parts = current.split(anchor);

const dnsSection = `## 十二、深度排查高级案例：DNS 泄漏与 WebRTC 真实 IP 暴露防范

许多在跨国金融、境外电商或学术合规领域工作的严肃用户，经常面临一个极其致命但极度隐蔽的安全漏洞——**DNS 泄漏（DNS Leak）与 WebRTC 真实 IP 暴露**。

\`\`\`mermaid
flowchart TD
    UserApp[iPhone 浏览器访问敏感目标网站] --> CheckDNS{域名解析由谁处理？}
    CheckDNS -->|发生 DNS 泄漏| LocalDNS[直接由中国电信/联通本地 DNS 服务器解析！<br/>(致命隐患: 目标服务商根据 DNS 来源判定真实中国 IP, 立即封控)]
    CheckDNS -->|标准 DoH 加密防泄漏| RemoteDNS[通过 IEPL 专线在远端海外机房完成 DoH 解析<br/>(完美防护: 目标仅能看到纯净海外出口 IP)]
\`\`\`

### 12.1 什么是 DNS 泄漏？为什么它会直接导致封号？
当你在浏览器中输入 \`paypal.com\` 或 \`openai.com\` 时，手机必须先发起 DNS 解析请求将域名转换为 IP 地址。
- **致命漏洞场景**：如果小火箭的 DNS 解析规则没有严格配置，虽然访问网页的内容走的是海外专线，但手机解析域名的请求却被直接发送给了本地运营商的 DNS 服务器（如 114.114.114.114 或本地电信 DNS）。
- **严重后果**：目标网站（如 PayPal 或银行风控系统）通过嵌入的第三方探测脚本，读取到处理该次请求的 DNS 服务器位于中国某省某市，而 HTTP 访问的落地 IP 却位于美国洛杉矶。**这种“出口 IP 与解析 DNS 地理位置严重割裂”的特征，会被顶级风控系统直接标记为高风险代理欺诈，导致账号秒封**！

### 12.2 Shadowrocket 终极防泄漏实战配置步骤
1. **启用 DoH 加密 DNS**：
   进入 Shadowrocket 的「设置」->「DNS」：
   - 开启 **「DNS 覆写 (DNS Override)」**；
   - 在「DNS 服务器」一栏，清空所有默认的明文 UDP 53 端口地址，输入加密的 DoH（DNS over HTTPS）解析链接：
     - 海外加密解析：\`https://1.1.1.1/dns-query\` 与 \`https://8.8.8.8/dns-query\`；
     - 国内防污染解析：\`https://223.5.5.5/dns-query\`；
2. **强制远程解析（Remote DNS Resolution）**：
   在「配置」-> 生效规则的高级设置中，确保所有针对海外域名的 PROXY 规则，末尾**不要勾选**「no-resolve」开关。允许小火箭在目标海外落地节点机房内部直接完成 DNS 解析，确保 DNS 出口与流量出口完美合一；
3. **彻底规避 IPv6 漏流**：
   目前中国各大运营商均已全面铺设 IPv6 网络。如果手机同时获取了 IPv4 与 IPv6 地址，而专线节点仅支持 IPv4，部分应用会绕过小火箭的 IPv4 隧道直接通过移动网络的 IPv6 直连出海，造成严重的真实 IP 泄露。
   - **防范建议**：在小火箭「设置」->「隧道 (Tunnel)」中，开启 **「仅使用 IPv4 (IPv4 Only)」** 或「禁用 IPv6 路由」，强行将所有网络握手收敛至受控的 IPv4 专线隧道中，确保隐私安全万无一失。

---

## 十三、站内内容关系与内部链接导航`;

const finalDoc = parts[0] + dnsSection + parts[1];
fs.writeFileSync('src/content/guides/shadowrocket-ios-setup-tutorial.md', finalDoc, 'utf8');

const chCount = (finalDoc.match(/[\u4e00-\u9fa5]/g) || []).length;
console.log('Final pure Chinese chars in Article 6:', chCount);
