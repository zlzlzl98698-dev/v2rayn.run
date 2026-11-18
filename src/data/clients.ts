export interface ClientSoftware {
  name: string;
  slug: string;
  platforms: ('Windows' | 'macOS' | 'Android' | 'iOS' | 'Linux' | 'OpenWrt')[];
  core: string;
  isFree: boolean;
  isOpenSource: boolean;
  downloadUrl: string;
  summary: string;
  features: string[];
  recommendedFor: string;
  notes?: string;
}

export const clientsData: ClientSoftware[] = [
  {
    name: 'Clash Verge Rev',
    slug: 'clash-verge-rev',
    platforms: ['Windows', 'macOS', 'Linux'],
    core: 'Mihomo (Clash.Meta)',
    isFree: true,
    isOpenSource: true,
    downloadUrl: 'https://github.com/clash-verge-rev/clash-verge-rev',
    summary: '目前电脑端最推荐的现代化Clash GUI客户端，支持TUN模式、中文界面与便捷订阅管理。',
    features: ['内置最新Mihomo内核', '支持TUN虚拟网卡接管全局流量', '规则分流与策略组切换', '跨平台深色浅色UI'],
    recommendedFor: '所有Windows与Mac电脑用户（新手及进阶推荐）'
  },
  {
    name: 'v2rayN',
    slug: 'v2rayn',
    platforms: ['Windows'],
    core: 'Xray / sing-box / Mihomo',
    isFree: true,
    isOpenSource: true,
    downloadUrl: 'https://github.com/2dust/v2rayN',
    summary: 'Windows经典老牌代理客户端，多核心支持，协议兼容性极其丰富。',
    features: ['支持VLESS、VMess、Trojan、Shadowsocks、Hysteria2等全协议', '多节点批量测试真连接延迟与速度', '路由规则与自定义分流', '支持全局和PAC模式'],
    recommendedFor: '需要测试多协议、对复杂网络参数有调试需求的Windows用户'
  },
  {
    name: 'v2rayNG',
    slug: 'v2rayng',
    platforms: ['Android'],
    core: 'Xray',
    isFree: true,
    isOpenSource: true,
    downloadUrl: 'https://github.com/2dust/v2rayNG',
    summary: '安卓平台最通用稳健的代理工具，轻量高效，支持全格式订阅与单节点导入。',
    features: ['支持VLESS/VMess/Trojan/SS/Socks', '分应用代理模式（绕过大陆或自选App）', '真连接延迟测速', '一键启动无多余广告'],
    recommendedFor: '几乎所有安卓手机用户，稳定性与兼容性首选'
  },
  {
    name: 'FlClash',
    slug: 'flclash',
    platforms: ['Windows', 'macOS', 'Android', 'Linux'],
    core: 'Mihomo',
    isFree: true,
    isOpenSource: true,
    downloadUrl: 'https://github.com/chen08209/FlClash',
    summary: '基于Flutter开发的多平台代理客户端，UI高度一致、简洁现代。',
    features: ['基于Mihomo内核', '全平台统一UI体验', '直观的分流策略控制', '轻量低资源占用'],
    recommendedFor: '喜欢多设备统一视觉风格、追求现代化界面设计感的用户'
  },
  {
    name: 'Shadowrocket（小火箭）',
    slug: 'shadowrocket',
    platforms: ['iOS'],
    core: '自研 / 多协议引擎',
    isFree: false,
    isOpenSource: false,
    downloadUrl: 'https://apps.apple.com/us/app/shadowrocket/id932747118',
    summary: 'iOS平台最普及的规则代理工具，需外区Apple ID购买（约$2.99），功能全面。',
    features: ['扫码或URL一键导入订阅', '支持HTTPS解密、节点测速与场景分流', '支持Widget组件与锁屏快捷开关', '协议支持极其完备'],
    recommendedFor: '苹果iPhone与iPad用户必备第一选择',
    notes: '中国大陆App Store未上架，需登录美区/港区等海外Apple ID购买。'
  },
  {
    name: 'Stash',
    slug: 'stash',
    platforms: ['iOS', 'macOS'],
    core: 'Clash兼容内核',
    isFree: false,
    isOpenSource: false,
    downloadUrl: 'https://apps.apple.com/us/app/stash-rule-based-proxy/id1596063349',
    summary: 'iOS/iPadOS/macOS平台上的Clash体验继承者，完美兼容Clash规则配置。',
    features: ['原生支持Clash YAML配置与订阅', '覆写与脚本控制功能', '极简美观的iOS原生界面', 'iCloud配置同步'],
    recommendedFor: '习惯Clash规则体系并在苹果全家桶中使用的用户'
  },
  {
    name: 'Hiddify',
    slug: 'hiddify',
    platforms: ['Windows', 'macOS', 'Android', 'iOS', 'Linux'],
    core: 'sing-box',
    isFree: true,
    isOpenSource: true,
    downloadUrl: 'https://github.com/hiddify/hiddify-next',
    summary: '全平台通用的多协议客户端，自动优选节点，新手友好度高。',
    features: ['支持Sing-box全协议与WARP集成', '全自动节点选择与延迟测试', '全平台开源免费', '跨平台体验高度一致'],
    recommendedFor: '多设备跨平台使用、不想复杂配置的用户'
  },
  {
    name: 'OpenClash',
    slug: 'openclash',
    platforms: ['OpenWrt'],
    core: 'Mihomo / Clash',
    isFree: true,
    isOpenSource: true,
    downloadUrl: 'https://github.com/vernesong/OpenClash',
    summary: '软路由与OpenWrt系统上的网络分流神器，实现全屋设备无感透明代理。',
    features: ['支持DNS防污染与Fake-IP模式', '游戏/电视/国内流量精准分流', '全家设备免安装客户端直接科学上网'],
    recommendedFor: '软路由、家庭NAS与网络极客玩家'
  }
];
