// 集中维护所有品牌注册推广链接，统一合规出口
export const brandLinks: Record<string, { name: string; url: string; coupon?: string }> = {
  'guangsu': { name: '光速云', url: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y', coupon: 'AMM' },
  'muguang': { name: '暮光加速', url: 'https://varnexa.twilightaff.com/#/?code=D1LHglg3', coupon: 'muguang5555' },
  'feimao': { name: '飞猫云', url: 'https://guangs.flycataff.com/#/?code=6uq0Xe9y', coupon: 'flycat888' },
  'weifeng': { name: '微风网络', url: 'https://edp01.breezenetaff.com/#/?code=t3huofyI', coupon: 'flat888' },
  'dalaoyun': { name: '大佬云', url: 'https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN', coupon: 'dly888' },
  'xingdaomeng': { name: '星岛梦', url: 'https://guangs.xingdaomeng.com/#/?code=1TynBYnR', coupon: 'nmw888' },
  'ermao': { name: '二猫云', url: 'https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW', coupon: 'ermao5555' },
  'wuyou': { name: '无忧链接', url: 'https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL', coupon: 'wuyou666' },
  'weitu': { name: '唯兔云', url: 'https://guangs.v2yunvipaff.com/#/?code=xIutqOBA', coupon: 'weitu666' },
  'firefly': { name: 'Firefly（萤火虫）', url: 'https://vip02.fireflyaff.com/#/?code=2n7VURre', coupon: 'firefly' },
  'yuzhou': { name: '宇宙云', url: 'https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1', coupon: 'YUZHOU553' },
  'u1s1': { name: 'U1S1', url: 'https://guangs.vipaff.cc/#/?code=xhX5X22f', coupon: 'akaka' },
  'lingmao': { name: '灵猫网络', url: 'https://vip01.civetnet.com/#/?code=8MIAyxak', coupon: 'lmao888' },
  'jilian': { name: '极连云', url: 'https://guangs.jlyvipaff.com/#/?code=VM1rKGUu', coupon: 'ji8888' },
  'guangnian': { name: '光年梯', url: 'https://guangs.gntaff.com/#/?code=X1FoxjGE', coupon: 'gnt6666' },
  'yifan': { name: '一翻云', url: 'https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r', coupon: 'yfy6666' },
  'sogo': { name: 'SOGO 云', url: 'https://guangs.sogoyunaff.cc/#/?code=327Vs0w7', coupon: 'sss777' },
  'kexin': { name: '可信云', url: 'https://guangs.kosingaff.com/#/register?code=UYDtNlCY', coupon: 'kkk333' },
  'sujie': { name: '速界', url: 'https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB', coupon: 'sss1111' },
  'shanyue': { name: '闪跃', url: 'https://vip02.flashleapaff.com/#/?code=3lgzm9mm', coupon: 'shanyue' },
  'quanqiu': { name: '全球云', url: 'https://guangs.gcvipaff.com/#/?code=Ov2nvU9C', coupon: 'qqy7777' },
  'shandianshu': { name: '闪电鼠', url: 'https://qwerty.shandianshuaff.com/#/?code=rUE75iYh', coupon: 'sd88' },
  'yunjiexian': { name: '云界线', url: 'https://qwerty.yunjiexianaff.com/?code=HBaZ91c6', coupon: 'yjx888' },
  'liulianyun': { name: '榴莲云', url: 'https://qwerty.liulianyunaff.com#/?code=hS5pvbfE', coupon: 'll88' },
  'shenxing': { name: '神行加速', url: 'https://qwerty.shenxingaff.com/#/?code=gawDQqVE', coupon: 'xs0077' },
  'huanqiuti': { name: '环球梯', url: 'https://qwerty.huanqiutiaff.com/?code=9I4KRNPH', coupon: 'HQ66' },
  'yinxingren': { name: '隐形人', url: 'https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT', coupon: 'yxr888' },
  'tiziyun': { name: '梯子云', url: 'https://tiziyun3.ladderaff.com/#/?code=7EmnpHs0', coupon: 'tiziyun' },
  'lingdong': { name: '灵动云', url: 'https://varnexa.lingdongaff.com/#/?code=wZvEhEoI', coupon: undefined },
  'wavenet': { name: '浪网', url: 'https://varnexa.wavenetaff.com/#/?code=xwAM4tTd', coupon: undefined },
  'edgenova': { name: '边缘节点 EdgeNova', url: 'https://work.edgenovaaff.cc/#/register?code=cl3iB5YG', coupon: 'TH888' },
};

export function getBrandLink(idOrSlug: string) {
  return brandLinks[idOrSlug] || { name: '官方渠道', url: '#', coupon: undefined };
}
