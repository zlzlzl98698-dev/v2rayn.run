/**
 * 搜索引擎站长平台所有权验证代码配置
 *
 * 在各搜索引擎站长平台完成域名添加后，将平台提供的验证 Meta 标签 content 属性值填入下方对应字段。
 * - 未填写（保持空字符串）时：编译不会输出多余空标签；
 * - 填写对应字符串后：执行 npm run build 将自动将对应验证 Meta 标签静态渲染至全站 HTML 源码的 <head> 中。
 */
export const siteVerification = {
  // Google Search Console: <meta name="google-site-verification" content="..." />
  google: '',

  // Bing Webmaster Tools: <meta name="msvalidate.01" content="..." />
  bing: '',

  // 神马站长平台 (UC/夸克): <meta name="shenma-site-verification" content="..." />
  shenma: '',

  // 百度搜索资源平台: <meta name="baidu-site-verification" content="..." />
  baidu: '',

  // 搜狗站长平台: <meta name="sogou_site_verification" content="..." />
  sogou: '',

  // 360 搜索站长平台: <meta name="360-site-verification" content="..." />
  qihu360: '',
};
