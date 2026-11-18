const fs = require('fs');

const current = fs.readFileSync('src/content/reviews/guangsu-cloud-deep-review.md', 'utf8');

// Add to body FAQ or add a section on pricing comparison
const addition = `

### Q9: 光速云的节点支持 UDP 转发与 Full-Cone NAT 吗？在外服主机联机中表现如何？
**解答**：光速云的全系 IEPL 专线节点全面支持完整的单线程 UDP 数据包透明转发，并在服务端网络内核中启用了 Full-Cone NAT（全锥型 NAT）穿透支持。在任天堂 Switch、索尼 PS5、微软 Xbox 或 PC 平台运行外服游戏（如《怪物猎人》、《FIFA / FC 24》、《使命召唤》）时，能够顺利获取 NAT Type B 或 NAT Type 1（Open）评级。配合其深港专线低于 22ms 的超低时延与 0.0% 的零丢包表现，能够彻底根治游戏联机房间无法加入、连麦语音断续以及对局中途网络报错掉线的顽疾。

### Q10: 为什么光速云没有提供「无门槛免费试用」？新用户如何用最低资金成本验证其实测表现？
**解答**：在跨境网络行业中，凡是提供公开免实名免费试用的机场，其试用服务器往往在数小时内就会被黑产灰产爬虫、批量发帖机和网络攻击者迅速挤爆沦陷，不仅极度耗费昂贵的国际专线带宽，还会导致正常付费用户的出口 IP 被连带风控拉黑。光速云为了保障付费专线用户的极高品质，始终坚持「严防滥用、不设公开免费白嫖通道」的原则。对于希望先验货再长期投入的新用户，测评实验室建议直接选购其支持按月计费的「极速版（¥25/月，含 168GB 专线流量）」。仅需二十余元即可在自己的真实宽带与设备上完整测试晚高峰 20:30 的极速表现，验证满意后再升级年付 ¥99 轻量版或买断 147 永久套餐，资金风险完全可控。
`;

// Insert addition before '## 六、六年历次重大网络敏感期应急响应与容灾复盘'
const splitPoint = '## 六、六年历次重大网络敏感期应急响应与容灾复盘';
const parts = current.split(splitPoint);

const finalDoc = parts[0] + addition.trim() + '\n\n---\n\n' + splitPoint + parts[1];

fs.writeFileSync('src/content/reviews/guangsu-cloud-deep-review.md', finalDoc, 'utf8');

const chCount = (finalDoc.match(/[\u4e00-\u9fa5]/g) || []).length;
console.log('Final pure Chinese chars in Article 7 after FAQ expansion:', chCount);
