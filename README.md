# NetEaseMusicWorld+

解锁网易云音乐网页版海外限制

## 更新说明

**v0.0.6** - 已更新到 Chrome Extension Manifest V3，符合 Google 最新要求

## 安装

[![Chrome](https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png)](https://chrome.google.com/webstore/detail/neteasemusicworld%20/pjcgkmiglhiambjngnljkdpoggonlnfe) [![Firefox](https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_1.png)](https://addons.mozilla.org/zh-CN/firefox/addon/neteasemusicworldplus/)

## 使用

- 普通模式: 同 [acgotaku/NetEaseMusicWorld](https://github.com/acgotaku/NetEaseMusicWorld) 原版功能

- 增强模式: "重定向"解决海外 CDN 分发问题, 无需写入 hosts

## 说明

因云村网页版播放器改为 XHR (fetch) 实现, 发出的 OPTIONS 请求被重定向后返回非 2XX 状态码导致预检失败, 此异常会导致歌曲播放进度记录出现问题 (下一首歌不从头开始播放 [#1](https://github.com/nondanee/NetEaseMusicWorldPlus/issues/1)), 不重定向 OPTIONS 请求又会因 DNS 解析失败而报错, 引发相同问题, 进退两难 (onBeforeRequest 无法直接返回 response, 只能重定向)。

故放弃通过 webRequest API 来重定向，采用 inject script 的方式拦截 AJAX 返回数据, 修改 url 达到重定向效果，因此切换模式后需要刷新页面，重新注入脚本，才会生效。

## 技术更新

- 升级到 Manifest V3
- 使用 declarativeNetRequest 替代 webRequest API
- 修复所有已弃用的 Chrome Extension API
- 保持原有功能完整性
