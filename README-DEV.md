# Developer Guide

## 架构

┌─────────────────────────────────────────────────────────────────────────┐
│                        VS Code 架构分层                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  第6层 │  code/                        ← Electron 主进程实现            │
│        │  - electron-main/                 (桌面应用入口)               │
│        │  - node/                                                       │
├────────┼───────────────────────────────────────────────────────────────┤
│  第5层 │  workbench/                   ← 工作台 / 应用层               │
│        │  - browser/ (UI组件)                                          │
│        │  - services/ (服务实现)                                        │
│        │  - contrib/ (功能贡献点)                                       │
│        │  - api/ (扩展API)                                              │
├────────┼───────────────────────────────────────────────────────────────┤
│  第4层 │  editor/                      ← 编辑器核心 (Monaco Editor)    │
│        │  - browser/ (视图渲染)                                        │
│        │  - common/ (核心模型)                                         │
├────────┼───────────────────────────────────────────────────────────────┤
│  第3层 │  platform/                    ← 平台抽象层 / 服务接口层        │
│        │  - files/, - log/, - theme/       (依赖注入基础设施)          │
│        │  - backup/, - dnd/, - url/                                     │
├────────┼───────────────────────────────────────────────────────────────┤
│  第2层 │  base/                        ← 基础工具库                     │
│        │  - common/ (平台无关工具)                                      │
│        │  - browser/ (浏览器UI组件)                                     │
│        │  - node/ (Node.js工具)                                         │
│        │  - parts/ (IPC等基础组件)                                      │
├────────┼───────────────────────────────────────────────────────────────┤
│  第1层 │  node_modules / 外部依赖       ← 第三方库                      │
└────────┴───────────────────────────────────────────────────────────────┘

### src/vs/base/

├── common/          ← 平台无关的核心工具
│   ├── arrays.ts, objects.ts, types.ts    (数据结构)
│   ├── event.ts, cancellation.ts          (异步/事件)
│   ├── uri.ts, path.ts, glob.ts           (路径/资源)
│   └── json.ts, buffer.ts, stream.ts      (数据处理)
│
├── browser/         ← 浏览器相关的UI组件
│   ├── ui/           (可复用UI组件)
│   │   ├── list/, tree/, table/           (列表/树/表格)
│   │   ├── menu/, sash/, hover/           (菜单/分割条/悬停)
│   │   └── dnd/, aria/                    (拖放/无障碍)
│   └── dom.ts, keyboardEvent.ts           (DOM工具)
│
├── node/            ← Node.js 特有功能
│   ├── pfs.ts, crypto.ts                  (文件系统/加密)
│   └── processes.ts, shell.ts             (进程/Shell)
│
└── parts/           ← 基础组件
    └── ipc/         (进程间通信)

### platform/

src/vs/platform/
├── files/           ← 文件系统服务
├── log/             ← 日志服务
├── theme/           ← 主题服务
├── backup/          ← 备份服务
├── dnd/             ← 拖放服务
├── label/           ← 标签服务
├── request/         ← 网络请求服务
├── state/           ← 状态持久化
├── url/             ← URL处理
└── sign/            ← 签名服务

### editor/

src/vs/editor/
├── browser/         ← 编辑器视图渲染
│   ├── view.ts               (视图控制)
│   ├── editorDom.ts          (DOM操作)
│   └── gpu/                  (GPU渲染)
├── common/          ← 编辑器核心模型
│   ├── core/                 (核心数据结构)
│   │   ├── position.ts, range.ts
│   │   └── 2d/               (2D几何)
│   ├── model/                (文档模型)
│   ├── cursor/               (光标控制)
│   └── tokens/               (语法高亮)
└── editor.api.ts    ← Monaco Editor 公开API

### workbench/

src/vs/workbench/
├── browser/         ← 核心UI组件
│   ├── layout.ts              (布局管理)
│   ├── part.ts                (界面部件基类)
│   ├── workbench.ts           (工作台入口)
│   └── window.ts              (窗口管理)
├── services/        ← 服务实现
├── contrib/         ← 功能贡献点
├── api/             ← 扩展API
│   └── common/
└── common/          ← 工作台通用代码
    ├── editor.ts, views.ts
    └── theme.ts, dialogs.ts

### code/ 和 server/

src/vs/
├── code/                    ← Electron 桌面应用
│   ├── electron-main/       (主进程入口)
│   │   ├── main.ts          (启动入口)
│   │   └── app.ts           (应用生命周期)
│   └── node/                (CLI工具)
└── server/                  ← Web/远程服务器
    └── node/
        ├── server.main.ts   (服务器入口)
        └── webClientServer.ts

## 开发环境搭建

通用步骤

```shell
nvm use 22.22.0

rm -rf node_modules extensions/node_modules
npm cache clean --force
rm -rf out
rm -rf node_modules

npm install
npm run compile
npm run watch

F5 or ./scripts/code.sh
```

如果`npm install`超时，需要挂VPN，在Guthub申请Token并设置环境变量

获取 Token：GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token

```shell
$env:GITHUB_TOKEN="github_personal_access_token"
npm install
```

### Windows

Visual Studio

安装Desktop development with C++

安装MSVC Spectre缓释库 (必须！)

- 面向 Spectre [(x86 and x64) | (ARM) | (ARM64)] 的 MSVC 版本 version_numbers 库
- 带有 Spectre 缓解功能的 Visual C++ ATL for [(x86/x64) | ARM | ARM64]
- 带有 Spectre 缓解功能的 Visual C++ MFC for [x86/x64 | ARM | ARM64]

```shell
cd ./extensions/suuntoplus-editor
npm install
npm login --registry=https://sally01.jfrog.io/artifactory/api/npm/suunto-npm/ --scope=@suunto-internal --auth-type=legacy
```

### WLS2 (还没跑通)

走代理 把下面 4 行追加到 ~/.bashrc 或 ~/.zshrc

``` shell
cat >> ~/.bashrc << 'EOF'
# ---------- Clash for Windows ----------
export hostip=$(cat /etc/resolv.conf | grep -oP '(?<=nameserver\ ).*')
export http_proxy="http://${hostip}:7890"
export https_proxy="http://${hostip}:7890"
export ALL_PROXY="socks5://${hostip}:7890"
EOF

source ~/.bashrc
```

验证代理是否生效

``` shell
# 1. 看 IP
echo $hostip          # 应输出 192.168.x.x 或 172.x.x.x

# 2. 测试连通
curl -I https://www.google.com
# HTTP/2 200 即 OK；timeout 则检查 CFW 是否开启 LAN 允许。

# 3. apt 也走代理（一次性）
sudo -E apt update

sudo apt-get update && sudo apt-get install curl

```shell
sudo apt update
sudo apt install -y pkg-config libx11-dev libxkbfile-dev \
                    libsecret-1-dev libnss3-dev libasound2-dev \
                    libgtk-3-dev libxss1 libgbm1

sudo apt install -y libkrb5-dev
# 保险起见把下面也一起装
sudo apt install -y build-essential python3 g++ make
```

```shell
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# 安装开发环境依赖
sudo apt update
sudo apt install -y build-essential python3
# 可选：把缺少但常用的都补齐
sudo apt install -y make g++ gcc libc6-dev
```

```shell
yarn download-builtin-extensions
```

```shell
# 临时把签名工具换成空命令
# macOS/Linux
brew install --cask wine-stable
export VSCODE_SKIP_SIGNING=1
# Windows PowerShell 用
$env:VSCODE_SKIP_SIGNING="1"

npm run gulp package-win32-x64
npm run gulp package-win32-ia32
npm run gulp package-darwin-x64
npm run gulp package-darwin-arm64
npm run gulp package-linux-x64
npm run gulp package-linux-arm64

npm run gulp vscode-win32-x64      # Windows 64-bit
npm run gulp vscode-win32-ia32     # Windows 32-bit
npm run gulp vscode-darwin-x64     # macOS Intel
npm run gulp vscode-darwin-arm64   # macOS Apple Silicon
npm run gulp vscode-linux-x64      # Linux 64-bit
npm run gulp vscode-linux-arm64    # Linux ARM64
```

-min、-user-setup、-system-setup

``` shell
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
| **合法性**   | 完全开源、可自建、可商用                                                |
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

## 引入扩展

### 软链接

Mac

```shell
ln -s /Users/z/Suunto/suuntoplus-editor /Users/z/z/Git/vscode/extensions/suuntoplus-editor
```

Windows 管理员权限运行

```powershell
New-Item -ItemType SymbolicLink -Path "extensions\suunto-js-language" -Target "..\..\silta_extensions\suunto-js-language"
New-Item -ItemType SymbolicLink -Path "extensions\suunto-js-tools" -Target "..\..\silta_extensions\suunto-js-tools"
New-Item -ItemType SymbolicLink -Path "extensions\suuntoplus-editor" -Target "..\..\suuntoplus-editor"
```

## 打包构建

Mac

``` shell
./scripts/build-suunto-vscode.sh
```

Windows

``` powershell
./scripts/build-suunto-vscode-windows.bat
```
