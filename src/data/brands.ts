import type { Brand } from '../types/brand';

export const brands: Brand[] = [
  {
    "id": "guangsu",
    "name": "光速云",
    "slug": "guangsu",
    "englishName": "GuangSu Cloud",
    "aliases": [
      "光速云加速",
      "GSY Cloud"
    ],
    "rank": 1,
    "featured": true,
    "tagline": "IEPL专线 + 企业内网专线双架构，主打大带宽与晚高峰超低时延",
    "description": "光速云自2020年起稳定运营，是老牌综合型高性价比机场。采用IEPL专线与企业级内网专线双线路架构，单节点最高支持2.5Gbps带宽，提供原生稳定节点与独享IP定制方案。支持VLESS协议，覆盖自研跨平台客户端及Clash、Shadowrocket等主流第三方通用订阅。",
    "affUrl": "https://sahude.gsyvipaff.com/#/?code=keqgvT5Y",
    "couponCode": "AMM",
    "couponDiscount": "新人优惠券",
    "startingPrice": "¥8/月（年付折算）",
    "billingCycle": "年付/月付/一次性",
    "trafficRange": "69GB - 900GB/月，亦有247GB永久套餐",
    "lineType": "IEPL专线 + 企业级内网专线",
    "protocols": [
      "VLESS",
      "Trojan"
    ],
    "clients": [
      "Windows",
      "Android",
      "iOS",
      "macOS",
      "Linux",
      "Clash",
      "Shadowrocket",
      "v2rayN",
      "自研客户端"
    ],
    "nodeRegions": [
      "香港(20+)",
      "台湾(5+)",
      "日本(10+)",
      "新加坡(10+)",
      "美国(10+)",
      "马来西亚",
      "英国",
      "法国",
      "德国",
      "土耳其",
      "巴西"
    ],
    "hasCustomClient": true,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "partial",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 IEPL 01",
        "latency": "22ms",
        "download": "529 Mbps"
      },
      {
        "region": "台湾 BGP优化",
        "latency": "41ms",
        "download": "114 Mbps"
      },
      {
        "region": "新加坡 专线",
        "latency": "46ms",
        "download": "387 Mbps"
      },
      {
        "region": "日本 东京专线",
        "latency": "57ms",
        "download": "135 Mbps"
      },
      {
        "region": "美国 洛杉矶优化",
        "latency": "143ms",
        "download": "18 Mbps"
      }
    ],
    "speedTestDate": "2026-10-19（非晚高峰基准实测）",
    "plans": [
      {
        "name": "致敬斯诺克147永久套餐",
        "billing": "一次性付费",
        "price": "¥147",
        "traffic": "247GB 不过期",
        "period": "一次性",
        "notes": "不限设备，原生稳定节点，最高2.5Gbps"
      },
      {
        "name": "轻量版（年付）",
        "billing": "年付",
        "price": "¥99/年（折合约¥8.25/月）",
        "traffic": "69GB/月",
        "period": "每月",
        "notes": "轻量入门，原生稳定节点，不限设备"
      },
      {
        "name": "极速版",
        "billing": "月付",
        "price": "¥25/月",
        "traffic": "168GB/月",
        "period": "每月",
        "notes": "全球IPLC，全节点1x倍率，最高2.5Gbps"
      },
      {
        "name": "流光版",
        "billing": "月付",
        "price": "¥34/月",
        "traffic": "268GB/月",
        "period": "每月",
        "notes": "IPLC专线，多端多设备高速互联"
      },
      {
        "name": "量子版",
        "billing": "月付",
        "price": "¥68/月",
        "traffic": "568GB/月",
        "period": "每月",
        "notes": "大流量高速档，适合4K流媒体与高负载"
      },
      {
        "name": "无界版",
        "billing": "月付",
        "price": "¥138/月",
        "traffic": "900GB/月",
        "period": "每月",
        "notes": "超大流量，重度开发与跨国团队协作"
      },
      {
        "name": "定制企业版",
        "billing": "月付",
        "price": "¥680/月",
        "traffic": "500GB/月",
        "period": "每月",
        "notes": "线下按需独立部署，独享原生IP与独立带宽，7x24专属运维"
      }
    ],
    "pros": [
      "2020年起稳定运营，非跑路高发期新开机场",
      "年付轻量折算月均仅约8元，性价比极为突出",
      "支持最新VLESS协议与IEPL专线，抗封锁与稳定性优异",
      "同时提供免配置自研客户端与第三方通用订阅导入",
      "拥有独家一次性247GB不过期永久套餐，适合轻度备用"
    ],
    "cons": [
      "最低约8元为年付折算价格，非月付起步价",
      "部分节点ChatGPT和Gemini存在受限，需手动切换适配合规节点",
      "特殊轻量与活动商品不支持无理由退款"
    ],
    "suitableFor": [
      "追求晚高峰流媒体4K秒开与高稳定性的进阶用户",
      "跨境电商、TikTok直播运营与外贸社媒投放人员",
      "需要长效备用节点、不想每月续费的轻度办公用户",
      "希望既有一键登录自研App、又想用Clash/Shadowrocket的玩家"
    ],
    "unsuitableFor": [
      "仅愿月付3-5元超极低预算玩家",
      "对任意单一节点要求100%永久免切换AI解锁的用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料及官方套餐实测",
    "tags": [
      "主推推荐",
      "2020老牌",
      "IEPL专线",
      "VLESS协议",
      "自研客户端",
      "性价比较高",
      "4K流媒体"
    ]
  },
  {
    "id": "muguang",
    "name": "暮光加速",
    "slug": "muguang",
    "englishName": "Twilight Network",
    "aliases": [
      "暮光云",
      "muguang"
    ],
    "rank": 2,
    "featured": false,
    "tagline": "BGP智能调度与专线级出口，面向多设备多端全平台协同",
    "description": "暮光加速于2023年正式运营，主打BGP智能路由调度与高可用专线级出口。全面覆盖Windows、macOS、iOS、Android及Linux全平台，支持多设备同时在线无压力。套餐提供120GB至1500GB多档常规周期包以及不限时大容量流量包。",
    "affUrl": "https://varnexa.twilightaff.com/#/?code=D1LHglg3",
    "couponCode": "muguang5555",
    "startingPrice": "¥20/月",
    "billingCycle": "月付/年付/不限时",
    "trafficRange": "120GB - 1500GB/月，或150GB-800GB不限时",
    "lineType": "BGP智能调度 + 专线级出口",
    "protocols": [
      "VLESS",
      "Trojan",
      "Shadowsocks"
    ],
    "clients": [
      "Windows",
      "macOS",
      "iOS",
      "Android",
      "Linux",
      "Clash",
      "Shadowrocket",
      "sing-box"
    ],
    "nodeRegions": [
      "香港",
      "台湾",
      "日本",
      "新加坡",
      "美国",
      "德国",
      "英国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 专线 01",
        "latency": "26ms",
        "download": "509 Mbps"
      },
      {
        "region": "台湾 BGP调度",
        "latency": "40ms",
        "download": "107 Mbps"
      },
      {
        "region": "新加坡 优化",
        "latency": "43ms",
        "download": "419 Mbps"
      },
      {
        "region": "日本 东京专线",
        "latency": "53ms",
        "download": "150 Mbps"
      },
      {
        "region": "美国 圣何塞",
        "latency": "160ms",
        "download": "19 Mbps"
      }
    ],
    "speedTestDate": "2026-10-19",
    "plans": [
      {
        "name": "暮光·基础版",
        "billing": "月付",
        "price": "¥20/月",
        "traffic": "120GB/月",
        "period": "每月",
        "notes": "全平台多设备在线，BGP智能调度"
      },
      {
        "name": "暮光·标准版",
        "billing": "月付",
        "price": "¥40/月",
        "traffic": "240GB/月",
        "period": "每月",
        "notes": "主流速度保障，支持4K流媒体"
      },
      {
        "name": "暮光·旗舰版",
        "billing": "月付",
        "price": "¥100/月",
        "traffic": "700GB/月",
        "period": "每月",
        "notes": "大流量需求首选，团队多设备支持"
      },
      {
        "name": "暮光·至尊版",
        "billing": "月付",
        "price": "¥180/月",
        "traffic": "1500GB/月",
        "period": "每月",
        "notes": "超高带宽吞吐，极速出口"
      },
      {
        "name": "暮光·年付轻量版",
        "billing": "年付",
        "price": "¥109/年",
        "traffic": "70GB/月",
        "period": "每月",
        "notes": "平均约9元/月，性价比入门"
      },
      {
        "name": "不限时轻量包",
        "billing": "一次性付费",
        "price": "¥219",
        "traffic": "150GB",
        "period": "一次性",
        "notes": "永不过期，用完为止"
      },
      {
        "name": "不限时标准包",
        "billing": "一次性付费",
        "price": "¥529",
        "traffic": "400GB",
        "period": "一次性",
        "notes": "长期稳定备用"
      }
    ],
    "pros": [
      "BGP多线接入，国内入口低延迟调度效果好",
      "多设备多端同时在线友好，适合跨设备协同",
      "提供不限时一次性流量包，满足低频次长期备用需求",
      "官方配备7×24小时在线客服支持"
    ],
    "cons": [
      "月付入门价格20元在基础机场中属中等价位",
      "Gemini等部分AI服务受节点地域策略限制需手动筛选"
    ],
    "suitableFor": [
      "多设备（手机、平板、笔电、家庭路由）同时使用的用户",
      "需要不限时永久流量包防断连的轻量用户",
      "看重售后响应与客服支持的用户"
    ],
    "unsuitableFor": [
      "只找5元以下超低预算的用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料及基准测速",
    "tags": [
      "BGP智能调度",
      "多设备协同",
      "不限时流量",
      "全平台适配"
    ]
  },
  {
    "id": "feimao",
    "name": "飞猫云",
    "slug": "feimao",
    "englishName": "FlyCat Cloud",
    "aliases": [
      "飞猫加速",
      "feimao"
    ],
    "rank": 3,
    "featured": false,
    "tagline": "7元档学生入门首选，专属自研客户端开箱即用免配订阅",
    "description": "飞猫云自2023年运营，以简单轻快、开箱即用为核心定位。专门开发了全平台专属客户端，用户无需理解复杂的订阅转换与节点分流，登录即可一键连接。年付学生版折合仅约7元/月，并提供8折新客优惠码。",
    "affUrl": "https://guangs.flycataff.com/#/?code=6uq0Xe9y",
    "couponCode": "flycat888",
    "couponDiscount": "全场8折",
    "startingPrice": "¥7/月（年付折算）",
    "billingCycle": "年付/月付",
    "trafficRange": "50GB - 300GB/月",
    "lineType": "亚太优质直连 + 专线中转",
    "protocols": [
      "Shadowsocks",
      "VLESS"
    ],
    "clients": [
      "专属自研Windows/Mac/Android",
      "Clash",
      "Shadowrocket"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": true,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "supported",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 优化 01",
        "latency": "35ms",
        "download": "380 Mbps"
      },
      {
        "region": "日本 专线 02",
        "latency": "65ms",
        "download": "240 Mbps"
      },
      {
        "region": "新加坡 直连",
        "latency": "52ms",
        "download": "310 Mbps"
      }
    ],
    "speedTestDate": "2026-10-19",
    "plans": [
      {
        "name": "飞猫·学生版",
        "billing": "年付",
        "price": "¥84/年（折合约¥7/月）",
        "traffic": "50GB/月",
        "period": "每月",
        "notes": "轻度查资料与社交，性价比极高"
      },
      {
        "name": "飞猫·星耀版",
        "billing": "月付",
        "price": "¥25/月",
        "traffic": "150GB/月",
        "period": "每月",
        "notes": "高速全节点，支持4K视频与AI工具"
      },
      {
        "name": "飞猫·尊享版",
        "billing": "月付",
        "price": "¥45/月",
        "traffic": "300GB/月",
        "period": "每月",
        "notes": "大流量档位，多设备高速流媒体"
      }
    ],
    "pros": [
      "专属客户端开箱即用，免去导入和转换订阅门槛",
      "年付84元（约7元/月）价格极其亲民，叠加8折优惠码更划算",
      "AI与流媒体解锁覆盖完整"
    ],
    "cons": [
      "入门学生版月流量50GB相对有限，不适合超大下载",
      "高级进阶自定义路由分流需借助第三方工具"
    ],
    "suitableFor": [
      "初次接触代理、不想折腾配置与规则的纯新手小白",
      "学生党、考研查阅外网文献与轻度社交用户"
    ],
    "unsuitableFor": [
      "每月消耗数百GB的高清影视剧下载狂人"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料及实测",
    "tags": [
      "新手推荐",
      "自研免配客户端",
      "7元档",
      "学生优惠",
      "8折优惠码"
    ]
  },
  {
    "id": "weifeng",
    "name": "微风网络",
    "slug": "weifeng",
    "englishName": "BreezeNet",
    "aliases": [
      "微风云",
      "weifeng"
    ],
    "rank": 4,
    "featured": false,
    "tagline": "7元档IEPL专线，性价比梯队中的专线中坚力量",
    "description": "微风网络自2023年运营，主打IEPL内网专线与平民化定价。最低套餐折合年付约7元/月，提供9折优惠码。全节点采用专线传输避免公网QoS干扰，保证晚高峰基础流畅度。",
    "affUrl": "https://edp01.breezenetaff.com/#/?code=t3huofyI",
    "couponCode": "flat888",
    "couponDiscount": "9折优惠",
    "startingPrice": "¥7/月（年付折算）",
    "billingCycle": "年付/月付",
    "trafficRange": "50GB - 500GB/月",
    "lineType": "IEPL专线",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN",
      "sing-box"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 IEPL",
        "latency": "28ms",
        "download": "420 Mbps"
      },
      {
        "region": "日本 专线",
        "latency": "58ms",
        "download": "280 Mbps"
      }
    ],
    "speedTestDate": "2026-10-19",
    "plans": [
      {
        "name": "微风·轻量年付",
        "billing": "年付",
        "price": "¥84/年",
        "traffic": "50GB/月",
        "period": "每月",
        "notes": "折合约7元/月"
      },
      {
        "name": "微风·标准月付",
        "billing": "月付",
        "price": "¥22/月",
        "traffic": "120GB/月",
        "period": "每月",
        "notes": "IEPL专线保障"
      }
    ],
    "pros": [
      "平价享受IEPL专线",
      "有9折优惠码",
      "协议支持现代化"
    ],
    "cons": [
      "轻量年付流量偏小",
      "无独立自研客户端"
    ],
    "suitableFor": [
      "想要专线又不想花大钱的用户"
    ],
    "unsuitableFor": [
      "必须使用傻瓜式独立App的新手"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "IEPL专线",
      "7元档",
      "9折优惠",
      "性价比专线"
    ]
  },
  {
    "id": "dalaoyun",
    "name": "大佬云",
    "slug": "dalaoyun",
    "englishName": "DaLao Cloud",
    "aliases": [
      "dalaoyun"
    ],
    "rank": 5,
    "featured": false,
    "tagline": "5.6元/月超低门槛，平民化轻量翻墙备用利器",
    "description": "大佬云以极致性价比著称，入门套餐低至5.6元/月（60GB），并支持优惠码dly888。主打低门槛与经济实用，适合作为主力机外的第二备用通道。",
    "affUrl": "https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN",
    "couponCode": "dly888",
    "startingPrice": "¥5.6/月",
    "billingCycle": "月付/年付",
    "trafficRange": "60GB - 300GB/月",
    "lineType": "BGP优质隧道",
    "protocols": [
      "VLESS",
      "Trojan"
    ],
    "clients": [
      "Clash",
      "v2rayN",
      "Shadowrocket"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "partial",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "partial",
      "disney": "partial",
      "youtube": "supported",
      "hbo": "untested",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 01",
        "latency": "45ms",
        "download": "180 Mbps"
      },
      {
        "region": "日本 01",
        "latency": "75ms",
        "download": "110 Mbps"
      }
    ],
    "speedTestDate": "2026-10-19",
    "plans": [
      {
        "name": "大佬·极客入门",
        "billing": "月付",
        "price": "¥5.6/月",
        "traffic": "60GB/月",
        "period": "每月",
        "notes": "超低预算首选"
      },
      {
        "name": "大佬·进阶版",
        "billing": "月付",
        "price": "¥15/月",
        "traffic": "180GB/月",
        "period": "每月",
        "notes": "日常多媒体"
      }
    ],
    "pros": [
      "价格极低，5.6元月付门槛低",
      "支持主流第三方通用客户端",
      "适合做应急备用"
    ],
    "cons": [
      "晚高峰流媒体和AI部分节点可能降速或受限"
    ],
    "suitableFor": [
      "预算极其有限的学生党或需第二条备用线路的用户"
    ],
    "unsuitableFor": [
      "要求8K无损秒开和极低延迟游戏的专业用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "5.6元档",
      "超低价",
      "平民备用",
      "高性价比"
    ]
  },
  {
    "id": "xingdaomeng",
    "name": "星岛梦",
    "slug": "xingdaomeng",
    "englishName": "Star Island Dream",
    "aliases": [
      "星岛梦云",
      "xingdaomeng"
    ],
    "rank": 6,
    "featured": false,
    "tagline": "2020年老牌稳定运营，主打不限时流量包与长期使用",
    "description": "星岛梦自2020年稳定运营至今，属于行业内运营周期较长的品牌。核心特色在于提供多档不限时流量套餐，不用担心月末清零，买一次用一年，深受低频办公与长期备用用户信赖。",
    "affUrl": "https://guangs.xingdaomeng.com/#/?code=1TynBYnR",
    "couponCode": "nmw888",
    "startingPrice": "¥15/月",
    "billingCycle": "月付/不限时",
    "trafficRange": "100GB - 500GB或不限时包",
    "lineType": "BGP中转 + 专线直连",
    "protocols": [
      "Shadowsocks",
      "VLESS"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN",
      "sing-box"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国",
      "欧洲"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "supported",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 节点",
        "latency": "32ms",
        "download": "350 Mbps"
      },
      {
        "region": "日本 节点",
        "latency": "62ms",
        "download": "210 Mbps"
      }
    ],
    "speedTestDate": "2026-10-19",
    "plans": [
      {
        "name": "常规月付版",
        "billing": "月付",
        "price": "¥18/月",
        "traffic": "120GB/月",
        "period": "每月",
        "notes": "稳定日常"
      },
      {
        "name": "不限时永续包",
        "billing": "一次性付费",
        "price": "¥168",
        "traffic": "200GB",
        "period": "一次性",
        "notes": "永不过期"
      }
    ],
    "pros": [
      "2020老牌信誉佳",
      "提供不限时永久套餐",
      "优惠码nmw888"
    ],
    "cons": [
      "起步价非业内最低"
    ],
    "suitableFor": [
      "出差、低频外网查阅者，厌倦月月续费的用户"
    ],
    "unsuitableFor": [
      "追求每GB仅需几分钱的超大流量重度下载者"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "2020老牌",
      "不限时套餐",
      "稳定运营",
      "流媒体支持"
    ]
  },
  {
    "id": "ermao",
    "name": "二猫云",
    "slug": "ermao",
    "englishName": "ErMao Cloud",
    "aliases": [
      "ermao"
    ],
    "rank": 7,
    "featured": false,
    "tagline": "20元130GB均衡套餐，兼顾速度与多协议适配",
    "description": "二猫云以均衡稳定的服务体验获得众多拥趸，主打20元档位130GB流量包，优惠码ermao5555。支持多协议切换与主流流媒体全解锁。",
    "affUrl": "https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW",
    "couponCode": "ermao5555",
    "startingPrice": "¥20/月",
    "billingCycle": "月付/季付",
    "trafficRange": "130GB - 500GB/月",
    "lineType": "BGP高带宽中转",
    "protocols": [
      "Shadowsocks",
      "VLESS",
      "Trojan"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 01",
        "latency": "30ms",
        "download": "410 Mbps"
      },
      {
        "region": "台湾 01",
        "latency": "48ms",
        "download": "190 Mbps"
      }
    ],
    "speedTestDate": "2026-10-19",
    "plans": [
      {
        "name": "二猫标准版",
        "billing": "月付",
        "price": "¥20/月",
        "traffic": "130GB/月",
        "period": "每月",
        "notes": "性价比均衡"
      }
    ],
    "pros": [
      "20元档流量实在",
      "三网直连延迟良好"
    ],
    "cons": [
      "无年付超低折算档"
    ],
    "suitableFor": [
      "中度日常视频和工作用户"
    ],
    "unsuitableFor": [
      "超重度多端BT用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "20元档",
      "均衡推荐",
      "流媒体解锁"
    ]
  },
  {
    "id": "wuyou",
    "name": "无忧链接",
    "slug": "wuyou",
    "englishName": "WorryFree Link",
    "aliases": [
      "无忧云",
      "wuyou"
    ],
    "rank": 8,
    "featured": false,
    "tagline": "订阅无需转换原生直连，6元平价轻量体验",
    "description": "无忧链接主打「零门槛转换」的订阅机制，后台一键直接生成适用于各类客户端的原生格式，无需第三方转换平台转换。入门套餐仅6元，优惠码wuyou666。",
    "affUrl": "https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL",
    "couponCode": "wuyou666",
    "startingPrice": "¥6/月",
    "billingCycle": "月付/年付",
    "trafficRange": "50GB - 300GB/月",
    "lineType": "多线BGP隧道",
    "protocols": [
      "VLESS",
      "Trojan",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN",
      "sing-box"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "partial",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 入口",
        "latency": "33ms",
        "download": "290 Mbps"
      }
    ],
    "speedTestDate": "2026-10-19",
    "plans": [
      {
        "name": "无忧·体验版",
        "billing": "月付",
        "price": "¥6/月",
        "traffic": "50GB/月",
        "period": "每月",
        "notes": "免转换订阅"
      }
    ],
    "pros": [
      "订阅无需转换直接支持",
      "6元低价起步"
    ],
    "cons": [
      "极低价套餐晚高峰偶有波动"
    ],
    "suitableFor": [
      "害怕订阅格式错误的初学者"
    ],
    "unsuitableFor": [
      "高可用企业专线场景"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "免转换订阅",
      "6元档",
      "新手友好"
    ]
  },
  {
    "id": "weitu",
    "name": "唯兔云",
    "slug": "weitu",
    "englishName": "V2Yun",
    "aliases": [
      "唯兔加速",
      "weitu"
    ],
    "rank": 9,
    "featured": false,
    "tagline": "60+丰富节点覆盖，三网深度优化与智能负载均衡",
    "description": "唯兔云部署了超过60个落地节点，涵盖电信、联通、移动三网专属优化入口，并依托智能负载均衡技术，确保节点在高峰期自动分流，优惠码weitu666。",
    "affUrl": "https://guangs.v2yunvipaff.com/#/?code=xIutqOBA",
    "couponCode": "weitu666",
    "startingPrice": "¥18/月",
    "billingCycle": "月付/年付",
    "trafficRange": "100GB - 600GB/月",
    "lineType": "三网优化专线",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "sing-box"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国",
      "英国",
      "德国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "supported",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 优化",
        "latency": "27ms",
        "download": "460 Mbps"
      }
    ],
    "speedTestDate": "2026-10-19",
    "plans": [
      {
        "name": "唯兔·标准版",
        "billing": "月付",
        "price": "¥18/月",
        "traffic": "100GB/月",
        "period": "每月",
        "notes": "60+节点全开"
      }
    ],
    "pros": [
      "节点数量多，冷门热门兼具",
      "三网分别优化入口"
    ],
    "cons": [
      "节点较多时新手选点需配合自动测速"
    ],
    "suitableFor": [
      "需要频繁切换不同地区IP的用户"
    ],
    "unsuitableFor": [
      "仅需单一香港节点的用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "60+节点",
      "三网优化",
      "负载均衡"
    ]
  },
  {
    "id": "firefly",
    "name": "Firefly（萤火虫）",
    "slug": "firefly",
    "englishName": "Firefly Cloud",
    "aliases": [
      "萤火虫",
      "firefly"
    ],
    "rank": 10,
    "featured": false,
    "tagline": "全链路IPLC专线+VLESS，老牌团队原生IP与6档跨度套餐",
    "description": "Firefly（萤火虫）以全IPLC专线与VLESS协议为基石，资料记录拥有长年团队运营背景。主打原生IP解锁、不限速不限设备，提供免翻墙官网直连通道。套餐从60GB年付跨越至1000GB/月大容量，并支持不限时流量包。",
    "affUrl": "https://vip02.fireflyaff.com/#/?code=2n7VURre",
    "couponCode": "firefly",
    "couponDiscount": "新用户8折",
    "startingPrice": "¥8/月（年付折算）",
    "billingCycle": "年付/月付/多周期/不限时",
    "trafficRange": "60GB - 1000GB/月，亦有100GB不限时",
    "lineType": "IPLC专线 + 原生IP",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN",
      "sing-box"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "supported",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 IPLC",
        "latency": "24ms",
        "download": "490 Mbps"
      }
    ],
    "speedTestDate": "2026-10-19",
    "plans": [
      {
        "name": "Firefly年付版",
        "billing": "年付",
        "price": "¥96/年（折合¥8/月）",
        "traffic": "60GB/月",
        "period": "每月",
        "notes": "轻量专线"
      },
      {
        "name": "Firefly Lite",
        "billing": "月付",
        "price": "¥25/月",
        "traffic": "150GB/月",
        "period": "每月",
        "notes": "IPLC全速"
      },
      {
        "name": "Firefly Plus",
        "billing": "月付",
        "price": "¥45/月",
        "traffic": "300GB/月",
        "period": "每月",
        "notes": "大流量"
      },
      {
        "name": "Firefly不限时",
        "billing": "一次性付费",
        "price": "¥100",
        "traffic": "100GB",
        "period": "一次性",
        "notes": "永不过期"
      }
    ],
    "pros": [
      "全IPLC专线不经公网",
      "免翻墙访问官网",
      "新用户8折优惠码"
    ],
    "cons": [
      "仅支持支付宝与USDT，无微信直接支付"
    ],
    "suitableFor": [
      "追求极致IPLC专线稳定与原生IP解锁的用户"
    ],
    "unsuitableFor": [
      "仅习惯使用微信支付的用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "IPLC专线",
      "原生IP",
      "新客8折",
      "免翻墙官网"
    ]
  },
  {
    "id": "yuzhou",
    "name": "宇宙云",
    "slug": "yuzhou",
    "englishName": "YuZhou Cloud",
    "aliases": [
      "yuzhou"
    ],
    "rank": 11,
    "featured": false,
    "tagline": "IEPL专线+VLESS+自研客户端，综合体验型实力派",
    "description": "宇宙云采用IEPL专线配合VLESS现代传输协议，拥有自主研发的一键式客户端，降低使用门槛。优惠码YUZHOU553，适合看重稳定与简单操作的用户。",
    "affUrl": "https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1",
    "couponCode": "YUZHOU553",
    "startingPrice": "¥19/月",
    "billingCycle": "月付/年付",
    "trafficRange": "100GB - 500GB/月",
    "lineType": "IEPL专线",
    "protocols": [
      "VLESS"
    ],
    "clients": [
      "自研客户端",
      "Clash",
      "Shadowrocket"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": true,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 IEPL",
        "latency": "30ms",
        "download": "380 Mbps"
      }
    ],
    "plans": [
      {
        "name": "标准套餐",
        "billing": "月付",
        "price": "¥19/月",
        "traffic": "100GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "自研客户端简捷",
      "IEPL专线延迟低"
    ],
    "cons": [
      "优惠活动频率一般"
    ],
    "suitableFor": [
      "喜欢自研客户端的手机与电脑用户"
    ],
    "unsuitableFor": [
      "纯找几元低价的用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "IEPL专线",
      "自研客户端",
      "VLESS"
    ]
  },
  {
    "id": "u1s1",
    "name": "U1S1",
    "slug": "u1s1",
    "englishName": "U1S1 Cloud",
    "aliases": [
      "有一说一",
      "u1s1"
    ],
    "rank": 12,
    "featured": false,
    "tagline": "20元120GB标准方案，透明稳定的务实之选",
    "description": "U1S1坚持实话实说的产品定价理念，主推20元120GB标准月付方案，优惠码akaka。线路配置扎实，适合日常流媒体与办公。",
    "affUrl": "https://guangs.vipaff.cc/#/?code=xhX5X22f",
    "couponCode": "akaka",
    "startingPrice": "¥20/月",
    "billingCycle": "月付",
    "trafficRange": "120GB - 400GB/月",
    "lineType": "BGP中转专线",
    "protocols": [
      "Shadowsocks",
      "VLESS"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 01",
        "latency": "32ms",
        "download": "360 Mbps"
      }
    ],
    "plans": [
      {
        "name": "标准方案",
        "billing": "月付",
        "price": "¥20/月",
        "traffic": "120GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "20元120G性价比平衡",
      "透明计费"
    ],
    "cons": [
      "缺少超小容量极速试用包"
    ],
    "suitableFor": [
      "中度日常用户"
    ],
    "unsuitableFor": [
      "大流量下载用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "务实推荐",
      "20元档",
      "流媒体支持"
    ]
  },
  {
    "id": "lingmao",
    "name": "灵猫网络",
    "slug": "lingmao",
    "englishName": "CivetNet",
    "aliases": [
      "灵猫云",
      "lingmao"
    ],
    "rank": 13,
    "featured": false,
    "tagline": "19元150GB高性价比，兼具不限时持久流量包",
    "description": "灵猫网络提供19元150GB的高规格月付方案，在同价位中流量充裕。同时具备不限时永久流量包选项，优惠码lmao888。",
    "affUrl": "https://vip01.civetnet.com/#/?code=8MIAyxak",
    "couponCode": "lmao888",
    "startingPrice": "¥19/月",
    "billingCycle": "月付/不限时",
    "trafficRange": "150GB - 500GB/月",
    "lineType": "BGP优化专线",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "sing-box"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 节点",
        "latency": "29ms",
        "download": "390 Mbps"
      }
    ],
    "plans": [
      {
        "name": "灵猫畅享版",
        "billing": "月付",
        "price": "¥19/月",
        "traffic": "150GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "19元150G容量优于多数同价位",
      "支持不限时套餐"
    ],
    "cons": [
      "无独立专属客户端"
    ],
    "suitableFor": [
      "需要略多一点流量但预算锁定20以内的用户"
    ],
    "unsuitableFor": [
      "极简傻瓜需求用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "19元150G",
      "不限时",
      "高性价比"
    ]
  },
  {
    "id": "jilian",
    "name": "极连云",
    "slug": "jilian",
    "englishName": "JiLian Cloud",
    "aliases": [
      "jilian"
    ],
    "rank": 14,
    "featured": false,
    "tagline": "18元100GB，宣传覆盖主流AI对话工具",
    "description": "极连云主打18元100GB月付套餐，优惠码ji8888。品牌资料特别强调对主流AI应用工具访问的稳定性，适合AI办公与轻量视频。",
    "affUrl": "https://guangs.jlyvipaff.com/#/?code=VM1rKGUu",
    "couponCode": "ji8888",
    "startingPrice": "¥18/月",
    "billingCycle": "月付",
    "trafficRange": "100GB/月",
    "lineType": "专线优化线路",
    "protocols": [
      "VLESS",
      "Trojan"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "partial",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 优化",
        "latency": "34ms",
        "download": "320 Mbps"
      }
    ],
    "plans": [
      {
        "name": "极连基础档",
        "billing": "月付",
        "price": "¥18/月",
        "traffic": "100GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "18元适中",
      "强调AI工具可用性"
    ],
    "cons": [
      "节点地区以亚洲为主"
    ],
    "suitableFor": [
      "AI办公工具重度依赖者"
    ],
    "unsuitableFor": [
      "需要欧洲小众IP的用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "AI工具",
      "18元档",
      "专线优化"
    ]
  },
  {
    "id": "guangnian",
    "name": "光年梯",
    "slug": "guangnian",
    "englishName": "GuangNian Ladder",
    "aliases": [
      "光年云",
      "guangnian"
    ],
    "rank": 15,
    "featured": false,
    "tagline": "18元110GB实用配置，速度与流媒体适配良好",
    "description": "光年梯定位为实用型网络阶梯，18元110GB套餐，优惠码gnt6666。对YouTube 4K和海外资讯检索有良好加速效果。",
    "affUrl": "https://guangs.gntaff.com/#/?code=X1FoxjGE",
    "couponCode": "gnt6666",
    "startingPrice": "¥18/月",
    "billingCycle": "月付",
    "trafficRange": "110GB/月",
    "lineType": "BGP加速",
    "protocols": [
      "Shadowsocks",
      "VLESS"
    ],
    "clients": [
      "Clash",
      "Shadowrocket"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 节点",
        "latency": "36ms",
        "download": "310 Mbps"
      }
    ],
    "plans": [
      {
        "name": "光年标准",
        "billing": "月付",
        "price": "¥18/月",
        "traffic": "110GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "18元给110GB",
      "YouTube 4K顺畅"
    ],
    "cons": [
      "冷门协议支持较少"
    ],
    "suitableFor": [
      "油管视频常客与日常浏览用户"
    ],
    "unsuitableFor": [
      "超大规模团队"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "实用型",
      "18元档",
      "4K流畅"
    ]
  },
  {
    "id": "yifan",
    "name": "一翻云",
    "slug": "yifan",
    "englishName": "YiFan Cloud",
    "aliases": [
      "一翻",
      "yifan"
    ],
    "rank": 16,
    "featured": false,
    "tagline": "20元150GB高容量月付，轻装上阵不卡顿",
    "description": "一翻云提供20元150GB的大容量标准配置，优惠码yfy6666。主打高吞吐量与稳定的海外流媒体解锁。",
    "affUrl": "https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r",
    "couponCode": "yfy6666",
    "startingPrice": "¥20/月",
    "billingCycle": "月付",
    "trafficRange": "150GB/月",
    "lineType": "BGP中转",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 专线",
        "latency": "31ms",
        "download": "350 Mbps"
      }
    ],
    "plans": [
      {
        "name": "一翻月付包",
        "billing": "月付",
        "price": "¥20/月",
        "traffic": "150GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "20元150GB大容量",
      "三网延迟均衡"
    ],
    "cons": [
      "暂无自研客户端"
    ],
    "suitableFor": [
      "中重度日常视频追剧党"
    ],
    "unsuitableFor": [
      "需要零配置小白用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "20元150G",
      "大容量",
      "视频推荐"
    ]
  },
  {
    "id": "sogo",
    "name": "SOGO 云",
    "slug": "sogo",
    "englishName": "SOGO Cloud",
    "aliases": [
      "sogoyun"
    ],
    "rank": 17,
    "featured": false,
    "tagline": "2026年新生代品牌，全新设备与低负载带宽优势",
    "description": "SOGO云是2026年上线的年轻品牌，采用全新服务器节点与低负载带宽调度，优惠码sss777。由于目前用户密度适中，晚高峰节点带宽占用率较低。",
    "affUrl": "https://guangs.sogoyunaff.cc/#/?code=327Vs0w7",
    "couponCode": "sss777",
    "startingPrice": "¥16/月",
    "billingCycle": "月付",
    "trafficRange": "100GB/月",
    "lineType": "新架构BGP专线",
    "protocols": [
      "VLESS",
      "Trojan"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "sing-box"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "supported",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 新节点",
        "latency": "25ms",
        "download": "480 Mbps"
      }
    ],
    "plans": [
      {
        "name": "SOGO体验",
        "billing": "月付",
        "price": "¥16/月",
        "traffic": "100GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "新开业节点空闲率高，测速表现亮眼",
      "优惠码sss777"
    ],
    "cons": [
      "运营周期相对较短，建议月付先行测试"
    ],
    "suitableFor": [
      "喜欢尝鲜低负载新节点的用户"
    ],
    "unsuitableFor": [
      "只认老牌5年以上机场的极度保守用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "2026新品牌",
      "低负载",
      "极速体验"
    ]
  },
  {
    "id": "kexin",
    "name": "可信云",
    "slug": "kexin",
    "englishName": "KeXin Cloud",
    "aliases": [
      "kosing"
    ],
    "rank": 18,
    "featured": false,
    "tagline": "诚实标注数据缺口，透明运营与稳定节点",
    "description": "可信云以诚实公开著称，在官方介绍中明确标注各项指标的数据边界与可能存在的短板，不夸大宣传。优惠码kkk333，提供稳妥的日常代理服务。",
    "affUrl": "https://guangs.kosingaff.com/#/register?code=UYDtNlCY",
    "couponCode": "kkk333",
    "startingPrice": "¥18/月",
    "billingCycle": "月付",
    "trafficRange": "120GB/月",
    "lineType": "BGP稳定线路",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "partial",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 节点",
        "latency": "35ms",
        "download": "310 Mbps"
      }
    ],
    "plans": [
      {
        "name": "可信日常版",
        "billing": "月付",
        "price": "¥18/月",
        "traffic": "120GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "运营风格严谨客观",
      "不虚标带宽"
    ],
    "cons": [
      "营销推广少，节点地区较集中"
    ],
    "suitableFor": [
      "追求踏实不浮躁服务的技术用户"
    ],
    "unsuitableFor": [
      "要求全网最多国家IP的玩家"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "诚实透明",
      "稳定务实",
      "日常首选"
    ]
  },
  {
    "id": "sujie",
    "name": "速界",
    "slug": "sujie",
    "englishName": "SpeedWorld",
    "aliases": [
      "速界云",
      "sujie"
    ],
    "rank": 19,
    "featured": false,
    "tagline": "专为AI工具与跨境业务优化的高速通道",
    "description": "速界特别强调针对ChatGPT、Claude、Midjourney等高频AI工具的快速响应与稳定长连接，优惠码sss1111。",
    "affUrl": "https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB",
    "couponCode": "sss1111",
    "startingPrice": "¥22/月",
    "billingCycle": "月付",
    "trafficRange": "150GB/月",
    "lineType": "AI优化专线",
    "protocols": [
      "VLESS",
      "Trojan"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "supported",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 优化",
        "latency": "28ms",
        "download": "410 Mbps"
      }
    ],
    "plans": [
      {
        "name": "速界AI版",
        "billing": "月付",
        "price": "¥22/月",
        "traffic": "150GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "AI工具解锁稳定性好",
      "节点下行速率充沛"
    ],
    "cons": [
      "价格略高几元"
    ],
    "suitableFor": [
      "深度依赖海外AI创作与外贸工作者"
    ],
    "unsuitableFor": [
      "只看网页新闻的极轻度用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "AI工具优化",
      "ChatGPT",
      "高速稳定"
    ]
  },
  {
    "id": "shanyue",
    "name": "闪跃",
    "slug": "shanyue",
    "englishName": "FlashLeap",
    "aliases": [
      "闪跃网络",
      "shanyue"
    ],
    "rank": 20,
    "featured": false,
    "tagline": "24元150GB品质线路，晚高峰抗丢包能力强",
    "description": "闪跃以晚高峰抗波动与低丢包率为卖点，提供24元150GB套餐，优惠码shanyue。全节点配有QoS防限速机制。",
    "affUrl": "https://vip02.flashleapaff.com/#/?code=3lgzm9mm",
    "couponCode": "shanyue",
    "startingPrice": "¥24/月",
    "billingCycle": "月付",
    "trafficRange": "150GB/月",
    "lineType": "专线高质中转",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 专线",
        "latency": "26ms",
        "download": "430 Mbps"
      }
    ],
    "plans": [
      {
        "name": "闪跃尊享",
        "billing": "月付",
        "price": "¥24/月",
        "traffic": "150GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "晚高峰抗丢包",
      "流媒体全解锁"
    ],
    "cons": [
      "入门价格24元在平价梯队中稍高"
    ],
    "suitableFor": [
      "看重晚高峰视频稳定不画质降级者"
    ],
    "unsuitableFor": [
      "找10元以下低价者"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "晚高峰抗丢包",
      "低延迟",
      "流媒体全通"
    ]
  },
  {
    "id": "quanqiu",
    "name": "全球云",
    "slug": "quanqiu",
    "englishName": "Global Cloud",
    "aliases": [
      "全球云加速",
      "quanqiu"
    ],
    "rank": 21,
    "featured": false,
    "tagline": "2026年多国节点新秀，广泛覆盖欧美与亚太",
    "description": "全球云作为2026年推出的全新服务商，节点广度是其亮点，覆盖亚太及欧美主要国家，优惠码qqy7777。",
    "affUrl": "https://guangs.gcvipaff.com/#/?code=Ov2nvU9C",
    "couponCode": "qqy7777",
    "startingPrice": "¥18/月",
    "billingCycle": "月付",
    "trafficRange": "100GB/月",
    "lineType": "BGP多线",
    "protocols": [
      "VLESS",
      "Trojan"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国",
      "英国",
      "德国",
      "法国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 01",
        "latency": "32ms",
        "download": "350 Mbps"
      }
    ],
    "plans": [
      {
        "name": "全球畅游版",
        "billing": "月付",
        "price": "¥18/月",
        "traffic": "100GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "多国节点覆盖广",
      "新节点负荷低"
    ],
    "cons": [
      "新品牌需持续关注长期口碑"
    ],
    "suitableFor": [
      "需要多国IP测试的外贸和跨境人员"
    ],
    "unsuitableFor": [
      "只接受多年老字号的用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "2026新品牌",
      "多国节点",
      "全球覆盖"
    ]
  },
  {
    "id": "shandianshu",
    "name": "闪电鼠",
    "slug": "shandianshu",
    "englishName": "Flash Mouse",
    "aliases": [
      "闪电鼠加速",
      "shandianshu"
    ],
    "rank": 22,
    "featured": false,
    "tagline": "5.6元/月起步超值小包，备用首选",
    "description": "闪电鼠以5.6元/月（60GB）为主打套餐，优惠码sd88。为轻量用户提供极低成本的科学上网途径。",
    "affUrl": "https://qwerty.shandianshuaff.com/#/?code=rUE75iYh",
    "couponCode": "sd88",
    "startingPrice": "¥5.6/月",
    "billingCycle": "月付",
    "trafficRange": "60GB/月",
    "lineType": "普通中转隧道",
    "protocols": [
      "Shadowsocks",
      "VLESS"
    ],
    "clients": [
      "Clash",
      "Shadowrocket"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "partial",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "partial",
      "disney": "partial",
      "youtube": "supported",
      "hbo": "untested",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 01",
        "latency": "48ms",
        "download": "150 Mbps"
      }
    ],
    "plans": [
      {
        "name": "闪电微量",
        "billing": "月付",
        "price": "¥5.6/月",
        "traffic": "60GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "5.6元超便宜",
      "门槛极低"
    ],
    "cons": [
      "晚高峰流媒体偶有卡顿"
    ],
    "suitableFor": [
      "偶尔看推特、查文档的极轻量用户"
    ],
    "unsuitableFor": [
      "主力4K超高清用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "5.6元档",
      "极低门槛",
      "轻量备用"
    ]
  },
  {
    "id": "yunjiexian",
    "name": "云界线",
    "slug": "yunjiexian",
    "englishName": "Cloud Horizon",
    "aliases": [
      "yunjiexian"
    ],
    "rank": 23,
    "featured": false,
    "tagline": "5.6元/月60GB，平民价格轻量上网",
    "description": "云界线主推5.6元/月60GB的平价轻量套餐，优惠码yjx888。适合作为第二条备用梯子。注：官方推广链接格式为直接参数，使用时注意规范。",
    "affUrl": "https://qwerty.yunjiexianaff.com/?code=HBaZ91c6",
    "couponCode": "yjx888",
    "startingPrice": "¥5.6/月",
    "billingCycle": "月付",
    "trafficRange": "60GB/月",
    "lineType": "BGP隧道",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "partial",
      "claude": "supported",
      "gemini": "untested",
      "netflix": "partial",
      "disney": "untested",
      "youtube": "supported",
      "hbo": "untested",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港",
        "latency": "52ms",
        "download": "120 Mbps"
      }
    ],
    "plans": [
      {
        "name": "界线轻量",
        "billing": "月付",
        "price": "¥5.6/月",
        "traffic": "60GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "价格亲民",
      "成本无压力"
    ],
    "cons": [
      "节点数量相对较少"
    ],
    "suitableFor": [
      "轻度应急备用"
    ],
    "unsuitableFor": [
      "重度跨境办公"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "5.6元档",
      "平民备用",
      "轻量套餐"
    ]
  },
  {
    "id": "liulianyun",
    "name": "榴莲云",
    "slug": "liulianyun",
    "englishName": "Durian Cloud",
    "aliases": [
      "liulianyun"
    ],
    "rank": 24,
    "featured": false,
    "tagline": "5.6元档高性价比小包，优惠码ll88",
    "description": "榴莲云提供5.6元/月60GB的入门包，优惠码ll88。主打低价查阅信息和日常社媒访问。",
    "affUrl": "https://qwerty.liulianyunaff.com#/?code=hS5pvbfE",
    "couponCode": "ll88",
    "startingPrice": "¥5.6/月",
    "billingCycle": "月付",
    "trafficRange": "60GB/月",
    "lineType": "中转优化",
    "protocols": [
      "待核实协议",
      "VLESS兼容"
    ],
    "clients": [
      "Clash",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "partial",
      "claude": "untested",
      "gemini": "untested",
      "netflix": "partial",
      "disney": "untested",
      "youtube": "supported",
      "hbo": "untested",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港",
        "latency": "55ms",
        "download": "110 Mbps"
      }
    ],
    "plans": [
      {
        "name": "榴莲特惠",
        "billing": "月付",
        "price": "¥5.6/月",
        "traffic": "60GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "价格极低",
      "购买便捷"
    ],
    "cons": [
      "具体协议细节资料未完全公布"
    ],
    "suitableFor": [
      "尝鲜备用"
    ],
    "unsuitableFor": [
      "要求全协议透明度的高阶玩家"
    ],
    "dataStatus": "needs_verification",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料（协议细节待核实）",
    "tags": [
      "5.6元档",
      "特惠小包",
      "数据待核实"
    ]
  },
  {
    "id": "shenxing",
    "name": "神行加速",
    "slug": "shenxing",
    "englishName": "ShenXing Speed",
    "aliases": [
      "神行云",
      "shenxing"
    ],
    "rank": 25,
    "featured": false,
    "tagline": "14元/月120GB高性价比，兼顾速率与价格",
    "description": "神行加速以14元/月120GB的诚意配置脱颖而出，优惠码xs0077。比常规20元档更便宜，同时流量充足，流媒体播放顺畅。",
    "affUrl": "https://qwerty.shenxingaff.com/#/?code=gawDQqVE",
    "couponCode": "xs0077",
    "startingPrice": "¥14/月",
    "billingCycle": "月付",
    "trafficRange": "120GB/月",
    "lineType": "BGP中转加速",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "partial",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港",
        "latency": "35ms",
        "download": "320 Mbps"
      }
    ],
    "plans": [
      {
        "name": "神行月享",
        "billing": "月付",
        "price": "¥14/月",
        "traffic": "120GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "14元给120GB性价比强",
      "延迟较低"
    ],
    "cons": [
      "冷门国家节点少"
    ],
    "suitableFor": [
      "15元预算以内追求大流量的用户"
    ],
    "unsuitableFor": [
      "需要全球几十个国家IP的专业用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "14元档",
      "高性价比",
      "120G充裕"
    ]
  },
  {
    "id": "huanqiuti",
    "name": "环球梯",
    "slug": "huanqiuti",
    "englishName": "Global Ladder",
    "aliases": [
      "环球加速",
      "huanqiuti"
    ],
    "rank": 26,
    "featured": false,
    "tagline": "5.6元/月超低价入门，优惠码HQ66",
    "description": "环球梯面向极致低预算市场，5.6元/月（60GB），优惠码HQ66。适合学生及备用用户，推广链接参数格式需注意。",
    "affUrl": "https://qwerty.huanqiutiaff.com/?code=9I4KRNPH",
    "couponCode": "HQ66",
    "startingPrice": "¥5.6/月",
    "billingCycle": "月付",
    "trafficRange": "60GB/月",
    "lineType": "普通隧道",
    "protocols": [
      "Shadowsocks",
      "VLESS"
    ],
    "clients": [
      "Clash",
      "Shadowrocket"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "partial",
      "claude": "untested",
      "gemini": "untested",
      "netflix": "partial",
      "disney": "untested",
      "youtube": "supported",
      "hbo": "untested",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港",
        "latency": "54ms",
        "download": "130 Mbps"
      }
    ],
    "plans": [
      {
        "name": "环球入门",
        "billing": "月付",
        "price": "¥5.6/月",
        "traffic": "60GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "月付成本极低",
      "HQ66专属码"
    ],
    "cons": [
      "链接格式含自定义查询参数需防拼写错"
    ],
    "suitableFor": [
      "极低预算应急轻度上网"
    ],
    "unsuitableFor": [
      "重要跨境商业业务"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "5.6元档",
      "极低成本",
      "轻度上网"
    ]
  },
  {
    "id": "yinxingren",
    "name": "隐形人",
    "slug": "yinxingren",
    "englishName": "Invisible Network",
    "aliases": [
      "隐形人加速",
      "yinxingren"
    ],
    "rank": 27,
    "featured": false,
    "tagline": "60+节点详细清单，自研专属客户端，承诺1小时快速修复",
    "description": "隐形人采用封闭自研客户端体系，官方提供超过60个详细节点清单，并承诺节点故障1小时内修复（标注品牌方宣传，非独立第三方 SLA 认证）。注意：该品牌不提供第三方通用订阅链接导入，必须使用官方客户端。",
    "affUrl": "https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT",
    "couponCode": "yxr888",
    "startingPrice": "¥22/月",
    "billingCycle": "月付",
    "trafficRange": "120GB/月",
    "lineType": "专属优化专线",
    "protocols": [
      "自研私有协议 / 封装"
    ],
    "clients": [
      "官方自研客户端(Win/Mac/Android/iOS)"
    ],
    "nodeRegions": [
      "香港(15+)",
      "日本(10+)",
      "台湾(10+)",
      "新加坡(10+)",
      "美国(10+)",
      "欧洲"
    ],
    "hasCustomClient": true,
    "supportsThirdParty": false,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "supported",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 优化",
        "latency": "28ms",
        "download": "390 Mbps"
      }
    ],
    "plans": [
      {
        "name": "隐形人尊享",
        "billing": "月付",
        "price": "¥22/月",
        "traffic": "120GB/月",
        "period": "每月",
        "notes": "品牌承诺1小时故障修复"
      }
    ],
    "pros": [
      "官方自研App防封锁能力强",
      "节点覆盖广达60+",
      "一键连接无需配订阅"
    ],
    "cons": [
      "不提供第三方订阅导入，无法用Clash/Shadowrocket",
      "1小时修复为品牌方宣传承诺"
    ],
    "suitableFor": [
      "只想要傻瓜式独立App、完全不想碰配置文件的用户"
    ],
    "unsuitableFor": [
      "使用软路由、OpenClash及喜欢统一Clash管理的用户"
    ],
    "dataStatus": "vendor",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料（含品牌方宣传承诺）",
    "tags": [
      "自研客户端",
      "60+节点",
      "不支持第三方订阅",
      "品牌承诺修复"
    ]
  },
  {
    "id": "tiziyun",
    "name": "梯子云",
    "slug": "tiziyun",
    "englishName": "TiZi Cloud",
    "aliases": [
      "tiziyun"
    ],
    "rank": 28,
    "featured": false,
    "tagline": "自研全平台客户端一键登录，同时支持第三方通用订阅",
    "description": "梯子云兼顾了自研客户端的易用性与第三方订阅的灵活性，全平台支持一键登录，优惠码tiziyun。官方资料宣称对主流流媒体及AI有极佳适配。",
    "affUrl": "https://tiziyun3.ladderaff.com/#/?code=7EmnpHs0",
    "couponCode": "tiziyun",
    "startingPrice": "¥20/月",
    "billingCycle": "月付",
    "trafficRange": "120GB/月",
    "lineType": "BGP智能中转",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "官方自研客户端",
      "Clash",
      "Shadowrocket",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": true,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港",
        "latency": "30ms",
        "download": "360 Mbps"
      }
    ],
    "plans": [
      {
        "name": "梯子云标准",
        "billing": "月付",
        "price": "¥20/月",
        "traffic": "120GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "双模式：既有自研App也能导出Clash订阅",
      "优惠码tiziyun"
    ],
    "cons": [
      "起步价20元为常规行情"
    ],
    "suitableFor": [
      "既想手机一键登录，又想电脑Clash分流的灵活型用户"
    ],
    "unsuitableFor": [
      "寻找超廉价5元机场的用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-10-19",
    "updatedDate": "2026-11-17",
    "source": "品牌资料",
    "tags": [
      "自研App",
      "支持第三方订阅",
      "双模式适配"
    ]
  },
  {
    "id": "lingdong",
    "name": "灵动云",
    "slug": "lingdong",
    "englishName": "LingDong Cloud",
    "aliases": [
      "lingdong"
    ],
    "rank": 29,
    "featured": false,
    "tagline": "2025年开业VLESS专线机场，不限速不限设备",
    "description": "灵动云为2025年新开业专线机场，截图标注IEPL专线传输，协议采用现代VLESS。官方资料宣称不限速不限设备连接，套餐覆盖70GB年付及100GB-1.5TB多档周期流量与私人定制。",
    "affUrl": "https://varnexa.lingdongaff.com/#/?code=wZvEhEoI",
    "startingPrice": "¥19/月",
    "billingCycle": "月付/年付/定制",
    "trafficRange": "70GB年付至1.5TB/月",
    "lineType": "IEPL专线 (截图标注)",
    "protocols": [
      "VLESS",
      "Trojan"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "sing-box",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 IEPL",
        "latency": "27ms",
        "download": "420 Mbps"
      }
    ],
    "plans": [
      {
        "name": "灵动年付轻量",
        "billing": "年付",
        "price": "¥98/年",
        "traffic": "70GB/月",
        "period": "每月"
      },
      {
        "name": "灵动标准",
        "billing": "月付",
        "price": "¥22/月",
        "traffic": "120GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "IEPL专线且不限设备",
      "VLESS现代协议",
      "有大流量定制版"
    ],
    "cons": [
      "2025年新开业，需持续关注运营时长"
    ],
    "suitableFor": [
      "多设备团队与需要大容量专线的用户"
    ],
    "unsuitableFor": [
      "只信赖5年以上老字号的用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-08-09",
    "updatedDate": "2026-11-17",
    "source": "历史品牌库记录与站长实测",
    "tags": [
      "2025新专线",
      "IEPL",
      "VLESS",
      "不限设备"
    ]
  },
  {
    "id": "wavenet",
    "name": "浪网",
    "slug": "wavenet",
    "englishName": "WaveNet",
    "aliases": [
      "浪网网络",
      "wavenet"
    ],
    "rank": 30,
    "featured": false,
    "tagline": "IEPL专线多周期档位，涵盖入门到商业定制",
    "description": "浪网在历史截图资料中标注采用IEPL专线，提供从入门(¥30/月)、进阶(¥70/月)、高端(¥120/月)到商业版(¥200/月)以及年付标准与多档一次性流量包，档位丰富。",
    "affUrl": "https://varnexa.wavenetaff.com/#/?code=xwAM4tTd",
    "startingPrice": "¥30/月 (或¥119年付)",
    "billingCycle": "月付/季付/年付/一次性",
    "trafficRange": "80GB年付至2000GB商业包",
    "lineType": "IEPL专线 (截图标注)",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 专线",
        "latency": "29ms",
        "download": "380 Mbps"
      }
    ],
    "plans": [
      {
        "name": "浪网年付标准",
        "billing": "年付",
        "price": "¥119/年",
        "traffic": "80GB/月",
        "period": "每月"
      },
      {
        "name": "浪网入门",
        "billing": "月付",
        "price": "¥30/月",
        "traffic": "150GB/月",
        "period": "每月"
      },
      {
        "name": "浪网进阶",
        "billing": "月付",
        "price": "¥70/月",
        "traffic": "450GB/月",
        "period": "每月"
      },
      {
        "name": "浪网高端",
        "billing": "月付",
        "price": "¥120/月",
        "traffic": "800GB/月",
        "period": "每月"
      },
      {
        "name": "浪网商业",
        "billing": "月付",
        "price": "¥200/月",
        "traffic": "2000GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "IEPL专线传输",
      "商业档可提供高达2TB每月流量",
      "周期折算档多"
    ],
    "cons": [
      "入门月付30元偏高",
      "部分截图流量字段有遮挡"
    ],
    "suitableFor": [
      "跨境商业团队、大流量外贸视频用户"
    ],
    "unsuitableFor": [
      "超低预算个人用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-08-09",
    "updatedDate": "2026-11-17",
    "source": "历史品牌库记录与截图审计",
    "tags": [
      "IEPL专线",
      "商业大流量",
      "多档位周期"
    ]
  },
  {
    "id": "edgenova",
    "name": "边缘节点 EdgeNova",
    "slug": "edgenova",
    "englishName": "EdgeNova",
    "aliases": [
      "边缘节点",
      "edgenova"
    ],
    "rank": 31,
    "featured": false,
    "tagline": "高速直连与IPLC多线路自动分配，优惠码TH888",
    "description": "边缘节点 EdgeNova 以高速直连与IPLC专线、多线路智能自动调度为核心卖点。套餐涵盖年付小包及多档常规月付流量，支持主流国内支付及USDT。优惠码TH888可享8折。",
    "affUrl": "https://work.edgenovaaff.cc/#/register?code=cl3iB5YG",
    "couponCode": "TH888",
    "couponDiscount": "8折优惠",
    "startingPrice": "¥9/月（年付折算¥108/年）",
    "billingCycle": "年付/月付/多周期",
    "trafficRange": "45GB年付至1000GB极限档",
    "lineType": "高速直连 / IPLC",
    "protocols": [
      "VLESS",
      "Shadowsocks"
    ],
    "clients": [
      "Clash",
      "Shadowrocket",
      "sing-box",
      "v2rayN"
    ],
    "nodeRegions": [
      "香港",
      "日本",
      "台湾",
      "新加坡",
      "美国"
    ],
    "hasCustomClient": false,
    "supportsThirdParty": true,
    "streaming": {
      "chatgpt": "supported",
      "claude": "supported",
      "gemini": "partial",
      "netflix": "supported",
      "disney": "supported",
      "youtube": "supported",
      "hbo": "supported",
      "tiktok": "supported",
      "spotify": "supported"
    },
    "speedTests": [
      {
        "region": "香港 IPLC",
        "latency": "26ms",
        "download": "440 Mbps"
      }
    ],
    "plans": [
      {
        "name": "限时年付",
        "billing": "年付",
        "price": "¥108/年（折合¥9/月）",
        "traffic": "45GB/月",
        "period": "每月"
      },
      {
        "name": "极界·标准",
        "billing": "月付",
        "price": "¥25/月",
        "traffic": "120GB/月",
        "period": "每月"
      },
      {
        "name": "极界·进阶",
        "billing": "月付",
        "price": "¥50/月",
        "traffic": "250GB/月",
        "period": "每月"
      },
      {
        "name": "极界·高级",
        "billing": "月付",
        "price": "¥100/月",
        "traffic": "500GB/月",
        "period": "每月"
      }
    ],
    "pros": [
      "IPLC结合多线路自动分配",
      "8折优惠码TH888",
      "支持USDT与国内主流支付"
    ],
    "cons": [
      "限时年付包月流量较紧凑"
    ],
    "suitableFor": [
      "看重多线路故障自动转移的进阶用户"
    ],
    "unsuitableFor": [
      "只寻找一次性付费永久包的用户"
    ],
    "dataStatus": "verified",
    "verificationDate": "2026-08-09",
    "updatedDate": "2026-11-17",
    "source": "历史品牌库记录与套餐数据",
    "tags": [
      "IPLC专线",
      "多线路自动分配",
      "8折优惠",
      "USDT支持"
    ]
  }
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug || b.id === slug);
}

export function getFeaturedBrands(): Brand[] {
  return brands.filter((b) => b.featured);
}

export function getTopBrands(limit = 10): Brand[] {
  return [...brands].sort((a, b) => a.rank - b.rank).slice(0, limit);
}
