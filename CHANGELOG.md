# 更新日志

## v0.0.6 (2024-12-19)

### 重大更新

- **升级到 Manifest V3**：符合 Google Chrome 扩展程序最新要求
- **修复兼容性问题**：解决"此扩展程序未遵循 Chrome 扩展程序的最佳实践"错误

### 技术更改

#### manifest.json

- 升级 `manifest_version` 从 2 到 3
- 将 `browser_action` 更改为 `action`
- 将 `background.scripts` 更改为 `background.service_worker`
- 更新权限结构：
  - 移除已弃用的 `webRequest` 和 `webRequestBlocking` 权限
  - 添加 `declarativeNetRequest` 权限
  - 将主机权限移到 `host_permissions`
- 更新 `web_accessible_resources` 格式，添加 `matches` 字段
- 添加 `declarative_net_request` 配置

#### background.js

- 移除 `chrome.webRequest.onBeforeSendHeaders` API
- 使用 `chrome.declarativeNetRequest.updateSessionRules` 替代
- 将 `chrome.browserAction` 更改为 `chrome.action`
- 添加异步处理支持
- 实现动态规则管理

#### script.js

- 将 `chrome.extension.getURL` 更改为 `chrome.runtime.getURL`

#### 新增文件

- `rules.json`：声明式网络请求规则配置
- `INSTALL.md`：手动安装说明
- `CHANGELOG.md`：更新日志

### 功能保持

- ✅ 三种模式切换（关闭/普通/增强）
- ✅ 海外播放解锁功能
- ✅ 音质提升功能
- ✅ 多语言支持（中文/英文）
- ✅ 图标状态显示

### 兼容性

- Chrome 88+ (支持 Manifest V3)
- 保持与原有功能的完全兼容性
