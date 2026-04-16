# Silta 体系

Silta 跨端之桥 芬兰语血统，显得很有格调且技术针对性强

仓库分布172.16.5.16:29418/suunto/

1. silta_tools: 通用支持库，命令行工具，npm包
2. silta_ide: ide主体，整体IDE架构为主进程拖多插件形式
3. silta_extensions: 扩展包
    1. tools
    2. ui 面板定制
    3. project 可视化管理项目增删改检测等
    4. simulator 模拟器(可选，看Emulator情况) 模拟手表数据，模拟应用效果
    5. ux 语言服务 语法提示高亮限制等
    6. machine 真机管理 应用管理增删改查 日志等
    7. debug develop tools 断点调试
    8. cloud 云管理
       1. auth 身份认证
       2. 应用推送 提交审核

依赖关系

├── silta_ide
│ ├── silta_extensions
│ │ ├── suunto-js-tools
│ │ │ ├── silta_tools
│ │ ├── suunto-js-ui
│ │ ├── ...

silta_ide基于vscode开源版Visual Studio Code - Open Source ("Code - OSS")进行开发[https://github.com/microsoft/vscode]，所以为了能够方便获取更新，上游需要同时保留Github和Gerrit，在需要的时候，rebase Github。

## 双上游配置

```shell
$ git remote -v

gerrit  ssh://zhaotong@172.16.5.16:29418/suunto/silta_ide (fetch)
gerrit  ssh://zhaotong@172.16.5.16:29418/suunto/silta_ide (push)
upstream  https://github.com/microsoft/vscode.git (fetch)
upstream  https://github.com/microsoft/vscode.git (push)
```

gerrit/main === upstream/main

### 配置步骤

``` shell
git remote rename origin github
git remote add gerrit ssh://zhaotong@172.16.5.16:29418/suunto/xxx

# 验证配置
git remote -v
# 应该显示：
# github  https://github.com/xxx/xxx.git (fetch)
# github  https://github.com/xxx/xxx.git (push)
# gerrit  ssh://zhaotong@172.16.5.16:29418/suunto/xxx (fetch)
# gerrit  ssh://zhaotong@172.16.5.16:29418/suunto/xxx (push)

scp -p -P 29418 zhaotong@172.16.5.16:hooks/commit-msg .git/hooks/

# 对最近的4个commit进行rebase，自动添加Change-Id
git rebase -i commit-id

r aa4b129 Initial commit

git push gerrit HEAD:refs/for/main

git cherry-pick gerrit-commit-id
git commit --allow-empty
```
