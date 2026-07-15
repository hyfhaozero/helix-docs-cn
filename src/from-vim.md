# 从 Vim 迁移

- [删除/修改命令](#删除修改命令)
- [导航](#导航)
- [行删除](#行删除)
- [注释行、补全、搜索](#注释行补全搜索)
- [文件操作](#文件操作)

Helix 的编辑模型深受 Vim 和 Kakoune 的启发，与 Vim 的一个显著区别（也是与 Kakoune 最显著的相似之处）在于 Helix 遵循 `选择 → 操作` 模型。这意味着你首先要选中要操作的对象（一个词、一个段落、一行等），然后执行操作（删除、修改、复制等）。光标本质上就是一个单字符宽度的选区。

*注意：* 由于 Helix 受 Vim 和 [Kakoune](https://github.com/mawww/kakoune) 的启发，其键位绑定相似但也有所不同。本页内容受 [Kakoune Wiki](https://github.com/mawww/kakoune/wiki/Migrating-from-Vim) 的启发。

注意：与 Vim 不同，`f`、`F`、`t` 和 `T` 不局限于当前行。

## 删除/修改命令

删除一个词：
* Vim：`dw`
* Helix：`wd`

修改一个词：
* Vim：`cw`
* Helix：`ec` 或 `wc`（包含词后的空格）

删除一个字符：
* Vim：`x`
* Helix：`d` 或 `;d`（`;` 将选区缩小为单个字符）

复制一行：
* Vim：`yy`
* Helix：`Xy`（`X` 将所有选区扩展到整行）

全局替换：
* Vim：`:%s/word/replacement/g<ret>`
* Helix：`%sword<ret>creplacement<esc>`

说明：`%` 选中整个缓冲区，`s` 打开正则表达式提示，`<ret>` 确认正则表达式并将选区缩小到每个匹配项（因此，所有出现的 word 都被选中）。`c` 删除选区内容并进入插入模式，输入 replacement，然后按 `<esc>` 返回普通模式。

## 导航

转到第一行：
* Vim：`gg`
* Helix：`gg`

转到最后一行：
* Vim：`G`
* Helix：`ge`

转到行首：
* Vim：`0`
* Helix：`gh`

转到行首第一个非空白字符：
* Vim：`^`
* Helix：`gs`

转到行尾：
* Vim：`$`
* Helix：`gl`

跳转到匹配的括号：
* Vim：`%`
* Helix：`mm`

## 行删除

删除到行尾：
* Vim：`D`
* Helix：`vgld` 或 `t<ret>d`

注意：`v` 与 `gl`（转到行尾）一起使用，因为 [`gl` 不会选中文本](https://github.com/helix-editor/helix/issues/1630)。
`t<ret>` 选中"直到"用 `<ret>` 表示换行符。

删除整行：
* Vim：`dd`
* Helix：`xd`

注意：`x` 选中光标所在的整行

## 注释行、补全、搜索

自动补全：
* Vim：`C-p`
* Helix：`C-x`

注释行：
* Vim：`gc`
* Helix：`Space-c`

搜索光标下的词：
* Vim：`*`
* Helix：`A-o*n`（如果有 tree-sitter 语法或 LSP）或 `be*n`

说明：如果有语法或 LSP，`A-o` 将选区扩展到父级语法节点（在本例中为单词）。然后 `*` 使用当前选区作为搜索模式，`n` 转到下一个匹配项。`b` 选中到词首，`e` 选中到词尾，从而有效选中整个单词。

块选择：
* Vim：`C-v`，然后垂直和水平扩展选区
* Helix：没有"块选择"模式，而是使用多个光标。用 `C` 在下方行添加新光标来垂直扩展块选区，使用标准移动来水平扩展

在当前选区中搜索 "foo" 并替换为 "bar"：
* Vim：`:s/foo/bar/g<ret>`
* Helix：`sfoo<ret>cbar<esc>,`

说明：`s` 会在命令行中打开正则表达式提示，并选中选区内的所有匹配项（实际上在每个匹配项上添加一个新光标）。按回车键完成此步骤，然后 `c` 将选区修改为 "bar"。完成后，按 `<esc>` 返回普通模式，并按 `,` 只保留主选区（移除所有额外光标）。

## 文件操作

选中整个文件：
* Vim：`ggVG`
* Helix：`%`

从磁盘重新加载文件：
* Vim：`:e<ret>`
* Helix：`:reload<ret>`（或 `:reload-all<ret>` 重新加载所有缓冲区）

运行 shell 命令：
* Vim：`:!command`
* Helix：`:sh command`（或 `!command` 将其输出插入缓冲区）

设置书签（标记位置）：
* Vim：`ma` 设置名为 a 的书签。使用 `` `a `` 返回该书签位置。
* Helix：没有命名书签，但你可以用 `C-s` 在跳转列表中保存位置，然后通过 `<space>-j` 打开跳转列表选取器跳回该位置，或用 `C-o` 向后跳转，用 `C-i` 向前跳转

Helix 允许在[插入模式下进行有限的移动](https://docs.helix-editor.com/keymap.html#insert-mode)，无需切换到普通模式。

与 Vim 不同，在 Helix 中，插入模式和普通模式下的光标形状默认相同（方块）。
这可以在配置中调整：

```toml
[editor.cursor-shape]
insert = "bar"
```

TODO：提及文本对象、环绕、寄存器