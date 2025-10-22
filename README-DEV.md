# Developer Guide

## 开发环境

通用步骤

```shell
nvm use 22.15.1

npm cache clean --force
rm -rf out
rm -rf node_modules

npm install
npm run compile
npm run watch

F5 or ./scripts/code.sh
```

### Windows

Visual Studio

安装Desktop development with C++

安装MSVC Spectre缓释库

- 面向 Spectre [(x86 and x64) | (ARM) | (ARM64)] 的 MSVC 版本 version_numbers 库
- 带有 Spectre 缓解功能的 Visual C++ ATL for [(x86/x64) | ARM | ARM64]
- 带有 Spectre 缓解功能的 Visual C++ MFC for [x86/x64 | ARM | ARM64]

```shell
cd ./extensions/suuntoplus-editor
npm install
npm login --registry=https://sally01.jfrog.io/artifactory/api/npm/suunto-npm/ --scope=@suunto-internal --auth-type=legacy
```

### WLS2

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
