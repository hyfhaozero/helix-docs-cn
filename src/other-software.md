# 在其他软件里使用 Helix 的按键习惯

## 在其他环境中使用 Helix 键位

如果 Helix 的键位和交互模型（[使用 Helix](./usage.md)）能在多种编辑环境中一致使用，就更容易上手。然而，某些使用场景无法直接在 Helix 中轻易实现。与 Vim 类似，这促使其他各种软件产品中创建了“Helix 模式”，从而在更广泛的用例中实现 Helix 风格的编辑。

“Helix 模式”通常仍处于早期阶段或完全缺失。对于这些情况，我们也附上了相关的 issue 或讨论链接。

## 其他编辑器

| 编辑器 | 提供 Helix 编辑的插件或功能 | 备注 |
| --- | --- | --- |
| [Vim](https://www.vim.org/) | [helix.vim](https://github.com/chtenb/helix.vim) 配置 | |
| [IntelliJ IDEA](https://www.jetbrains.com/idea/) / [Android Studio](https://developer.android.com/studio) | [IdeaVim](https://plugins.jetbrains.com/plugin/164-ideavim) 插件 + [helix.idea.vim](https://github.com/chtenb/helix.vim) 配置 | 最低推荐版本为 IdeaVim 2.19.0。 |
| [Visual Studio](https://visualstudio.microsoft.com/) | [VsVim](https://marketplace.visualstudio.com/items?itemName=JaredParMSFT.VsVim) 插件 + [helix.vs.vim](https://github.com/chtenb/helix.vim) 配置 | |
| [Visual Studio Code](https://code.visualstudio.com/) | [Dance](https://marketplace.visualstudio.com/items?itemName=gregoire.dance) 扩展，或其 [Helix 分支](https://marketplace.visualstudio.com/items?itemName=kend.dancehelixkey) | Helix 分支已有分歧。你也可以使用原始 Dance 并直接调整其键绑定（可尝试[此配置](https://github.com/71/dance/issues/299#issuecomment-1655509531)）。 |
| [Visual Studio Code](https://code.visualstudio.com/) | [Helix for VS Code](https://marketplace.visualstudio.com/items?itemName=jasew.vscode-helix-emulation) 扩展 | |
| [Zed](https://zed.dev/) | 通过键绑定原生支持（[Bug](https://github.com/zed-industries/zed/issues/4642)） | |
| [CodeMirror](https://codemirror.net/) | [codemirror-helix](https://gitlab.com/_rvidal/codemirror-helix) | |
| [Lite XL](https://lite-xl.com/) | [lite-modal-hx](https://codeberg.org/Mandarancio/lite-modal-hx) | |
| [Lapce](https://lap.dev/lapce/) | | 已请求：https://github.com/lapce/lapce/issues/281 |


## Shells

| Shell | 提供 Helix 编辑的插件或功能 |
| --- | --- |
| Fish | [功能请求](https://github.com/fish-shell/fish-shell/issues/7748) |
| Fish | [fish-helix](https://github.com/sshilovsky/fish-helix/tree/main) |
| Zsh | [helix-zsh](https://github.com/john-h-k/helix-zsh) 或 [zsh-helix-mode](https://github.com/Multirious/zsh-helix-mode) |
| Nushell | [功能请求](https://github.com/nushell/reedline/issues/639) |

## 其他软件

| 软件 | 提供 Helix 编辑的插件或功能 | 备注 |
| --- | --- | --- |
| [Obsidian](https://obsidian.md/) | [Obsidian-Helix](https://github.com/Sinono3/obsidian-helix) | 使用上面列出的 `codemirror-helix`。 |