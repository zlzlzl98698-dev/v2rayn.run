export interface NavItem {
  title: string;
  href: string;
  description: string;
  keyword: string;
  icon?: string;
  badge?: string;
}

export interface PrimaryNav {
  id: string;
  title: string;
  href: string;
  description: string;
  items: NavItem[];
}

export const navigationData: PrimaryNav[] = [
  {
    id: 'airport',
    title: '机场推荐',
    href: '/airport/',
    description: '专业网络代理与高性价比机场实测评测、晚高峰表现与精选榜单',
    items: [
      {
        title: '机场推荐',
        href: '/airport/recommend/',
        description: '2026年经过实测筛选的高可用综合机场推荐与选择指南',
        keyword: '机场推荐'
      },
      {
        title: '机场排行',
        href: '/airport/ranking/',
        description: '按专线质量、晚高峰带宽、延迟与流媒体解锁综合评分榜单',
        keyword: '机场排行'
      },
      {
        title: '性价比机场',
        href: '/airport/cost-effective/',
        description: '兼顾专线速度与亲民价格的高性价比机场套餐横向对比',
        keyword: '性价比机场'
      },
      {
        title: '稳定机场',
        href: '/airport/stable/',
        description: '主打IEPL/IPLC企业内网专线、敏感期不失联的稳定机场',
        keyword: '稳定机场'
      },
      {
        title: '便宜机场',
        href: '/airport/cheap/',
        description: '低至5-10元/月的平民入门与大流量轻量备用机场甄选',
        keyword: '便宜机场'
      },
      {
        title: '免费梯子',
        href: '/airport/free/',
        description: '免费科学上网工具现状、白嫖节点风险解析与安全过渡指南',
        keyword: '免费梯子'
      },
      {
        title: '科学上网',
        href: '/airport/guide/',
        description: '网络协议、基础拓扑、加密原理与合规安全访问常识全景',
        keyword: '科学上网'
      }
    ]
  },
  {
    id: 'vpn',
    title: 'VPN 与加速器',
    href: '/vpn/',
    description: '跨国VPN工具对比、游戏/网络加速器测评与隐私加密深度解析',
    items: [
      {
        title: 'VPN 推荐',
        href: '/vpn/recommend/',
        description: '全球主流商业VPN与跨境网络加速服务的客观实测推荐',
        keyword: 'VPN 推荐'
      },
      {
        title: '免费 VPN',
        href: '/vpn/free/',
        description: '常见免费VPN的盈利模式、隐私日志风险与实用限额版本评测',
        keyword: '免费 VPN'
      },
      {
        title: '手机 VPN',
        href: '/vpn/mobile/',
        description: 'iOS与Android移动端免折腾、一键连接的轻量加速工具',
        keyword: '手机 VPN'
      },
      {
        title: 'VPN 软件评测',
        href: '/vpn/reviews/',
        description: 'ExpressVPN、NordVPN、Surfshark等主流客户端全面评测',
        keyword: 'VPN 软件评测'
      },
      {
        title: 'VPN 加速器',
        href: '/vpn/accelerator/',
        description: '面向海外回国、跨境游戏与海淘购物的专项加速方案',
        keyword: 'VPN 加速器'
      },
      {
        title: '加速器对比',
        href: '/vpn/comparison/',
        description: '专线代理 vs 传统商用VPN协议在延迟、速度与抗封锁上的对比',
        keyword: '加速器对比'
      },
      {
        title: '好用的 VPN',
        href: '/vpn/best/',
        description: '针对国内网络环境能够真实稳定连通的高可用VPN精选',
        keyword: '好用的 VPN'
      }
    ]
  },
  {
    id: 'clash',
    title: 'Clash 客户端',
    href: '/clash/',
    description: 'Clash Verge Rev、Mihomo内核及全平台客户端下载、配置与故障排查',
    items: [
      {
        title: 'Clash 推荐',
        href: '/clash/recommend/',
        description: 'Windows、macOS、Android及iOS各平台首选Clash系列客户端推荐',
        keyword: 'Clash 推荐'
      },
      {
        title: 'Clash Verge',
        href: '/clash/verge/',
        description: '现代开源Clash Verge Rev客户端功能全解析与界面设置',
        keyword: 'Clash Verge'
      },
      {
        title: 'Clash Verge 下载',
        href: '/clash/verge-download/',
        description: '官方安全下载源、Windows/Mac各架构安装包与避坑验证',
        keyword: 'Clash Verge 下载'
      },
      {
        title: 'Clash Verge 订阅',
        href: '/clash/verge-subscription/',
        description: '机场订阅链接导入、自动更新设置与自建配置规则管理',
        keyword: 'Clash Verge 订阅'
      },
      {
        title: 'Clash Meta',
        href: '/clash/meta/',
        description: 'Mihomo (Clash.Meta) 内核进阶特性、VLESS与sing-box协议支持',
        keyword: 'Clash Meta'
      },
      {
        title: 'Clash 使用教程',
        href: '/clash/tutorial/',
        description: '从零开始的分流规则、TUN虚拟网卡模式与系统代理全步骤图文',
        keyword: 'Clash 使用教程'
      },
      {
        title: 'Clash 故障排查',
        href: '/clash/troubleshooting/',
        description: '无法连接、端口占用、DNS污染、节点超时与证书报错彻底排查',
        keyword: 'Clash 故障排查'
      }
    ]
  },
  {
    id: 'resources',
    title: '资源与情报',
    href: '/resources/',
    description: '网络节点检测、最新跑路预警、订阅诊断与新手网络避坑知识库',
    items: [
      {
        title: '免费节点',
        href: '/resources/free-nodes/',
        description: '公共免费V2Ray/Clash节点获取渠道、存活率与安全隔离技巧',
        keyword: '免费节点'
      },
      {
        title: '跑路预警',
        href: '/resources/warning/',
        description: '机场跑路前兆识别、年付风险防范、退费难维权与备用应急策略',
        keyword: '跑路预警'
      },
      {
        title: '机场 FAQ',
        href: '/resources/faq/',
        description: '关于协议、倍率、重置日、原生IP、退款政策的高频问答全集',
        keyword: '机场 FAQ'
      },
      {
        title: '机场风险情报',
        href: '/resources/risk-intel/',
        description: '行业动态追踪、线路封锁警报、同系机场关联与真实存活报告',
        keyword: '机场风险情报'
      },
      {
        title: '节点检测',
        href: '/resources/node-check/',
        description: '真连接延迟测速、TCP阻断排查、流媒体解锁自动化检测工具',
        keyword: '节点检测'
      },
      {
        title: '订阅问题',
        href: '/resources/subscription-issues/',
        description: '订阅链接无法拉取、404/500错误、base64解码失败综合解决方案',
        keyword: '订阅问题'
      },
      {
        title: '新手帮助',
        href: '/resources/beginner/',
        description: '第一次翻墙零基础扫盲：从选择客户端到导入订阅的完整闭环',
        keyword: '新手帮助'
      }
    ]
  }
];

export const siteMeta = {
  name: 'v2rayn指南',
  domain: 'v2rayn.run',
  siteUrl: 'https://v2rayn.run',
  description: '专业的中文网络工具知识库与机场/VPN客观评测媒体，提供前沿专线实测、客户端教程与避坑指南。',
  slogan: '客观实测 · 拒绝虚标 · 科学指南',
  author: 'v2rayn指南测评实验室',
};
