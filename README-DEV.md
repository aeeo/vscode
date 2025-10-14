# Developer Guide

## 开发环境

```shell
npm cache clean --force
rm -rf out
rm -rf node_modules

yarn
yarn compile
yarn watch

F5 or ./scripts/code.sh

yarn download-builtin-extensions

yarn gulp vscode-darwin-universal

gulp --tasks | grep vscode-darwin
yarn gulp vscode-darwin-arm64
yarn gulp vscode-darwin-arm64-min
# 打包的应用程序 在 vscode 源码目录里执行
open ../VSCode-darwin-arm64
```

## 插件市场

| 项目         | 说明                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| **Open VSX** | 由 **Eclipse 基金会**运营的开源扩展市场[](https://open-vsx.org/)        |
| **用途**     | 为非微软发行的 VS Code 兼容编辑器（如 VSCodium、Gitpod、Theia）提供扩展 |
| **合法性**   | ✅ 完全开源、可自建、可商用                                              |
| **扩展数量** | 比官方市场少，但主流扩展基本都有（如 Prettier、Python、ESLint）         |

```json
{
  "extensionsGallery": {
    "serviceUrl": "https://open-vsx.org/vscode/gallery", // 开源
    "itemUrl": "https://open-vsx.org/vscode/item", // 开源
    // "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery", // 微软
    // "itemUrl": "https://marketplace.visualstudio.com/items", // 微软
    "cacheUrl": "https://vscode.blob.core.windows.net/gallery/index",
    "controlUrl": "",
    "recommendationsUrl": "https://marketplace.visualstudio.com/_apis/public/gallery/recommendations"
  }
}
```

- 自建 Open VSX 服务器（完全离线）
