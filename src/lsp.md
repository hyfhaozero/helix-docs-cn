# 语言服务器

Helix 内置了对[语言服务器协议][lsp]的支持，为任何配置了服务器的语言提供类似 IDE 的功能——诊断、补全、跳转到定义、重命名等。语言服务器是独立的程序，需要你自己安装：[语言支持](./lang-support.md)页面列出了哪些语言预配置了服务器，[语言服务器配置维基][wiki]提供了每个服务器的安装说明。

运行 `hx --health <语言>` 检查 Helix 是否为某种语言找到了配置的服务器。更改服务器配置后，`:lsp-restart` 重新加载它，`:lsp-stop` 停止它；`:lsp-workspace-command` 运行服务器为工作区暴露的命令。

## 功能

大多数功能默认绑定了键位（参见[键位映射](./keymap.md)）；相关键位如下所列。

| 功能 | 默认键位 / 命令 |
| --- | --- |
| 诊断 — 内联显示并在侧边栏显示 | 使用 `[d` / `]d` 导航；`Space-d` / `Space-D` 打开文档/工作区选取器 |
| 补全 | 输入时自动触发；`Ctrl-x` 手动触发 |
| 悬停文档 | `Space-k` |
| 签名帮助（参数提示） | 输入参数时自动触发 |
| 跳转到定义 / 声明 / 类型 / 引用 / 实现 | `gd` / `gD` / `gy` / `gr` / `gi` |
| 重命名符号 | `Space-r` |
| 代码操作 | `Space-a` |
| 文档 / 工作区符号 | `Space-s` / `Space-S` |
| 格式化文档 | `:format`，或设置 `auto-format` 在保存时格式化 |
| 内联提示 | 启用 `display-inlay-hints`（见下文） |

## 配置

`config.toml` 中的 [`[editor.lsp]`](./editor.md#editorlsp-section) 部分用于切换 LSP 行为 —— `display-inlay-hints`、`auto-signature-help`、`auto-document-highlight`、`snippets`，以及 `enable` 用于完全禁用 LSP。光标处显示多少诊断详情在 [`[editor.inline-diagnostics]`](./editor.md#editorinline-diagnostics-section) 中单独配置。

语言使用哪些服务器、服务器的命令和参数，以及任何语言特定的设置都在 `languages.toml` 中配置（参见[语言服务器配置](./languages.md#language-server-configuration)）。一种语言可以使用[多个服务器](./languages.md#configuring-language-servers-for-a-language)：对于每个请求，使用列表中第一个支持该请求的服务器，并且可以使用 `only-features` / `except-features` 限制服务器的功能。

[lsp]: https://microsoft.github.io/language-server-protocol/
[wiki]: https://github.com/helix-editor/helix/wiki/Language-Server-Configurations