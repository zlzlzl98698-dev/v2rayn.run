const fs = require('fs');

function makeSvg(title, subtitle, color1, color2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="450" fill="url(#bg)"/>
  <rect width="800" height="450" fill="url(#grid)"/>
  <circle cx="700" cy="100" r="180" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
  <circle cx="700" cy="100" r="120" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <g transform="translate(60, 220)">
    <rect x="0" y="-70" width="120" height="32" rx="6" fill="rgba(255,255,255,0.2)"/>
    <text x="60" y="-49" font-family="sans-serif" font-size="14" font-weight="600" fill="#FFFFFF" text-anchor="middle">v2rayn指南</text>
    <text x="0" y="0" font-family="sans-serif" font-size="38" font-weight="800" fill="#FFFFFF">${title}</text>
    <text x="0" y="42" font-family="sans-serif" font-size="18" font-weight="400" fill="rgba(255,255,255,0.85)">${subtitle}</text>
  </g>
</svg>`;
}

fs.writeFileSync('public/images/covers/default.svg', makeSvg('专业网络工具指南', '客观实测 · 拒绝虚标 · 科学指南', '#1E3A8A', '#2563EB'));
fs.writeFileSync('public/images/covers/airport.svg', makeSvg('2026 机场推荐与实测', 'IEPL专线 · 晚高峰低延迟 · 4K流媒体解锁', '#1E40AF', '#3B82F6'));
fs.writeFileSync('public/images/covers/vpn.svg', makeSvg('VPN 与海外加速器测评', '全球节点 · 隐私加密 · 跨国办公与游戏加速', '#0F766E', '#0D9488'));
fs.writeFileSync('public/images/covers/clash.svg', makeSvg('Clash 客户端全家桶教程', 'Clash Verge Rev · Mihomo · 订阅配置与分流', '#4338CA', '#6366F1'));
fs.writeFileSync('public/images/covers/resources.svg', makeSvg('网络资源与风险预警', '免费节点鉴别 · 跑路避坑 · 故障排查手册', '#991B1B', '#DC2626'));
fs.writeFileSync('public/images/covers/speedtest.svg', makeSvg('晚高峰全网测速实录', '带宽吞吐 · 延迟抖动 · 丢包率客观观测', '#0F172A', '#1E293B'));
fs.writeFileSync('public/images/covers/guangsu.svg', makeSvg('光速云 2026 深度实测', 'IEPL双专线架构 · 8元入门 · 斯诺克永久套餐', '#1D4ED8', '#2563EB'));
fs.writeFileSync('public/images/covers/brand.svg', makeSvg('机场品牌客观评测库', '全参数横向对比 · 线路实测 · 真实购买建议', '#334155', '#475569'));

console.log('Cover SVGs generated successfully.');
